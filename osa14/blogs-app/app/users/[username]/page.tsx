import { notFound } from 'next/navigation';

import BlogList from '@/app/BlogList';
import { getUserByUsername } from '@/app/services/users';

interface Params {
  params: Promise<{ username: string }>;
}

const UserPage = async ({ params }: Params) => {
  const { username } = await params;

  const user = await getUserByUsername(username);
  if (!user) return notFound();

  return (
    <>
      <h2>{user.name}</h2>
      username: {user.username}
      <h3>blogs</h3>
      <BlogList
        blogs={user.blogs}
        emptyMessage={`${user.name} has not added any blogs.`}
      />
    </>
  );
};

export default UserPage;
