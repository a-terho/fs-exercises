import { useState, useEffect } from 'react';

import anecdoteService from '../services/anecdotes';

export const useField = (name) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => setValue(target.value);
  const reset = () => setValue('');

  return {
    props: { name, value, onChange },
    reset,
  };
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = async (anecdote) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    setAnecdotes([...anecdotes, newAnecdote]);
  };

  const deleteAnecdote = async (anecdote) => {
    await anecdoteService.remove(anecdote.id);
    setAnecdotes(anecdotes.filter((a) => a.id !== anecdote.id));
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
