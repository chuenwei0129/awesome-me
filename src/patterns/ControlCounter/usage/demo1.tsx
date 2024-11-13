import { ControlCounter } from 'naifu';
import React from 'react';

export default () => {
  const [count, setCount] = React.useState(8);
  // 回调
  const handleChangeCounter = (newVal: number) => {
    setCount(newVal);
  };

  return (
    <ControlCounter value={count} onChange={handleChangeCounter}>
      <ControlCounter.Decrement icon="minus" />
      <ControlCounter.Label>计数器</ControlCounter.Label>
      <ControlCounter.Count limit={10} />
      <ControlCounter.Increment icon="plus" />
    </ControlCounter>
  );
};
