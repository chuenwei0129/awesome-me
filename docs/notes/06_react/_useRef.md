---
title: 关于 ref 的理解
group:
  title: 深入探讨
---

<code src="../../../code/react/context"></code>

```tsx
import type { FC, PropsWithChildren } from 'react';
import React from 'react';

interface CounterContextType {
  countA: number;
  setCountA: (count: number) => void;
  countB: number;
  setCountB: (count: number) => void;
}

const counterContext = React.createContext<CounterContextType>({
  countA: 0,
  setCountA: () => {},
  countB: 0,
  setCountB: () => {},
});

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [countA, setCountA] = React.useState(0);
  const [countB, setCountB] = React.useState(0);

  return (
    <counterContext.Provider value={{ countA, setCountA, countB, setCountB }}>
      {children}
    </counterContext.Provider>
  );
};

const CounterA = () => {
  const { countA, setCountA } = React.useContext(counterContext);

  console.log('CounterA Render');

  return (
    <div>
      <div>CountA: {countA}</div>
      <button type="button" onClick={() => setCountA(countA + 1)}>
        Increment
      </button>
    </div>
  );
};

const CounterB = () => {
  const { countB, setCountB } = React.useContext(counterContext);

  console.log('CounterB Render');

  return (
    <div>
      <div>CountB: {countB}</div>
      <button type="button" onClick={() => setCountB(countB + 1)}>
        Increment
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Provider>
      <CounterA />
      <CounterB />
    </Provider>
  );
};

export default App;
```

<!-- <code src="../../../code/react/ref"></code> -->
