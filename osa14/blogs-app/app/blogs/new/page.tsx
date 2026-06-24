'use client';

import { type CSSProperties, useActionState } from 'react';
import { newBlog } from '@/app/actions/blogs';
import { type BlogFormState } from '@/types';
import ErrorMessage from '@/app/components/ErrorMessage';

const formStyle: CSSProperties = {
  maxWidth: '250px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
  alignItems: 'flex-end',
};

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: '',
    author: '',
    url: '',
  },
};

const NewBlog = () => {
  const [state, formAction] = useActionState(newBlog, initialState);

  return (
    <>
      <h2>add blog</h2>
      <form action={formAction}>
        <div style={formStyle}>
          <label>
            Title:{' '}
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
            />
          </label>
          <ErrorMessage text={state.errors?.title} />
          <label>
            Author:{' '}
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
            />
          </label>
          <ErrorMessage text={state.errors?.author} />
          <label>
            URL:{' '}
            <input type="text" name="url" defaultValue={state.values?.url} />
          </label>
          <ErrorMessage text={state.errors?.url} />
          <input type="submit" value="add" />
        </div>
      </form>
    </>
  );
};

export default NewBlog;
