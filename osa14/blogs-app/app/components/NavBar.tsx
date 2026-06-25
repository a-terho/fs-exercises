'use client';

import { useSession, signOut } from 'next-auth/react';
import NavLink from './NavLink';

const NavBar = () => {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut({ redirectTo: '/' });
  };

  return (
    <nav className="flex gap-4 p-5">
      <>
        <NavLink href="/">home</NavLink> <NavLink href="/blogs">blogs</NavLink>{' '}
        <NavLink href="/users">users</NavLink>{' '}
        {session ? <NavLink href="/blogs/new">add blog</NavLink> : null}
      </>
      {session ? (
        <div className="ml-auto flex gap-4">
          <span>
            logged in as <em>{session.user?.email}</em>
          </span>{' '}
          <NavLink href="/me">me</NavLink>{' '}
          <button
            onClick={logout}
            className="hover:text-gray-600 hover:bg-gray-300 px-2 rounded border"
          >
            logout
          </button>
        </div>
      ) : (
        <div className="ml-auto flex gap-4">
          <NavLink href="/login">login</NavLink>{' '}
          <NavLink href="/register">register</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
