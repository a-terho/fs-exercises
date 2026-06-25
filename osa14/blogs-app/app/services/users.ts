import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

export const getUsers = async () => {
  return db.query.users.findMany();
};

// fetches user and their unpopulated reading list
// useful for checking whether given user exists
export const getUserById = async (userId: number) => {
  if (isNaN(userId)) return undefined;
  return db.query.users.findFirst({
    where: eq(users.id, userId),
    with: { readingList: true },
  });
};

// fetches user and all their blogs
export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    columns: { passwordHash: false, apiToken: false },
    with: { blogs: true },
  });
};

// fetches all user data including join queries
export const getUserDataById = async (userId: number) => {
  if (isNaN(userId)) return undefined;
  return db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      blogs: true,
      readingList: {
        with: {
          blog: {
            columns: { userId: false },
          },
        },
      },
    },
  });
};

// fetches user and blogs while selecting API safe fields in response
export const getUserByAPIToken = async (apiToken: string) => {
  return db.query.users.findFirst({
    where: eq(users.apiToken, apiToken),
    columns: { passwordHash: false, apiToken: false },
    with: { blogs: { columns: { author: true, title: true, url: true } } },
  });
};

export const addUser = async (
  username: string,
  name: string,
  password: string,
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return db.insert(users).values({ username, name, passwordHash });
};

export const generateAPIToken = async (userId: number) => {
  const user = await getUserById(userId);
  if (!user) return false;

  const apiToken = randomUUID();
  await db.update(users).set({ apiToken }).where(eq(users.id, userId));
  return true;
};
