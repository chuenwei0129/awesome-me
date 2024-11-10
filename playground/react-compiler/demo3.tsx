import React, { useState } from 'react';

const Son = React.memo(({ count }: { count: number }) => {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <p>我是子组件：{Math.random()}</p>
      <p>子组件的number是{number}</p>
      <button type={'button'} onClick={() => setNumber(number + 1)}>
        click
      </button>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>我是父组件：{Math.random()}</p>
      <p>父组件的count是{count}</p>
      <button type={'button'} onClick={() => setCount(count + 1)}>
        click
      </button>
      <Son count={count} />
    </div>
  );
}

export default Parent;
