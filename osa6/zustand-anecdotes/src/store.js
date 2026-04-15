import { create } from 'zustand';

import anecdoteService from './services/anecdotes';

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      return set(() => ({
        // järjestä tietokannasta palautuva anekdoottilista äänien mukaan
        anecdotes: anecdotes.toSorted((a, b) => b.votes - a.votes),
      }));
    },
    add: async (content) => {
      const anecdote = await anecdoteService.create(content);
      return set((old) => ({
        // lisää uusi anekdootti listan häntäpäähän
        anecdotes: [...old.anecdotes, anecdote],
      }));
    },
    remove: async (id) => {
      await anecdoteService.remove(id);
      return set((old) => ({
        // filtteröi anekdoottien listalta valittu id
        anecdotes: old.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });

      return set((old) => ({
        anecdotes: old.anecdotes
          .map((anecdote) =>
            // päivitä äänimäärä vain valitulle id:lle
            anecdote.id === id ? updated : anecdote,
          )
          // järjestä anekdoottilista äänien mukaisesti
          .toSorted((a, b) => b.votes - a.votes),
      }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);

const useNotificationStore = create((set, get) => ({
  content: '',
  timer: null,
  actions: {
    show: (content) => {
      // nollaa edellinen ajastin, jos sellainen on jo käynnissä
      if (get().timer !== null) clearTimeout(get().timer);
      // luo ajastin, joka nollaa tekstin (ja ajastimen id:n) 5 sek jälkeen
      const id = setTimeout(
        () => set(() => ({ content: '', timer: null })),
        5000,
      );
      // tallenna ilmoitusikkunan teksti ja ajastimen id tilaan
      return set(() => ({ content, timer: id }));
    },
  },
}));

export const useNotification = () =>
  useNotificationStore((state) => state.content);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
