import { useState, useImperativeHandle } from 'react';

const Notification = ({ ref }) => {
  const [notification, setNotification] = useState(null);

  // paljasta komponentin metodit muiden komponenttien käyttöön
  useImperativeHandle(ref, () => {
    return {
      hide: clearNotification,
      showInfo,
      showError,
    };
  });

  const clearNotification = () => {
    if (notification?.id) clearTimeout(notification.id);
    setNotification(null);
  };

  const showInfo = (text) => {
    clearNotification();

    const id = setTimeout(() => setNotification(null), 4000);
    setNotification({ id, text, style: 'info' });
  };

  const showError = (text) => {
    clearNotification();

    const id = setTimeout(() => setNotification(null), 8000);
    setNotification({ id, text, style: 'error' });
  };

  // piilota ilmoitusikkuna, jos viestiä ei ole
  if (!notification) return null;

  return <div className={notification.style}>{notification.text}</div>;
};

export default Notification;
