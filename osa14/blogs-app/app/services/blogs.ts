import { eq, ilike, sql } from 'drizzle-orm';

import { type Blog, type BlogInput } from '../types';
import { db } from '@/db';
import { blogs } from '@/db/schema';

export const getBlogs = async (filter?: string): Promise<Blog[]> => {
  const trimmed = filter?.trim();
  return db.query.blogs.findMany({
    where: trimmed ? ilike(blogs.title, `%${trimmed}%`) : undefined,
  });
};

export const addBlog = async ({ title, author, url }: BlogInput) => {
  if (title.trim() !== '' && author.trim() !== '' && url.trim() !== '') {
    // for now, attach blog to one random existing user
    const user = await db.query.users.findFirst({ orderBy: sql`RANDOM()` });
    if (user) {
      await db.insert(blogs).values({ title, author, url, userId: user.id });
    }
  }
};

export const getBlog = async (id: number): Promise<Blog | undefined> => {
  if (isNaN(id)) return undefined; // to avoid useless queries
  return db.query.blogs.findFirst({ where: eq(blogs.id, id) });
};

export const likeBlog = async (id: number) => {
  const blog = await getBlog(id);
  if (blog)
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
};
