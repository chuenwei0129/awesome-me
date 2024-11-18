import React, { useState, useCallback, memo } from 'react';
import { message } from 'antd';
import { useMemoizedFn } from 'ahooks';

const Child = memo(({ f, name }: { f: () => void, name: string }) => {
  return <div>
    <h2>{name} 作为 props 传递给子组件</h2>
    <p>是否重渲染：{Math.random()}</p>
  </div>
})

export default () => {
  const [count, setCount] = useState(0);

  const callbackFn = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);

  const memoizedFn = useMemoizedFn(() => {
    message.info(`Current count is ${count}`);
  });

  return (
    <>
      <p>count: {count}</p>
      <button
        type="button"
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Add Count
      </button>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={callbackFn}>
          call callbackFn
        </button>
        <button type="button" onClick={memoizedFn} style={{ marginLeft: 8 }}>
          call memoizedFn
        </button>
      </div>
      <Child f={callbackFn} name='callbackFn'></Child>
      <Child f={memoizedFn} name='memoizedFn'></Child>
    </>
  );
};
