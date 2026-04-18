import { createContext, useReducer } from 'react';
const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const reducer = (notification, action) => {
    // nollaa jo käynnissä oleva ajastin
    if (notification?.id) clearTimeout(notification.id);

    // jos toimintoa ei anneta, ilmoitus poistetaan
    if (!action) return null;

    if (action.type === 'error') {
      return {
        id: setTimeout(() => hideNotification(), 8000),
        text: action.text,
        style: 'error',
      };
    } else if (typeof action.text === 'string' || typeof action === 'string') {
      // info on oletusarvoinen ilmoitustyyli, sen tyyppiä ei tarvitse määrittää
      // jos action on merkkijono, käytetään sitä sellaisenaan tekstinä
      const text = action.text ? action.text : action;
      return {
        id: setTimeout(() => hideNotification(), 4000),
        text,
        style: 'info',
      };
      // jos tekstiä ei anneta, ilmoitus poistetaan
    } else return null;
  };

  const [notification, showNotification] = useReducer(reducer, null);
  const hideNotification = () => showNotification(null);

  // paljasta muuttujat kontekstia hyödyntävien komponenttien käyttöön
  const exports = {
    notification,
    hideNotification,
    showNotification,
  };

  return <NotificationContext value={exports}>{children}</NotificationContext>;
};

export { NotificationContext };
export default NotificationProvider;
