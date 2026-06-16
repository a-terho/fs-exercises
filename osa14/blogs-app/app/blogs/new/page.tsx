import { type CSSProperties } from 'react';
import { newBlog } from '@/app/actions/blogs';

const formStyle: CSSProperties = {
  maxWidth: '210px',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '5px',
  alignItems: 'flex-end',
};

const NewBlog = () => {
  return (
    <>
      <h2>add blog</h2>
      <form action={newBlog}>
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
        </div>
      </form>
    </>
  );
};

export default NewBlog;
