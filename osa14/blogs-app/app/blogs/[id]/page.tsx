import { notFound } from 'next/navigation';
import { sendBlogLike } from '@/app/actions/blogs';
import { getBlog } from '@/app/services/blogs';

interface Props {
  params: Promise<{ id: string }>;
}

const BlogPage = async ({ params }: Props) => {
  const { id } = await params;

  const blog = await getBlog(Number(id));
  if (!blog) return notFound();

  return (
    <>
      <h2>{blog.title}</h2>
      <form action={sendBlogLike} className="mb-5">
        <input type="hidden" name="id" value={blog.id} />
        <input type="submit" value="Like" />
      </form>
      <p>
        by {blog.author} with {blog.likes} likes
      </p>
      <a href={blog.url} className="underline hover:text-blue-600">
        {blog.url}
      </a>
    </>
  );
};

export default BlogPage;
