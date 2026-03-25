import { useState } from 'react';

const LABELS = {
  good: 'hyvä',
  neutral: 'neutraali',
  bad: 'huono',
  avg: 'keskiarvo',
  pos: 'positiivisia',
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <Header>Anna palautetta</Header>
      <Button onClick={addGood}>{LABELS.good}</Button>
      <Button onClick={addNeutral}>{LABELS.neutral}</Button>
      <Button onClick={addBad}>{LABELS.bad}</Button>

      <Header>Tilastot</Header>
      <Statistics data={{ good, neutral, bad }} />
    </div>
  );
};

const Header = ({ children }) => <h2>{children}</h2>;

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ data }) => {
  const { good, neutral, bad } = data;
  const total = good + neutral + bad;

  // placeholder alkuvaiheen tilalle
  if (total == 0) return <p>Palautteita ei ole.</p>;

  const countAvg = () => {
    // if (total == 0) return '-';
    const points = good * 1 + bad * -1;
    return (points / total).toFixed(4);
  };

  const countPos = () => {
    // if (total == 0) return '-';
    return `${((good / total) * 100).toFixed(2)} %`;
  };

  return (
    <table>
      <tbody>
        <StatisticLine name={LABELS.good} value={good}></StatisticLine>
        <StatisticLine name={LABELS.neutral} value={neutral}></StatisticLine>
        <StatisticLine name={LABELS.bad} value={bad}></StatisticLine>
        <StatisticLine name={LABELS.avg} value={countAvg()}></StatisticLine>
        <StatisticLine name={LABELS.pos} value={countPos()}></StatisticLine>
      </tbody>
    </table>
  );
};

export default App;
