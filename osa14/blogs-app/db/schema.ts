import { pgSchema, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const schema = pgSchema('blogs_app');

export const blogs = schema.table('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url').notNull(),
  likes: integer('likes').notNull().default(0),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

export const users = schema.table('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull().default(''),
});

// allow user.blogs access (export is required!)
export const userRelations = relations(users, ({ many }) => {
  return {
    blogs: many(blogs),
  };
});

// allow blogs.user access (export is required!)
export const blogRelations = relations(blogs, ({ one }) => {
  return {
    user: one(users, {
      fields: [blogs.userId],
      references: [users.id],
    }),
  };
});
