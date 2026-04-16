const baseUrl = 'http://localhost:3001/anecdotes';

const getAnecdotes = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Request failed with status code ${res.status}: ${res.statusText}`,
    );
  }
  return await res.json();
};

const createAnecdote = async (anecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  };
  const res = await fetch(baseUrl, options);

  if (!res.ok) {
    throw new Error(
      `Request failed with status code ${res.status}: ${res.statusText}`,
    );
  }
  return await res.json();
};

const updateAnecdote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  };
  const res = await fetch(`${baseUrl}/${anecdote.id}`, options);

  if (!res.ok) {
    throw new Error(
      `Request failed with status code ${res.status}: ${res.statusText}`,
    );
  }
  return await res.json();
};

export { getAnecdotes, createAnecdote, updateAnecdote };
