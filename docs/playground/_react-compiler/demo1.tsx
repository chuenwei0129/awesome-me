import React, { useEffect, useState } from 'react';

// 子组件 A
const ChildComponentA = ({ count }: { count: number }) => {
  useEffect(() => {
    console.log('ChildComponentA rendered');
  });

  return <div>Child A Counter: {count}</div>;
};

// 子组件 B
const ChildComponentB = ({ text }: { text: string }) => {
  useEffect(() => {
    console.log('ChildComponentB rendered');
  });

  return <div>Child B Text: {text}</div>;
};

// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text] = useState('Hello');

  useEffect(() => {
    console.log('ParentComponent rendered');
  });

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>父组件</p>
      <ChildComponentA count={count} />
      <ChildComponentB text={text} />
      <button type="button" onClick={incrementCount}>
        增加计数
      </button>
    </div>
  );
};

export default ParentComponent;
