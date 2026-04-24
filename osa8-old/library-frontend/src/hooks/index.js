import { useState, useContext } from 'react';
import { NotificationContext } from '../components/Notification';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => setValue(target.value);
  const reset = () => setValue('');

  return {
    props: {
      value,
      type,
      onChange,
    },
    reset,
  };
};

export const useNotify = () => useContext(NotificationContext);
