import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from '../store';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { show } = useNotificationActions();

  const handleVote = async (id, content) => {
    await vote(id);
    show(`You voted '${content}'`);
  };

  const handleRemove = async (id, content) => {
    await remove(id);
    show(`You removed '${content}'`);
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
            {anecdote.votes === 0 && (
              <button
                onClick={() => handleRemove(anecdote.id, anecdote.content)}
              >
                remove
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
