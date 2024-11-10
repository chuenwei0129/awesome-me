// 代码大致如下，子组件有自己的状态但受父组件的控制，当父组件count更新的时候，需要将子组件的number和父组件的count保持同步

import React, { useEffect, useState } from 'react';

const Son = ({ count }: { count: number }) => {
  console.log('🚀 ~ Son ~ Son:');

  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(count);
  }, [count]);

  return (
    <div>
      <p>我是子组件：{Math.random()}</p>
      <p>子组件的number是{number}</p>
      <p>父组件的count是{count}</p>
      <button type={'button'} onClick={() => setNumber(number + 1)}>
        click
      </button>
    </div>
  );
};

function Parent() {
  const [count, setCount] = useState(0);

  console.log('🚀 ~ Parent ~ Parent:');

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
