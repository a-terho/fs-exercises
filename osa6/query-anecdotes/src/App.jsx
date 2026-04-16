import useAnecdotes from './hooks/useAnecdotes';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const { isPending, isError, anecdotes, updateAnecdote } = useAnecdotes();

  const handleVote = (anecdote) =>
    updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 });

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
