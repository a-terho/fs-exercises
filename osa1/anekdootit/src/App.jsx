import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  const [topAnecdote, setTopAnecdote] = useState({
    votes: 0,
    selection: -1,
  });

  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const newAnecdote = () => {
    // valitse satunnainen, joka on kuitenkin aina eri kuin edellinen
    let newSelection = randInt(0, anecdotes.length - 1);
    while (newSelection == selected)
      newSelection = randInt(0, anecdotes.length - 1);

    setSelected(newSelection);
  };

  const voteAnecdote = (selection) => {
    return () => {
      const updated = !votes[selection] ? 1 : votes[selection] + 1;
      setVotes({
        ...votes,
        [selection]: updated,
      });

      // tarkistetaan samalla, onko tällä nyt eniten ääniä
      if (updated > topAnecdote.votes) {
        setTopAnecdote({
          votes: updated,
          selection,
        });
      }
    };
  };

  const topAnecdoteTag =
    topAnecdote.votes > 0 ? (
      <Anecdote
        text={anecdotes[topAnecdote.selection]}
        votes={topAnecdote.votes}
      />
    ) : (
      <p>There is no popular anecdote yet.</p>
    );

  return (
    <>
      <Header>Anecdote of the day</Header>
      <Anecdote
        text={anecdotes[selected]}
        votes={votes[selected] ? votes[selected] : 0}
      />
      <button onClick={voteAnecdote(selected)}>vote</button>
      <button onClick={newAnecdote}>new anecdote</button>

      <Header>Anecdote with most votes</Header>
      {topAnecdoteTag}
    </>
  );
};

const Header = ({ children }) => <h2>{children}</h2>;

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </>
  );
};

export default App;
