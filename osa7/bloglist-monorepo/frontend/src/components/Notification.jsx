import { useState, useImperativeHandle } from 'react';

import styled from 'styled-components';

const Box = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 0.9em;
  padding: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
  border-style: dotted;

  &.info {
    background: lightblue;
    border-color: black;
    color: black;
  }

  &.error {
    background: lightcoral;
    border-color: white;
    color: white;
  }
`;

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

  return <Box className={notification.style}>{notification.text}</Box>;
};

export default Notification;
