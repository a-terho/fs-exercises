import { pgSchema, serial, text, integer } from 'drizzle-orm/pg-core';

export const schema = pgSchema('blogs_app');

export const blogs = schema.table('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  url: text('url').notNull(),
  likes: integer('likes').notNull().default(0),
});
