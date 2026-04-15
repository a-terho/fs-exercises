import { describe, test, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// mockataan anecdotes servicen API testejä varten
vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from './services/anecdotes';
import { useAnecdoteStore, useAnecdotes, useAnecdoteActions } from './store';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

const anecdotes = [
  {
    content: 'Premature optimization is the root of all evil.',
    id: '25170',
    votes: 7,
  },
  {
    content: 'If it hurts, do it more often',
    id: '47145',
    votes: 15,
  },
  {
    content:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    id: '36975',
    votes: 5,
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: '21149',
    votes: 5,
  },
];

describe('useAnecdoteActions', () => {
  test('initialize() sets anecdotes correctly with those returned from server', async () => {
    // määritä mock-funktion palauttama arvo
    anecdoteService.getAll.mockResolvedValue(anecdotes);

    // hae useAnecdoteStoreen tallennetut metodit ja kutsu niistä initialize-metodia
    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => await result.current.initialize());

    // hae tilassa/storessa olevat anekdootit ja vertaa niitä oletettuun tilaan
    expect(useAnecdoteStore.getState().anecdotes).toStrictEqual(anecdotes);
  });

  test('vote() adds a vote to the anecdote', async () => {
    // aseta alkuvaiheen tila ilman äänestystä
    useAnecdoteStore.setState({ anecdotes });

    // määritä mock-funktion palauttama arvo
    const updatedAnecdote = {
      content: 'Premature optimization is the root of all evil.',
      id: '25170',
      votes: 8,
    };
    anecdoteService.update.mockResolvedValue(updatedAnecdote);

    // hae useAnecdoteStoreen tallennetut metodit ja kutsu niistä vote-metodia
    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => await result.current.vote('25170'));

    // hae tilassa/storessa olevat anekdootit ja vertaa niitä oletettuun tilaan
    //  jossa ensimmäinen anekdootti on korvattu äänen saaneella anekdootilla
    expect(useAnecdoteStore.getState().anecdotes).toStrictEqual([
      updatedAnecdote,
      ...anecdotes.toSpliced(0, 1),
    ]);
  });
});

describe('useAnecdotes', () => {
  it('returns anecdotes in descending order by votes', () => {
    // aseta haluttu tila ja kutsu useAnecdotes hookia
    useAnecdoteStore.setState({ anecdotes });
    const { result } = renderHook(() => useAnecdotes());

    // oleta tuloksen olevan äänten mukaisessa järjestyksessä
    expect(result.current.length).toStrictEqual(anecdotes.length);
    expect(result.current).toStrictEqual(
      anecdotes.toSorted((a, b) => b.votes - a.votes),
    );
  });

  it('returns only specific anecdotes when a filter is used', () => {
    const filtered = [
      {
        content: 'If it hurts, do it more often',
        id: '47145',
        votes: 15,
      },
      {
        content: 'Adding manpower to a late software project makes it later!',
        id: '21149',
        votes: 5,
      },
    ];

    // aseta haluttu tila ja kutsu useAnecdotes hookia
    useAnecdoteStore.setState({ anecdotes, filter: 'it ' });
    const { result } = renderHook(() => useAnecdotes());

    // oleta tuloksen olevan yllä olevan mukainen
    expect(result.current.length).toStrictEqual(filtered.length);
    expect(result.current).toStrictEqual(filtered);
  });
});
