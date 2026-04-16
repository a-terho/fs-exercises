import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAnecdote } from '../services/anecdotes';

const AnecdoteForm = () => {
  const client = useQueryClient();

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = client.getQueryData(['anecdotes']);
      client.setQueryData(['anecdotes'], [...anecdotes, anecdote]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
