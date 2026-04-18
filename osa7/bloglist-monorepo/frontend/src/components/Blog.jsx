import styled from 'styled-components';
import { useState } from 'react';

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

const Blog = ({ user, blog, onLike, onRemove }) => {
  const [loading, setLoading] = useState({});

  if (!blog) {
    if (loading.ok) return <NotFound element="Blog" />;

    // salli lyhyt latausaika, jolloin ei vielä renderöidä NotFound komponenttia
    // heti sivun päivityksen yhteydessä blog = null vaikka sen id onkin olemassa
    if (!loading.timer) {
      const timer = setTimeout(() => setLoading({ ok: true }), 500);
      setLoading({ ok: false, timer });
    }
    return null;
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
