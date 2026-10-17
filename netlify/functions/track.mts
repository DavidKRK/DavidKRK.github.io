import type { Config, Context } from "@netlify/functions";
import { createHash } from "node:crypto";
import { db } from "../../db/index.js";
import { pageViews } from "../../db/schema.js";

const BOT_PATTERN = /bot|crawl|spider|slurp|preview|lighthouse|headless|curl|wget|python|monitor|facebookexternalhit|whatsapp/i;

function parseUserAgent(ua: string) {
  const device = /ipad|tablet/i.test(ua) ? "Tablette" : /mobi|android|iphone/i.test(ua) ? "Mobile" : "Ordinateur";

  let browser = "Autre";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/samsungbrowser/i.test(ua)) browser = "Samsung Internet";
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";

  let os = "Autre";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(ua)) os = "iOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/mac os x/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  return { device, browser, os };
}

function referrerHost(referrer: unknown, siteHost: string) {
  if (typeof referrer !== "string" || !referrer) return null;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    return host === siteHost.replace(/^www\./, "") ? null : host.slice(0, 200);
  } catch {
    return null;
  }
}

export default async (req: Request, context: Context) => {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_PATTERN.test(ua)) return new Response(null, { status: 204 });

  let body: { path?: unknown; referrer?: unknown; language?: unknown };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new Response("Invalid body", { status: 400 });
  }

  const rawPath = typeof body.path === "string" ? body.path : "/";
  const path = (rawPath.replace(/\/index\.html$/, "/").replace(/\.html$/, "") || "/").slice(0, 300);
  const siteHost = new URL(req.url).hostname;

  // Anonymous visitor id: no cookie, no stored IP, rotates every day.
  const day = new Date().toISOString().slice(0, 10);
  const visitorHash = createHash("sha256")
    .update(`${day}|${context.site.id ?? ""}|${context.ip}|${ua}`)
    .digest("hex")
    .slice(0, 32);

  await db.insert(pageViews).values({
    path,
    referrer: referrerHost(body.referrer, siteHost),
    country: context.geo?.country?.name ?? null,
    city: context.geo?.city ?? null,
    language: typeof body.language === "string" ? body.language.slice(0, 20) : null,
    visitorHash,
    ...parseUserAgent(ua),
  });

  return new Response(null, { status: 204 });
};

export const config: Config = {
  path: "/api/track",
  method: "POST",
};
