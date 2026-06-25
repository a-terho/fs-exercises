import bcrypt from 'bcryptjs';
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

export const addUser = async (
  username: string,
  name: string,
  password: string,
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return db.insert(users).values({ username, name, passwordHash });
};
