import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

/** Website contact leads — future AI tables will live in this same database. */
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  subject: varchar("subject", { length: 100 }).notNull(),
  expertiseArea: varchar("expertise_area", { length: 100 }),
  message: text("message").notNull(),
  /** contact_page | get_started_modal */
  source: varchar("source", { length: 50 }).notNull().default("contact_page"),
  locale: varchar("locale", { length: 5 }).notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;

/** Career applications with CV attachment stored as base64. */
export const careerApplications = pgTable("career_applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  linkedIn: varchar("linked_in", { length: 500 }),
  message: text("message"),
  cvFileName: varchar("cv_file_name", { length: 255 }).notNull(),
  cvMimeType: varchar("cv_mime_type", { length: 100 }).notNull(),
  cvData: text("cv_data").notNull(),
  locale: varchar("locale", { length: 5 }).notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CareerApplication = typeof careerApplications.$inferSelect;
export type NewCareerApplication = typeof careerApplications.$inferInsert;
