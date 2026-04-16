import useAnecdotes from '../hooks/useAnecdotes';
import useNotify from '../hooks/useNotify';

const AnecdoteForm = () => {
  const { createAnecdote } = useAnecdotes();
  const { showNotification } = useNotify();

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (await createAnecdote({ content, votes: 0 })) {
      showNotification(`anecdote '${content}' created`);
      event.target.reset();
    } else {
      showNotification('too short anecdote, must have length 5 or more');
    }
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
