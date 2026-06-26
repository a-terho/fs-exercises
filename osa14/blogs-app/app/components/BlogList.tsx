import type { Blog } from '@/types';

interface Props {
  blogs: Blog[];
  emptyMessage?: string;
  emptyTestId?: string;
  buttonAction?: {
    text: string;
    callback: (formData: FormData) => void;
  };
  buttonTestId?: string;
}

const BlogList = ({
  blogs,
  emptyMessage,
  emptyTestId,
  buttonAction,
  buttonTestId,
}: Props) => {
  const emptyTestProps =
    emptyTestId !== undefined ? { 'data-testid': emptyTestId } : {};
  const buttonTestProps =
    buttonTestId !== undefined ? { 'data-testid': buttonTestId } : {};

  return (
    <ul className="space-y-1">
      {blogs.length === 0 ? (
        <div {...emptyTestProps}>{emptyMessage || 'No blogs.'}</div>
      ) : (
        blogs.map((blog) => (
          <li
            key={blog.id}
            className="p-2 bg-gray-600 text-amber-100 hover:bg-gray-800 dark:bg-gray-700 dark:text-amber-200 dark:hover:bg-gray-600 rounded flex"
          >
            <a href={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author} ({blog.likes} likes)
            </a>
            {buttonAction ? (
              <form className="ml-auto pl-3" action={buttonAction.callback}>
                <input type="hidden" name="id" value={blog.id} />
                <input
                  {...buttonTestProps}
                  type="submit"
                  value={buttonAction.text}
                />
              </form>
            ) : null}
          </li>
        ))
      )}
    </ul>
  );
};

export default BlogList;
