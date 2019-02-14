/* eslint-disable no-shadow */
import { useState } from 'react';

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState('');

  const onChange = (value) => {
    console.log(value);
    setValue(value);
  };

  return {
    value,
    onChange,
    isValid,
    setIsValid,
  };
}

export default useInput;
