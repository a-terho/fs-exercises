interface Props {
  error: string;
}

const Notify = ({ error }: Props) => {
  if (!error) return null;

  return <p style={{ color: 'red' }}>{error}</p>;
};

export default Notify;
