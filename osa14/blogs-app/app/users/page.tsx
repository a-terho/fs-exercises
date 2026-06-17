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
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
