import { useState, useEffect } from 'react';

function useStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Get value from localStorage if it exists, else use the initial value
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    // Update localStorage whenever the value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage example for tracking service usage
export function useServiceUsage() {
  const [usageCount, setUsageCount] = useStorage('serviceUsageCount', 0);

  // Increment usage
  const incrementUsage = () => {
    setUsageCount((prevCount) => prevCount + 1);
  };

  return [usageCount, incrementUsage];
}
