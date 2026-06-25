import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const getUserById = async (userId: number) => {
  if (isNaN(userId)) return null;
  return db.query.users.findFirst({ where: eq(users.id, userId) });
};

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

export const getUserAPIToken = async (userId: number) => {
  const user = await getUserById(userId);
  if (!user) return ''; // default is empty string
  return user.apiToken;
};

export const generateAPIToken = async (userId: number) => {
  const user = await getUserById(userId);
  if (!user) return false;

  const apiToken = randomUUID();
  await db.update(users).set({ apiToken }).where(eq(users.id, userId));
  return true;
};
