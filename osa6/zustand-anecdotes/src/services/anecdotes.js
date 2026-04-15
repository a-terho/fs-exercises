const baseUrl = 'http://localhost:3001/anecdotes';

const asObject = (content) => ({ content, votes: 0 });

const getAll = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error(
      `Request failed with status code ${res.status}: ${res.statusText}`,
    );
  }

  return await res.json();
};

const create = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(asObject(content)),
  };
  const res = await fetch(baseUrl, options);

  if (!res.ok) {
    throw new Error(
      `Request failed with status code ${res.status}: ${res.statusText}`,
    );
  }

  return await res.json();
};

const update = async (id, anecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  };
  const res = await fetch(`${baseUrl}/${id}`, options);

  if (!res.ok) {
    throw new Error(
      `Request failed with status code ${res.status}: ${res.statusText}`,
    );
  }

  return await res.json();
};

export default { getAll, create, update };
