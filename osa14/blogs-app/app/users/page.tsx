import Link from 'next/link';
import { getUsers } from '@/app/services/users';

// temporary fix to avoid static HTML /users page
// at build stage caching may cause new users not to appear
export const dynamic = 'force-dynamic';

const Users = async () => {
  const users = await getUsers();

  return (
    <div>
      <h2>users</h2>
      <ul className="mx-2 space-y-1">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-1 w-fit rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-500"
          >
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
