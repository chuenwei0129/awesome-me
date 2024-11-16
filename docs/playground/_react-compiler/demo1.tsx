import React, { useState } from 'react';

// 子组件 A
const ChildComponentA = ({ count }: { count: number }) => {
  return (
    <div>
      <div>ChildComponentA: {Math.random()}</div>
      <div>Child A Counter: {count}</div>
    </div>
  );
};

// 子组件 B
const ChildComponentB = ({ text }: { text: string }) => {
  return (
    <div>
      <div>ChildComponentB: {Math.random()}</div>
      <div>Child B Text: {text}</div>
    </div>
  );
};

// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text] = useState('Hello');

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>父组件</p>
      <div>ParentComponent: {Math.random()}</div>
      <ChildComponentA count={count} />
      <ChildComponentB text={text} />
      <button type="button" onClick={incrementCount}>
        增加计数
      </button>
    </div>
  );
};

export default ParentComponent;
