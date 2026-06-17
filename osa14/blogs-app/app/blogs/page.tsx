import { searchBlogs } from '@/app/actions/blogs';
import { getBlogs } from '@/app/services/blogs';

import BlogList from '@/app/BlogList';

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
      <BlogList blogs={blogs} />
    </>
  );
};

export default Blogs;
