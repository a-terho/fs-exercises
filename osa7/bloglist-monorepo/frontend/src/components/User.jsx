import { Link, useMatch } from 'react-router';

import NotFound from './NotFound';

import useUsers from '../hooks/useUsers';

const User = () => {
  const { isPending, users } = useUsers();

  // käyttäjän täsmääjä
  const match = useMatch('/users/:id');
  const user = match ? users.find((u) => u.id === match.params.id) : null;

  if (!user) {
    // älä näytä mitään kun käyttäjät vielä latautuvat
    if (isPending) return null;

    // latautumisen jälkeen jos käyttäjää ei löydy, näytä 404
    return <NotFound element="User" />;
  }

  return (
    <>
      <h1>{user.name}</h1>
      {user.blogs.length > 0 ? (
        <>
          <h2>added blogs</h2>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>{user.name} has not added any blogs.</p>
      )}
    </>
  );
};

export default User;
