import React from "react";
import { useEffect, useState } from "react";

export const useCounter = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return count;
};

const App = () => {
  const count = useCounter(0);
  return (
    <div>{count}</div>
  )
}
export default App
