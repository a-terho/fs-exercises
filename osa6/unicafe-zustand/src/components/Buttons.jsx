import { useStatsControls } from './store';

const Buttons = () => {
  const { addGood, addNeutral, addBad } = useStatsControls();

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
    </div>
  );
};

export default Buttons;
