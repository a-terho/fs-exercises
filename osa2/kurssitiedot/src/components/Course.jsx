const Course = ({ course }) => {
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ text }) => <h2>{text}</h2>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} numEx={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, numEx }) => (
  <p>
    {name} {numEx}
  </p>
);

const Total = ({ parts }) => (
  <p>
    <b>
      total of {parts.reduce((total, part) => total + part.exercises, 0)}{' '}
      exercises
    </b>
  </p>
);

export default Course;
