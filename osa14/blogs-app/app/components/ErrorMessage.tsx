const errorStyle: React.CSSProperties = {
  color: 'red',
  margin: 0,
};

const ErrorMessage = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <p style={errorStyle}>{text}</p>;
};

export default ErrorMessage;
