import { useState } from 'react';

const NewBlogForm = ({ onBlogPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleAddBlog = async (event) => {
    event.preventDefault();
    if (await onBlogPost({ title, author, url })) {
      // tyhjennä kentät vain jos lisäys onnistui
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <>
      <h2>add new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label>
            title{' '}
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            author{' '}
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            url{' '}
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            ></input>
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewBlogForm;
