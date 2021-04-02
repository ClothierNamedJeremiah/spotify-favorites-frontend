import { useEffect, useState } from 'react';

const PREFIX = 'spotify-favorites-';

/**
 * A hook that acts like useState but uses sessionStorage
 *
 * @param {string} key key for retrieving from sessions storage
 * @param {any} [initalValue=null] initial value for session storage if an entry doesn't exist
 * @returns same as useState expect for sessionStorage API
 */
export default function useSessionStorage(key, initialValue = null) {
  const prefixedKey = `${PREFIX}${key}`;
  const [state, setState] = useState(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);
      if (sessionStorageValue !== 'null') {
        return sessionStorageValue;
      }
      return initialValue;
    } catch (error) {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // cat throw, too.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(prefixedKey, state);
    } catch (error) {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // cat throw, too.
    }
  });

  return [state, setState];
}
