import { searchBlogs } from '@/app/actions/blogs';
import { getBlogs } from '@/app/services/blogs';

interface Props {
  searchParams: Promise<{ q: string }>;
}

const Blogs = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q : undefined;

  const blogs = (await getBlogs(query)).sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>blogs</h2>
      <form action={searchBlogs}>
        <input type="text" name="query" defaultValue={query} />
        <input type="submit" value="Search" />
      </form>
      {query ? (
        <p>
          Filtering results with keyword <strong>{query}</strong>
        </p>
      ) : null}
      <ul>
        {blogs.length === 0
          ? 'No blogs.'
          : blogs.map((blog) => (
              <li key={blog.id}>
                <a href={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author} ({blog.likes} likes)
                </a>
              </li>
            ))}
      </ul>
    </>
  );
};

export default Blogs;
