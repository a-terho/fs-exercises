'use client';

import { type CSSProperties, useActionState } from 'react';
import { newBlog } from '@/app/actions/blogs';

const formStyle: CSSProperties = {
  maxWidth: '210px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
  alignItems: 'flex-end',
};

const NewBlog = () => {
  const [state, formAction] = useActionState(newBlog, { error: '' });

  return (
    <>
      <h2>add blog</h2>
      <form action={formAction}>
        <div style={formStyle}>
          <label>
            Title: <input type="text" name="title" />
          </label>
          <label>
            Author: <input type="text" name="author" />
          </label>
          <label>
            URL: <input type="text" name="url" />
          </label>
          <input type="submit" value="add" />
          {state?.error ? <p style={{ color: 'red ' }}>{state.error}</p> : null}
        </div>
      </form>
    </>
  );
};

export default NewBlog;
