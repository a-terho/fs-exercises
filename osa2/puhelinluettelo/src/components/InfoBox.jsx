const InfoBox = ({ message }) => {
  if (message === null) return null;
  return <div className={message.style}>{message.message}</div>;
};

export default InfoBox;
