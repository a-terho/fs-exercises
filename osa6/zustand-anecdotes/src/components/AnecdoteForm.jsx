import { useAnecdoteActions, useNotificationActions } from '../store';

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();
  const { show } = useNotificationActions();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.new.value;

    await add(anecdote);
    show(`You added '${anecdote}'`);
    event.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
