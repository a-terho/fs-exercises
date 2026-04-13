const Blog = ({ user, blog, onLike, onRemove }) => {
  if (!blog) return null;

  // blogilla ei ole käyttäjää -> undefined, käyttäjä poistettu tietokannasta -> null
  const hasCreator = !(blog.user === undefined || blog.user === null);
  const userIsBlogCreator = user && blog.user?.username === user?.username;

  return (
    <div className="blog">
      <h2>
        {blog.author}: {blog.title}
      </h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{' '}
          {user && <button onClick={() => onLike(blog)}>like</button>}
        </div>
        {hasCreator && <div>{blog.user.name}</div>}
        {userIsBlogCreator && (
          <button onClick={() => onRemove(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
