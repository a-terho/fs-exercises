import { useEffect } from 'react';
import { useAnecdoteActions } from './store';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const { initialize } = useAnecdoteActions();

  useEffect(() => {
    initialize(); // asynkroninen funktio
  }, [initialize]);

  return (
    <div>
      <Filter />
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
