import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials || !(credentials.username && credentials.password))
          return null;

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string),
        });

        if (!user || !user.passwordHash) return null;

        const validated = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!validated) return null;

        // email field is replaced with username
        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
        };
      },
    }),
  ],
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
});
