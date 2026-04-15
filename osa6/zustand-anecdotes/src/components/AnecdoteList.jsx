import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from '../store';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote } = useAnecdoteActions();
  const { show } = useNotificationActions();

  const handleVote = (id, content) => {
    show(`You voted '${content}'`);
    vote(id);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
