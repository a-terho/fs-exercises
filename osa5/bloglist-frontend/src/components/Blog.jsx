import { useState } from 'react';

const Blog = ({ user, blog, onLike, onRemove }) => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => setOpened(!opened);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const hasCreator = blog.user !== undefined;
  const userIsBlogCreator = blog.user?.username === user.username;

  return (
    <div style={blogStyle}>
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
