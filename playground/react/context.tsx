import React, { FC, PropsWithChildren, useContext, useState } from 'react';

// 定义两个独立的 Context 类型
interface CounterAContextType {
  countA: number;
  setCountA: (count: number) => void;
}

interface CounterBContextType {
  countB: number;
  setCountB: (count: number) => void;
}

// 创建两个独立的Context
const CounterAContext = React.createContext<CounterAContextType | undefined>(
  undefined,
);
const CounterBContext = React.createContext<CounterBContextType | undefined>(
  undefined,
);

// 分别为两个Context创建Provider组件
const CounterAProvider: FC<PropsWithChildren> = ({ children }) => {
  const [countA, setCountA] = useState(0);

  return (
    <CounterAContext.Provider value={{ countA, setCountA }}>
      {children}
    </CounterAContext.Provider>
  );
};

const CounterBProvider: FC<PropsWithChildren> = ({ children }) => {
  const [countB, setCountB] = useState(0);

  return (
    <CounterBContext.Provider value={{ countB, setCountB }}>
      {children}
    </CounterBContext.Provider>
  );
};

// 创建两个组件分别使用各自的Context
const CounterA = () => {
  const context = useContext(CounterAContext);
  if (!context)
    throw new Error('CounterA must be used within a CounterAProvider');
  const { countA, setCountA } = context;

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
  const context = useContext(CounterBContext);
  if (!context)
    throw new Error('CounterB must be used within a CounterBProvider');
  const { countB, setCountB } = context;

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

// 将两个Provider组合在App组件中
const App = () => {
  return (
    <CounterAProvider>
      <CounterBProvider>
        <CounterA />
        <CounterB />
      </CounterBProvider>
    </CounterAProvider>
  );
};

export default App;
