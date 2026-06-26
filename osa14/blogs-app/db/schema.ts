import {
  pgSchema,
  serial,
  text,
  integer,
  boolean,
  unique,
} from 'drizzle-orm/pg-core';
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
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const users = schema.table('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull().default(''),
  apiToken: text('api_token').notNull().default(''),
});

export const readingList = schema.table(
  'reading_list',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    blogId: integer('blog_id')
      .notNull()
      .references(() => blogs.id, { onDelete: 'cascade' }),
    read: boolean().notNull().default(false),
  },
  // also add unique constraint to disallow duplicate entries
  (table) => [unique().on(table.userId, table.blogId)],
);

// allow user.blogs and user.readingList access (export is required!)
export const userRelations = relations(users, ({ many }) => {
  return {
    blogs: many(blogs),
    readingList: many(readingList),
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

export const readingListRelations = relations(readingList, ({ one }) => {
  return {
    user: one(users, {
      fields: [readingList.userId],
      references: [users.id],
    }),
    blog: one(blogs, {
      fields: [readingList.blogId],
      references: [blogs.id],
    }),
  };
});
