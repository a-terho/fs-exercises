import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useField, useAnecdotes } from '../hooks';

const CreateNew = () => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const { addAnecdote } = useAnecdotes();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addAnecdote({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0,
    });
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.props} />
        </div>
        <div>
          author
          <input {...author.props} />
        </div>
        <div>
          url for more info
          <input {...info.props} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
