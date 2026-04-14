import { useAnecdoteActions } from '../store';

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const addAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.new.value;
    add(anecdote);
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
