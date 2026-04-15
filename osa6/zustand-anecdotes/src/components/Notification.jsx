import { useNotification } from '../store';

const Notification = () => {
  const content = useNotification();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  // piilota ikkuna, jos tekstisisältöä ei ole
  if (!content) return null;

  return <div style={style}>{content}</div>;
};

export default Notification;
