import type { Config } from "@netlify/functions";
import { timingSafeEqual, createHash } from "node:crypto";
import { count, countDistinct, desc, gte, sql, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { pageViews } from "../../db/schema.js";

const TIMEZONE = "Europe/Paris";

function isAuthorized(req: Request) {
  const expected = Netlify.env.get("STATS_PASSWORD");
  const provided = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? "";
  if (!expected || !provided) return false;
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function topBy(column: SQL, since: Date, limit = 10) {
  return db
    .select({ label: sql<string>`coalesce(${column}, 'Direct / inconnu')`, views: count(), visitors: countDistinct(pageViews.visitorHash) })
    .from(pageViews)
    .where(gte(pageViews.createdAt, since))
    .groupBy(sql`1`)
    .orderBy(desc(count()))
    .limit(limit);
}

export default async (req: Request) => {
  if (!Netlify.env.get("STATS_PASSWORD")) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }
  if (!isAuthorized(req)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
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
    topBy(sql`${pageViews.referrer}`, since),
    topBy(sql`${pageViews.country}`, since),
    topBy(sql`${pageViews.city}`, since),
    topBy(sql`${pageViews.device}`, since),
    topBy(sql`${pageViews.browser}`, since),
    topBy(sql`${pageViews.os}`, since),
  ]);

  return Response.json(
    { days, timezone: TIMEZONE, totals, live, daily, pages, referrers, countries, cities, devices, browsers, systems },
    { headers: { "Cache-Control": "no-store" } },
  );
};

export const config: Config = {
  path: "/api/stats",
  method: "GET",
};
