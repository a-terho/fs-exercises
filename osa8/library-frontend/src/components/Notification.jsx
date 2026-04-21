import { useState, createContext, useContext } from 'react';

const NotificationContext = createContext();

const Notification = () => {
  const { content } = useContext(NotificationContext);

  if (!content) return null;
  return <p style={{ color: 'red' }}>{content}</p>;
};

const NotificationProvider = ({ children }) => {
  const [content, setContent] = useState('');

  const notify = (message) => {
    setContent(message);
    setTimeout(() => setContent(''), 5000);
  };

  const exports = {
    content,
    notify,
  };

  return <NotificationContext value={exports}>{children}</NotificationContext>;
};

export { Notification, NotificationContext, NotificationProvider };
