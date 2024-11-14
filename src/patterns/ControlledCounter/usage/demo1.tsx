import { ControlledCounter } from 'naifu';
import React from 'react';

export default () => {
  const [count, setCount] = React.useState(8);
  // 回调
  const handleChangeCounter = (newVal: number) => {
    setCount(newVal);
  };

  return (
    <ControlledCounter value={count} onChange={handleChangeCounter}>
      <ControlledCounter.Decrement icon="minus" />
      <ControlledCounter.Label>计数器</ControlledCounter.Label>
      <ControlledCounter.Count limit={10} />
      <ControlledCounter.Increment icon="plus" />
    </ControlledCounter>
  );
};
