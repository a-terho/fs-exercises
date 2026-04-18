import { Link } from 'react-router';

import { Header } from './shared-styles';

const BlogList = ({ blogs }) => (
  <>
    <Header>blogs</Header>
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
