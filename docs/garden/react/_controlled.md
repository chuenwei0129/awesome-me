---
title: 受控与非受控
toc: content
group:
  title: 深入探讨
---

```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  function increment() {
    setCount(count + 1)
  }
  return <button onClick={increment}>{count}</button>;
}

export default () => <App />
```

```jsx

import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setTimeout(() => {
      console.log('setTimeout 执行');
      setCount(count + 1);
    }, 1000);
  }

  return <button onClick={increment}>{count}</button>;
}

export default () => <App />
```
