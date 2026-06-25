import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

// expand Session type with id field
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

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

        return {
          // adding id here overrides the default id, but it still needs
          // to be added to session.user seperately to be accessible
          id: String(user.id),
          name: user.name,
          // email field is replaced with username
          email: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // user is only available during sign-in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // pass user id from token to the session at each request
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
});
