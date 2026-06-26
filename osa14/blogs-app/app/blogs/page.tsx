import { searchBlogs } from '@/app/actions/blogs';
import { getBlogs } from '@/app/services/blogs';

import BlogList from '@/app/components/BlogList';

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
      <div className="mb-4">
        <form action={searchBlogs} className="flex gap-1">
          <input
            data-testid="filter-input"
            type="text"
            name="query"
            defaultValue={query}
          />
          <input data-testid="search-button" type="submit" value="Search" />
        </form>
        {query ? (
          <p className="py-1">
            Filtering results with keyword <strong>{query}</strong>
          </p>
        ) : null}
      </div>
      <div data-testid="blogs-list">
        <BlogList blogs={blogs} />
      </div>
    </>
  );
};

export default Blogs;
