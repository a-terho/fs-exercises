import { Link, useMatch } from 'react-router';

import NotFound from './NotFound';
import { Container, Header, BlogLink } from '../styles/shared-styles';

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
      <Container>
        {user.blogs.length > 0 ? (
          <>
            <Header>added blogs</Header>
            <ul>
              {user.blogs.map((blog) => (
                <BlogLink key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </BlogLink>
              ))}
            </ul>
          </>
        ) : (
          <p>{user.name} has not added any blogs.</p>
        )}
      </Container>
    </>
  );
};

export default User;
