import React from 'react';
import { CustomHookCounter, useCounter } from 'favor-ui';

export default () => {
  const [count, increment, decrement] = useCounter(3);

  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <>
      <CustomHookCounter value={count} onChange={handleChangeCounter}>
        <CustomHookCounter.Decrement icon="minus" onClick={decrement} disabled={count === 1} />
        <CustomHookCounter.Label>计数器</CustomHookCounter.Label>
        <CustomHookCounter.Count limit={10} />
        <CustomHookCounter.Increment icon="plus" onClick={increment} disabled={count === 12} />
      </CustomHookCounter>
      {/* 逻辑复用 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={increment} disabled={count >= 6}>
          Custom increment btn 1 Max 6
        </button>
      </div>
    </>
  );
};
