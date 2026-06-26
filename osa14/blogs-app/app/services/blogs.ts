import { eq, ilike, and, count } from 'drizzle-orm';
import { db } from '@/db';
import { blogs, readingList } from '@/db/schema';
import { type Blog, type BlogInput } from '@/types';
import { getCurrentUser } from './session';
import { getUserById } from './users';

export const getBlogs = async (filter?: string): Promise<Blog[]> => {
  const trimmed = filter?.trim();
  return db.query.blogs.findMany({
    where: trimmed ? ilike(blogs.title, `%${trimmed}%`) : undefined,
  });
};

export const getBlogCount = async (): Promise<number> => {
  const res: { count: number }[] = await db
    .select({ count: count() })
    .from(blogs);
  return res[0].count;
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

interface Input {
  userId: number;
  blogId: number;
}

export const addToReadingList = async ({ userId, blogId }: Input) => {
  const user = await getUserById(userId);
  const blog = await getBlog(blogId);
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

export const markRead = async ({ userId, blogId }: Input) => {
  const user = await getUserById(userId);
  if (!user) return;

  // first find the blog from user's reading list (without additional query)
  const entry = user.readingList.find((entry) => entry.blogId === blogId);
  if (!entry) return;

  // secondly update the read status
  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(
        eq(readingList.blogId, entry.blogId),
        eq(readingList.userId, user.id),
      ),
    );
};
