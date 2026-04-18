import { useContext } from 'react';
import { NotificationContext } from '../components/NotificationProvider';

const useNotify = () => {
  const context = useContext(NotificationContext);

  if (!context)
    throw new Error('useNotify must be used within NotificationProvider');
  return context;
};

export default useNotify;
