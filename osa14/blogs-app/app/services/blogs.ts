import { eq, ilike } from 'drizzle-orm';
import { db } from '@/db';
import { blogs, readingList } from '@/db/schema';
import { type Blog, type BlogInput } from '@/types';
import { getCurrentUser } from './session';

export const getBlogs = async (filter?: string): Promise<Blog[]> => {
  const trimmed = filter?.trim();
  return db.query.blogs.findMany({
    where: trimmed ? ilike(blogs.title, `%${trimmed}%`) : undefined,
  });
};

export const addBlog = async ({ title, author, url }: BlogInput) => {
  if (!(title.trim() !== '' && author.trim() !== '' && url.trim() !== '')) {
    return;
  }

  const user = await getCurrentUser();
  if (user) {
    const blog = await db
      .insert(blogs)
      .values({ title, author, url, userId: user.id })
      .returning();
    await db
      .insert(readingList)
      .values({ userId: user.id, blogId: blog[0].id });
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

export const addToReadingList = async (id: number) => {
  const blog = await getBlog(id);
  const user = await getCurrentUser();
  if (user && blog) {
    await db
      .insert(readingList)
      .values({ userId: user.id, blogId: blog.id })
      // if on list already, mark it as unread
      .onConflictDoUpdate({
        target: [readingList.userId, readingList.blogId],
        set: { read: false },
      });
  }
};
