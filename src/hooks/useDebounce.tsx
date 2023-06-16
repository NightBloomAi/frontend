import { useEffect, useState } from "react";

/**
Custom hook that returns a debounced value based on the specified value and delay.
@param {*} value - The value to debounce.
@param {number} delay - The delay in milliseconds before updating the debounced value.
@returns {*} The debounced value.
*/
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export { useDebounce };
