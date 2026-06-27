import { pgTable, text, timestamp, uuid, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

/** Project inquiries with optional meeting slot (Mon–Fri, 9:00–17:00 Stockholm). */
export const projectSubmissions = pgTable("project_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  projectType: varchar("project_type", { length: 100 }).notNull(),
  timeline: varchar("timeline", { length: 100 }),
  budget: varchar("budget", { length: 100 }),
  description: text("description").notNull(),
  meetingDate: varchar("meeting_date", { length: 10 }),
  meetingTime: varchar("meeting_time", { length: 5 }),
  locale: varchar("locale", { length: 5 }).notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ProjectSubmission = typeof projectSubmissions.$inferSelect;
export type NewProjectSubmission = typeof projectSubmissions.$inferInsert;

/** Admin users for the CMS. */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;

/** Blog posts — HTML content with optional gallery images. */
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImageId: uuid("cover_image_id"),
  /** draft | published */
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  authorId: uuid("author_id").references(() => adminUsers.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const blogImages = pgTable("blog_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").references(() => blogPosts.id, { onDelete: "cascade" }),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  data: text("data").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const blogPostsRelations = relations(blogPosts, ({ many, one }) => ({
  images: many(blogImages),
  author: one(adminUsers, { fields: [blogPosts.authorId], references: [adminUsers.id] }),
}));

export const blogImagesRelations = relations(blogImages, ({ one }) => ({
  post: one(blogPosts, { fields: [blogImages.postId], references: [blogPosts.id] }),
}));

export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogImage = typeof blogImages.$inferSelect;
