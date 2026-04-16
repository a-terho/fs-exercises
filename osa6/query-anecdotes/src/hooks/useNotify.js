import { useContext } from 'react';
import { NotificationContext } from '../components/NotificationContext';

// luo custom hook, jolla sovelletaan kontekstin sisältämiä muuttujia/metodeja
const useNotify = () => {
  const context = useContext(NotificationContext);
  // jos hookia käytettäisiin kontekstin ulkopuolella, heitä virheilmoitus
  if (!context)
    throw new Error('useNotify must be used within NotificationProvider');

  return context;
};

export default useNotify;
