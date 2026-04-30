import { type CoursePart } from '../types';

interface Props {
  data: CoursePart;
}

const Part = ({ data }: Props) => {
  const style = { marginBottom: '1em' };

  switch (data.kind) {
    case 'basic': {
      return (
        <>
          <strong>
            {data.name} ({data.exerciseCount})
          </strong>
          <div style={style}>
            <em>{data.description}</em>
          </div>
        </>
      );
    }

    case 'background': {
      return (
        <>
          <strong>
            {data.name} ({data.exerciseCount})
          </strong>
          <div>
            <em>{data.description}</em>
          </div>
          <div style={style}>
            Additional information <a href={data.backgroundMaterial}>here</a>.
          </div>
        </>
      );
    }

    case 'group': {
      return (
        <>
          <strong>
            {data.name} ({data.exerciseCount})
          </strong>
          <div style={style}>
            Includes {data.groupProjectCount} group projects.
          </div>
        </>
      );
    }

    case 'special': {
      return (
        <>
          <strong>
            {data.name} ({data.exerciseCount})
          </strong>
          <div>
            <em>{data.description}</em>
          </div>
          <div style={style}>Requirements: {data.requirements.join(', ')}</div>
        </>
      );
    }

    default: {
      const exhaustiveCheck: never = data;
      return exhaustiveCheck;
    }
  }
};

export default Part;
