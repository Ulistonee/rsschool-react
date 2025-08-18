'use client';

import { useState, useEffect } from 'react';
import { getStoredValueFromLS } from '../utils/getStoredValueFromLS';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const valueFromLS = getStoredValueFromLS(key, initialValue);
    setStoredValue(valueFromLS);
  }, [key, initialValue]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
