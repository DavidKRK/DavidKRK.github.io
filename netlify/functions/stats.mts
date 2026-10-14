import type { Config } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { count, countDistinct, desc, gte, sql, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pageViews } from "../../db/schema.js";

const TIMEZONE = "Europe/Paris";
const PRIMARY_ORIGIN = "https://www.davidkrk.com";
const SECONDARY_ORIGIN = "https://davidkrk.com";
const NETLIFY_SITE_ORIGIN = "https://whimsical-kitsune-85066d.netlify.app";
const NETLIFY_PREVIEW_ORIGIN = /^https:\/\/deploy-preview-\d+--[a-z0-9-]+\.netlify\.app$/i;

function isAuthorized(req: Request) {
  const expected = Netlify.env.get("STATS_PASSWORD");
  const provided = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!expected || !provided) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function isAllowedOrigin(origin: string) {
  return (
    origin === PRIMARY_ORIGIN ||
    origin === SECONDARY_ORIGIN ||
    origin === NETLIFY_SITE_ORIGIN ||
    NETLIFY_PREVIEW_ORIGIN.test(origin)
  );
}

function corsHeaders(origin: string | null) {
  if (!origin || !isAllowedOrigin(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Vary": "Origin",
  };
}

function topBy(column: SQL, since: Date, fallbackLabel: string, limit = 10) {
  return db
    .select({ label: sql<string>`coalesce(${column}, ${fallbackLabel})`, views: count(), visitors: countDistinct(pageViews.visitorHash) })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`1`)
    .orderBy(desc(count()))
    .limit(limit);
}

export default async (req: Request) => {
  const origin = req.headers.get("origin");
  const allowOrigin = origin && isAllowedOrigin(origin);

  if (req.method === "OPTIONS") {
    if (!allowOrigin) return new Response("Forbidden origin", { status: 403 });
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders(origin),
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "authorization",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (origin && !allowOrigin) {
    return Response.json({ error: "forbidden_origin" }, { status: 403 });
  }

  const responseHeaders = { "Cache-Control": "no-store", ...corsHeaders(origin) };

  if (!Netlify.env.get("STATS_PASSWORD")) {
    return Response.json({ error: "not_configured" }, { status: 503, headers: responseHeaders });
  }
  if (!isAuthorized(req)) {
    return Response.json({ error: "unauthorized" }, { status: 401, headers: responseHeaders });
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
    topBy(sql`${pageViews.path}`, since, "Inconnu"),
    topBy(sql`${pageViews.referrer}`, since, "Direct / inconnu"),
    topBy(sql`${pageViews.country}`, since, "Inconnu"),
    topBy(sql`${pageViews.city}`, since, "Inconnu"),
    topBy(sql`${pageViews.device}`, since, "Inconnu"),
    topBy(sql`${pageViews.browser}`, since, "Inconnu"),
    topBy(sql`${pageViews.os}`, since, "Inconnu"),
  ]);

  return Response.json(
    { days, timezone: TIMEZONE, totals, live, daily, pages, referrers, countries, cities, devices, browsers, systems },
    { headers: responseHeaders },
  );
};

export const config: Config = {
  path: "/api/stats",
};
