import { type CoursePart } from '../types';

interface Props {
  courseParts: CoursePart[];
}

const Content = (props: Props) => {
  return (
    <div>
      {props.courseParts.map((part: CoursePart, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
