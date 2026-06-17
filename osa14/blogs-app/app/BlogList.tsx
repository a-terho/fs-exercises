import { type Blog } from './types';

interface Props {
  blogs: Blog[];
  emptyMessage?: string;
}

const BlogList = ({ blogs, emptyMessage }: Props) => {
  return (
    <ul>
      {blogs.length === 0
        ? emptyMessage || 'No blogs.'
        : blogs.map((blog) => (
            <li key={blog.id}>
              <a href={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author} ({blog.likes} likes)
              </a>
            </li>
          ))}
    </ul>
  );
};

export default BlogList;
