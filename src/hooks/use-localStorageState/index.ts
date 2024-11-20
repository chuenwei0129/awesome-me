import { useEffect, useState } from 'react';

export default function useLocalStorageState<V>(key: string, initialValue: V) {
  const [value, setValue] = useState(initialValue);
  const setState = (newValue: V | undefined) => {
    if (newValue === undefined) {
      localStorage.removeItem(key);
      setValue(undefined as V);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    }
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    // 之前没有这个
    if (storageValue === null) {
      localStorage.setItem(key, JSON.stringify(initialValue));
    } else {
      setValue(JSON.parse(storageValue));
    }
  }, [initialValue, key]);

  return [value, setState] as const;
}
