import Blog from './Blog';

const BlogList = ({ user, blogs, likeHandler, removeHandler }) => (
  <>
    <h2>all saved blogs</h2>
    {blogs.map((blog) => {
      return (
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          onLike={likeHandler}
          onRemove={removeHandler}
        />
      );
    })}
  </>
);

export default BlogList;
