import React, { useState } from 'react';

function A() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>我是父组件</p>
      <p>父组件的count是{count}</p>
      <button onClick={() => setCount(count + 1)}>click</button>
      <B key={count} count={count} />
    </div>
  );
}

const B = ({ count }: { count: number }) => {
  const [number, setNumber] = useState(count);

  console.log('子组件render');
  return (
    <div>
      <p>我是子组件</p>
      <p>子组件的number是{number}</p>
      <button onClick={() => setNumber(number + 1)}>click</button>
    </div>
  );
};

export default A;
