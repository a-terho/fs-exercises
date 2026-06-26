'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { newBlog } from '@/app/actions/blogs';
import ErrorMessage from '@/app/components/ErrorMessage';
import { useNotification } from '@/app/components/NotificationContext';
import type { BlogFormState } from '@/types';

const formStyle: React.CSSProperties = {
  display: 'inline-grid',
  gridTemplateColumns: 'max-content 1fr',
};

const fieldStyle: React.CSSProperties = {
  display: 'grid',
  gridColumn: '-1 / 1',
  gridTemplateColumns: 'subgrid',
};

const errorStyle: React.CSSProperties = {
  gridColumn: '-1 / 1',
  width: 0,
  minWidth: '100%',
  whiteSpace: 'nowrap',
  textAlign: 'center',
};

const initialState: BlogFormState = {
  success: false,
  errors: {},
  values: {
    title: '',
    author: '',
    url: '',
  },
};

const NewBlog = () => {
  const [state, formAction] = useActionState(newBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification('new blog added');
      router.push('/blogs');
    }
  }, [state, showNotification, router]);

  return (
    <>
      <h2>add blog</h2>
      <form action={formAction} style={formStyle}>
        <label style={fieldStyle} className="gap-2">
          Title
          <input type="text" name="title" defaultValue={state.values.title} />
        </label>
        <div style={errorStyle}>
          <ErrorMessage text={state.errors?.title} />
        </div>
        <label style={fieldStyle} className="gap-2">
          Author
          <input type="text" name="author" defaultValue={state.values.author} />
        </label>
        <div style={errorStyle}>
          <ErrorMessage text={state.errors?.author} />
        </div>
        <label style={fieldStyle} className="gap-2">
          URL
          <input type="text" name="url" defaultValue={state.values.url} />
        </label>
        <div style={errorStyle}>
          <ErrorMessage text={state.errors?.url} />
        </div>
        <input data-testid="create-blog-button" type="submit" value="Create" />
      </form>
    </>
  );
};

export default NewBlog;
