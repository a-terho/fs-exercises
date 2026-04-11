import { useState } from 'react';

const Blog = ({ user, blog, onLike, onRemove }) => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!opened);

  // blogilla ei ole käyttäjää -> undefined, käyttäjä poistettu tietokannasta -> null
  const hasCreator = !(blog.user === undefined || blog.user === null);
  const userIsBlogCreator = blog.user?.username === user.username;

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleOpened}>{opened ? 'hide' : 'view'}</button>
      {opened && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={() => onLike(blog)}>like</button>
          </div>
          {hasCreator && <div>{blog.user.name}</div>}
          {userIsBlogCreator && (
            <button onClick={() => onRemove(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
