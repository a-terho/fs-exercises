'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import {
  addBlog,
  likeBlog,
  addToReadingList,
  markRead,
} from '@/app/services/blogs';
import type { BlogFormState, BlogFormErrors } from '@/types';

export const newBlog = async (
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const errors: BlogFormErrors = {};

  const title = formData.get('title') as string;
  if (!title || title.length < 5) {
    errors.title = 'Title must be at least 5 characters!';
  }

  const author = formData.get('author') as string;
  if (!author || author.length < 5) {
    errors.author = 'Author must be at least 5 characters!';
  }

  const url = formData.get('url') as string;
  if (!url || url.length < 5) {
    errors.url = 'URL must be at least 5 characters!';
  }

  // if there are any errors, display them to the client
  // while also passing the current values for the renderer
  if (Object.keys(errors).length > 0) {
    return { success: false, errors, values: { title, author, url } };
  }

  await addBlog({ title, author, url });
  revalidatePath('/blogs');
  return {
    success: true,
    errors: {},
    values: { title: '', author: '', url: '' },
  };
};

export const sendBlogLike = async (formData: FormData) => {
  const id = formData.get('blog-id');

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

export const addBlogToReadingList = async (formData: FormData) => {
  const session = await auth();
  const blogId = formData.get('blog-id');

  await addToReadingList({
    userId: Number(session?.user.id),
    blogId: Number(blogId),
  });
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath('/me');
};

export const markBlogRead = async (formData: FormData) => {
  const session = await auth();
  const blogId = formData.get('blog-id');

  await markRead({
    userId: Number(session?.user.id),
    blogId: Number(blogId),
  });
  revalidatePath(`/blogs/${blogId}`);
  revalidatePath('/me');
};
