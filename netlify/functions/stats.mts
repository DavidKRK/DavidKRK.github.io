import type { Config } from "@netlify/functions";
import { createHmac, timingSafeEqual } from "node:crypto";
import { count, countDistinct, desc, gte, sql, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pageViews } from "../../db/schema.js";

const TIMEZONE = "Europe/Paris";
const SESSION_TTL_MS = 15 * 60 * 1000;
const ALLOWED_ORIGINS = new Set([
  "https://www.davidkrk.com",
  "https://davidkrk.com",
  "https://davidkrk.github.io",
]);

function allowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  return origin && (ALLOWED_ORIGINS.has(origin) || origin === new URL(req.url).origin) ? origin : null;
}

function constantTimeEqual(actual: string, expected: string) {
  const actualBytes = Buffer.from(actual);
  const expectedBytes = Buffer.from(expected);
  return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
}

function sessionSignature(expiresAt: string, password: string) {
  return createHmac("sha256", password).update(expiresAt).digest("base64url");
}

function isValidSessionToken(token: string, password: string) {
  const [expiresAt, signature, ...extra] = token.split(".");
  if (extra.length || !/^\d+$/.test(expiresAt ?? "")) return false;

  const expiry = Number(expiresAt);
  if (!Number.isSafeInteger(expiry) || expiry <= Date.now()) return false;

  return constantTimeEqual(signature ?? "", sessionSignature(expiresAt, password));
}

function topBy(column: SQL, since: Date, fallback = "Inconnu", limit = 10) {
  return db
    .select({ label: sql<string>`coalesce(${column}, ${fallback})`, views: count(), visitors: countDistinct(pageViews.visitorHash) })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`1`)
    .orderBy(desc(count()))
    .limit(limit);
}

export default async (req: Request) => {
  const origin = allowedOrigin(req);
  if (!origin) return new Response("Forbidden", { status: 403 });
  const corsHeaders = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const password = Netlify.env.get("STATS_PASSWORD");
  if (!password) {
    return Response.json({ error: "not_configured" }, { status: 503, headers: corsHeaders });
  }

  if (req.method === "POST") {
    const bodyText = await req.text();
    if (bodyText.length > 1024) {
      return Response.json({ error: "invalid_body" }, { status: 413, headers: corsHeaders });
    }

    let body: { password?: unknown };
    try {
      const parsed = JSON.parse(bodyText);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
      body = parsed;
    } catch {
      return Response.json({ error: "invalid_body" }, { status: 400, headers: corsHeaders });
    }

    if (typeof body.password !== "string" || !constantTimeEqual(body.password, password)) {
      return Response.json({ error: "unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const expiresAt = String(Date.now() + SESSION_TTL_MS);
    const token = `${expiresAt}.${sessionSignature(expiresAt, password)}`;
    return Response.json({ token }, { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return Response.json({ error: "method_not_allowed" }, { status: 405, headers: corsHeaders });
  }

  const token = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!isValidSessionToken(token, password)) {
    return Response.json({ error: "unauthorized" }, { status: 401, headers: corsHeaders });
  }

  const days = Math.min(Math.max(Number(new URL(req.url).searchParams.get("days")) || 30, 1), 365);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const dayExpr = sql<string>`to_char(${pageViews.createdAt} at time zone ${sql.raw(`'${TIMEZONE}'`)}, 'YYYY-MM-DD')`;

  const [[totals], [live], daily, pages, referrers, countries, cities, devices, browsers, systems] = await Promise.all([
    db.select({ views: count(), visitors: countDistinct(pageViews.visitorHash) }).from(pageViews).where(gte(pageViews.createdAt, since)),
    db.select({ visitors: countDistinct(pageViews.visitorHash) }).from(pageViews).where(gte(pageViews.createdAt, fiveMinutesAgo)),
    db
      .select({ day: dayExpr, views: count(), visitors: countDistinct(pageViews.visitorHash) })
      .from(pageViews)
      .where(gte(pageViews.createdAt, since))
      .groupBy(sql`1`)
      .orderBy(sql`1`),
    topBy(sql`${pageViews.path}`, since),
    topBy(sql`${pageViews.referrer}`, since, "Direct / inconnu"),
    topBy(sql`${pageViews.country}`, since),
    topBy(sql`${pageViews.city}`, since),
    topBy(sql`${pageViews.device}`, since),
    topBy(sql`${pageViews.browser}`, since),
    topBy(sql`${pageViews.os}`, since),
  ]);

  return Response.json(
    { days, timezone: TIMEZONE, totals, live, daily, pages, referrers, countries, cities, devices, browsers, systems },
    { headers: corsHeaders },
  );
};

export const config: Config = {
  path: "/api/stats",
  method: ["GET", "POST", "OPTIONS"],
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
