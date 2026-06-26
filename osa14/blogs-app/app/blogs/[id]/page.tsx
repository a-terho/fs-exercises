import { notFound } from 'next/navigation';
import { addBlogToReadingList, sendBlogLike } from '@/app/actions/blogs';
import { getBlog } from '@/app/services/blogs';
import { getCurrentUser } from '@/app/services/session';

interface Props {
  params: Promise<{ id: string }>;
}

const BlogPage = async ({ params }: Props) => {
  const { id } = await params;

  const blog = await getBlog(Number(id));
  if (!blog) return notFound();

  const user = await getCurrentUser();
  const readingListEntry = user?.readingList.find(
    (entry) => entry.blogId === Number(id),
  );

  return (
    <div data-testid="blog-detail">
      <h2 data-testid="blog-title">{blog.title}</h2>
      <div className="flex gap-2">
        <form action={sendBlogLike} className="mb-5">
          <input type="hidden" name="id" value={blog.id} />
          <input type="submit" value="like" />
        </form>
        {user ? (
          !readingListEntry ? (
            <form action={addBlogToReadingList} className="mb-5">
              <input type="hidden" name="id" value={blog.id} />
              <input
                data-testid="add-to-reading-list-button"
                type="submit"
                value="add to reading list"
              />
            </form>
          ) : (
            <button className="rounded px-1 border-2 self-start">
              <a href="/me#reading-list">
                ✓ {readingListEntry.read ? 'read' : 'reading list'}
              </a>
            </button>
          )
        ) : null}
      </div>
      <p data-testid="blog-author">
        by {blog.author} with {blog.likes} likes
      </p>
      <a href={blog.url} className="underline hover:text-blue-600">
        {blog.url}
      </a>
    </div>
  );
};

export default BlogPage;
