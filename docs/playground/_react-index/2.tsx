import React from "react";
import { useEffect, useRef } from "react";

export const useCounter = (initialCount: number) => {
  const countRef = useRef(initialCount);

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current += 1
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return countRef;
};

const App = () => {
  const count = useCounter(0);
  return (
    <div>{count.current}</div>
  )
}
export default App
