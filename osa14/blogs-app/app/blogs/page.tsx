import { getBlogs } from '@/app/services/blogs';

const Blogs = () => {
  const blogs = getBlogs();
  return (
    <>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a> by {blog.author} ({blog.likes}{' '}
            likes)
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blogs;
