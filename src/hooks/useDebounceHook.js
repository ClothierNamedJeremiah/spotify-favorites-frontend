import { useEffect, useRef } from 'react';

export default function useDebounceEffect(callback, interval, deps) {
  const debounceTimeout = useRef(null);
  const leading = useRef(true);

  useEffect(() => {
    if (debounceTimeout.current !== null) {
      clearTimeout(debounceTimeout.current);
    }

    if (leading.current) {
      callback();
      leading.current = false;
    }

    debounceTimeout.current = setTimeout(() => {
      leading.current = true;
      callback();
    }, interval);
  }, deps);
}
