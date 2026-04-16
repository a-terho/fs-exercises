import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { getAnecdotes, updateAnecdote } from './services/anecdotes';

const App = () => {
  const {
    data: anecdotes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2,
  });

  const client = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const data = client.getQueryData(['anecdotes']);
      client.setQueryData(
        ['anecdotes'],
        data.map((a) => {
          // päivitä queryn data vain mutaation tuloksen osalta
          if (a.id === anecdote.id) return anecdote;
          // muutoin jätä data ennalleen
          return a;
        }),
      );
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isPending) {
    return <p>loading...</p>;
  } else if (isError) {
    return <p>anecdote service not available due to problems in server</p>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
