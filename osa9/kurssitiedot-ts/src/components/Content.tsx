import { type CoursePart } from '../types';
import Part from './Part';

interface Props {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((part: CoursePart, index) => (
        <Part key={index} data={part} />
      ))}
    </div>
  );
};

export default Content;
