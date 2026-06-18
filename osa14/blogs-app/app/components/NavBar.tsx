'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut({ redirectTo: '/' });
  };

  return (
    <nav>
      <>
        <Link href="/">home</Link> <Link href="/blogs">blogs</Link>{' '}
        <Link href="/users">users</Link>
      </>{' '}
      {session ? (
        <>
          <Link href="/blogs/new">add blog</Link>
          {' | '}
          logged in as <em>{session.user?.email}</em>{' '}
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link href="/login">login</Link>
      )}
    </nav>
  );
};

export default NavBar;
