import { type CSSProperties } from 'react';

const errorStyle: CSSProperties = {
  color: 'red',
};

const ErrorMessage = ({ text }: { text?: string }) => {
  if (!text) return null;
  return <p style={errorStyle}>{text}</p>;
};

export default ErrorMessage;
