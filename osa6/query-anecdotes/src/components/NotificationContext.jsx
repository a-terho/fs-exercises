// luo konteksti, jossa notifikaatiota voidaan käyttää
import { createContext, useState } from 'react';
export const NotificationContext = createContext();

// luo kontekstin tarjoaja, joka määrittää kontekstiin sisältyvät muuttujat/metodit
// tämä on ajankohtaisesti sidottu main.jsx tiedostossa koko sovelluksen laajuudelle
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const clearNotification = () => {
    setNotification(null);
  };

  const showNotification = (text) => {
    // poista ensin edellinen ajastin, jos se on vielä käynnissä
    if (notification?.timer) clearTimeout(notification.timer);

    setNotification({
      text,
      timer: setTimeout(clearNotification, 5000),
    });
  };

  // paljasta halutut muuttujat kontektin käyttöön
  const exports = {
    notification: notification?.text,
    showNotification,
    clearNotification,
  };

  return <NotificationContext value={exports}>{children}</NotificationContext>;
};
