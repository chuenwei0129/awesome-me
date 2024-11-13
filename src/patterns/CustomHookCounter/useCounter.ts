import { useState } from 'react';

export const useCounter = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 0));
  return [count, increment, decrement] as const;
};
