import { Link } from 'react-router';

const BlogList = ({ blogs }) => (
  <>
    <h2>blogs</h2>
    <ul>
      {blogs.map((blog) => {
        return (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        );
      })}
    </ul>
  </>
);

export default BlogList;
