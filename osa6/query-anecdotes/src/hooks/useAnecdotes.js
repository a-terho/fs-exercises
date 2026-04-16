import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
} from '../services/anecdotes';

const useAnecdotes = () => {
  const {
    data: anecdotes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2,
  });

  const client = useQueryClient();

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = client.getQueryData(['anecdotes']);
      // päivitä query data lisämällä anekdootti listan hännille
      client.setQueryData(['anecdotes'], [...anecdotes, anecdote]);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const data = client.getQueryData(['anecdotes']);
      client.setQueryData(
        ['anecdotes'],
        data.map((a) => {
          // päivitä query data vain mutaation tuloksen osalta
          if (a.id === anecdote.id) return anecdote;
          // muutoin jätä data ennalleen
          return a;
        }),
      );
    },
  });

  return {
    isPending,
    isError,
    anecdotes,
    createAnecdote: (anecdote) => createAnecdoteMutation.mutate(anecdote),
    updateAnecdote: (anecdote) => updateAnecdoteMutation.mutate(anecdote),
  };
};

export default useAnecdotes;
