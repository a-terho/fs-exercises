'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { addBlog, likeBlog } from '../services/blogs';

export const newBlog = async (formData: FormData) => {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const url = formData.get('url') as string;

  addBlog({ title, author, url });
  revalidatePath('/blogs');
  redirect('/blogs');
};

export const sendBlogLike = async (formData: FormData) => {
  const id = formData.get('id') as string;

  likeBlog(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath('/blogs');
};

export const searchBlogs = async (formData: FormData) => {
  const query = formData.get('query');
  if (typeof query === 'string' && query.trim() !== '') {
    redirect(`/blogs?q=${query}`);
  } else {
    redirect('/blogs');
  }
};
