import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = ({ target }) => setValue(target.value);
  const reset = () => setValue('');

  return {
    props: {
      type,
      value,
      onChange,
    },
    reset,
  };
};

export default useField;
