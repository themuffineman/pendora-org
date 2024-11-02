import { useState, useEffect } from 'react';

// Helper function to get today's date in 'YYYY-MM-DD' format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

function useStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useServiceUsage() {
  const [usageData, setUsageData] = useStorage('serviceUsage', { count: 0, lastDate: getTodayDate() });

  useEffect(() => {
    const today = getTodayDate();

    // If the last usage date is different from today's date, reset the count
    if (usageData.lastDate !== today) {
      setUsageData({ count: 0, lastDate: today });
    }
  }, [usageData, setUsageData]);

  // Increment usage
  const incrementUsage = () => {
    setUsageData((prevData) => ({
      count: prevData.count + 1,
      lastDate: getTodayDate(),
    }));
  };

  return [usageData.count, incrementUsage];
}
