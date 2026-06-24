'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { addBlog, likeBlog } from '@/app/services/blogs';

export const newBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const url = formData.get('url') as string;

  if (
    !(title && author && url) ||
    !(title.length >= 5 && author.length >= 5 && url.length >= 5)
  ) {
    return { error: 'All input must be at least 5 characters long!' };
  }

  await addBlog({ title, author, url });
  revalidatePath('/blogs');
  redirect('/blogs');
};

export const sendBlogLike = async (formData: FormData) => {
  const id = formData.get('id') as string;

  await likeBlog(Number(id));
  revalidatePath(`/blogs/${id}`);
  revalidatePath('/blogs');
};

export const searchBlogs = async (formData: FormData) => {
  const query = formData.get('query');
  const trimmed = typeof query === 'string' ? query.trim() : '';

  if (trimmed !== '') {
    redirect(`/blogs?q=${encodeURIComponent(trimmed)}`);
  } else {
    redirect('/blogs');
  }
};
