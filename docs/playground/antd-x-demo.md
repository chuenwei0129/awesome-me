---
group:
  title: React
  order: 0
title: Ant Design X
toc: content
order: -1003
---

> TODO

```tsx
import React from "react";
import { useEffect, useState } from "react";

const useCounter = (initialCount: number) => {
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
```

```tsx
import React from "react";
import { useEffect, useRef, useState } from "react";

const useCounter = (initialCount: number) => {
  const countRef = useRef(initialCount);
  const [, update] = useState<number>()

  useEffect(() => {
    const timer = setInterval(() => {
      countRef.current += 1
      update(Math.random())
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
```
