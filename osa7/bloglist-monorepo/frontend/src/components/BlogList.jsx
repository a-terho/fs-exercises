import { Link } from 'react-router';

import { Header } from './shared-styles';

import useBlogs from '../hooks/useBlogs';

const BlogList = () => {
  const { isPending, blogs } = useBlogs();

  // latauksen aikana näytetään placeholder latausteksti
  if (isPending) return <p>loading...</p>;

  return (
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
};

export default BlogList;
