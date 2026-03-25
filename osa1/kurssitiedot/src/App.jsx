const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      <Part name={parts[0].name} numEx={parts[0].exercises} />
      <Part name={parts[1].name} numEx={parts[1].exercises} />
      <Part name={parts[2].name} numEx={parts[2].exercises} />
    </div>
  );
};

const Part = ({ name, numEx }) => (
  <p>
    {name} {numEx}
  </p>
);

const Total = ({ parts }) => (
  <p>
    Number of exercises{' '}
    {parts.reduce((total, part) => total + part.exercises, 0)}
  </p>
);

export default App;
