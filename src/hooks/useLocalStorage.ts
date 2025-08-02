import { useState, useEffect } from 'react';
import { getStoredValueFromLS } from './utils/getStoredValueFromLS.ts';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(
    getStoredValueFromLS(key, initialValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
