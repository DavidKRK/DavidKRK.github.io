import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core";

export const pageViews = pgTable(
  "page_views",
  {
    id: serial().primaryKey(),
    path: text().notNull(),
    referrer: text(),
    country: text(),
    city: text(),
    device: text().notNull(),
    browser: text().notNull(),
    os: text().notNull(),
    language: text(),
    visitorHash: text("visitor_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("page_views_created_at_idx").on(t.createdAt)],
);
