import { CustomHookCounter, useCounterCustomHook } from 'naifu';
import React from 'react';

export default () => {
  const [count, increment, decrement] = useCounterCustomHook(3);

  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <>
      {/* 相当于 useState 给 useContext 传递值 */}
      <CustomHookCounter value={count} onChange={handleChangeCounter}>
        <CustomHookCounter.Decrement icon="square-minus" onClick={decrement} disabled={count === 1} />
        <CustomHookCounter.Label>计数器</CustomHookCounter.Label>
        <CustomHookCounter.Count limit={10} />
        <CustomHookCounter.Increment icon="circle-plus" onClick={increment} disabled={count === 12} />
      </CustomHookCounter>
      {/* 逻辑复用 */}
      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          onClick={() => {
            increment();
          }}
          disabled={count >= 6}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4e76a2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: count >= 6 ? 0.3 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          自定义递增按钮 最大值 6
        </button>
      </div>
    </>
  );
};
