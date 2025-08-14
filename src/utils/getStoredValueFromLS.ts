export const getStoredValueFromLS = <T>(key: string, initialValue: T) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return initialValue;
  }
};
