import { useState } from 'react';

const useDebounce = () => {
  const [timeOut, setTimeOut] = useState<NodeJS.Timeout>();

  return <T>(value: T, delay: number, callback: (arg0: T) => void) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }

    const handleTimeOut = setTimeout(() => {
      callback(value);
    }, delay);

    setTimeOut(handleTimeOut);
  };
};

export default useDebounce;
