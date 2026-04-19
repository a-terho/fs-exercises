import { Link } from 'react-router';

import { Topheader, BlogLink } from '../styles/shared-styles';

import useBlogs from '../hooks/useBlogs';

const BlogList = () => {
  const { isPending, blogs } = useBlogs();

  // latauksen aikana näytetään placeholder latausteksti
  if (isPending) return <p>loading...</p>;

  return (
    <>
      <Topheader>blogs</Topheader>
      <ul>
        {blogs.map((blog) => {
          return (
            <BlogLink key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </BlogLink>
          );
        })}
      </ul>
    </>
  );
};

export default BlogList;
