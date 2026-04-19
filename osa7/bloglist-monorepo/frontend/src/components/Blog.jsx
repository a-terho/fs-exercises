import { useMatch } from 'react-router';
import styled from 'styled-components';

import NotFound from './NotFound';

const Container = styled.div`
  font-family: Helvetica, sans-serif;
  margin: 1em;
  padding: 1em;
  box-shadow: 0.1em 0.1em 0.5em black;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 1em;
`;

const Row = styled.div`
  margin-bottom: 1em;
`;

const Button = styled.button`
  text-transform: uppercase;
  background-color: white;
  margin-left: 1em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 5px;
`;

const LikeButton = styled(Button)`
  color: steelblue;
  border: solid steelblue;
  &:hover {
    background-color: steelblue;
    color: white;
  }
`;

const RemoveButton = styled(Button)`
  color: lightcoral;
  border: solid lightcoral;
  &:hover {
    background-color: lightcoral;
    color: white;
  }
`;

import useUser from '../hooks/useUser';
import useBlogs from '../hooks/useBlogs';

const Blog = ({ onLike, onRemove }) => {
  const { isPending, blogs } = useBlogs();
  const { user } = useUser();

  // blogin täsmääjä
  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  if (!blog) {
    // älä näytä mitään kun blogit vielä latautuvat
    if (isPending) return null;

    // latautumisen jälkeen jos blogia ei löydy, näytä 404
    return <NotFound element="Blog" />;
  }

  // blogilla ei ole käyttäjää -> undefined, käyttäjä poistettu tietokannasta -> null
  const hasCreator = !(blog.user === undefined || blog.user === null);
  const userIsBlogCreator = user && blog.user?.username === user?.username;

  return (
    <Container className="blog">
      <Title>
        {blog.author}: {blog.title}
      </Title>
      <div>
        <Row>
          <a href={blog.url}>{blog.url}</a>
        </Row>
        {hasCreator && (
          <Row>
            Added by <span>{blog.user.name}</span>
          </Row>
        )}
        <Row>
          likes {blog.likes}{' '}
          {user && <LikeButton onClick={() => onLike(blog)}>like</LikeButton>}
          {userIsBlogCreator && (
            <RemoveButton onClick={() => onRemove(blog)}>remove</RemoveButton>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Blog;
