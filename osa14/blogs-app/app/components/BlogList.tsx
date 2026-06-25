import type { Blog } from '@/types';

interface Props {
  blogs: Blog[];
  emptyMessage?: string;
}

const BlogList = ({ blogs, emptyMessage }: Props) => {
  return (
    <ul className="space-y-1">
      {blogs.length === 0
        ? emptyMessage || 'No blogs.'
        : blogs.map((blog) => (
            <li
              key={blog.id}
              className="p-2 bg-gray-600 text-amber-100 hover:bg-gray-800 dark:bg-gray-700 dark:text-amber-200 dark:hover:bg-gray-600 rounded"
            >
              <a href={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author} ({blog.likes} likes)
              </a>
            </li>
          ))}
    </ul>
  );
};

export default BlogList;
