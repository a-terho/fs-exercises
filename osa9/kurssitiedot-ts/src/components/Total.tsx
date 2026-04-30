import type { CoursePart } from '../types';

interface Props {
  courseParts: CoursePart[];
}

const Total = ({ courseParts }: Props) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
