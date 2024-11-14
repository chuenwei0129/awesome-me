import { ControlledCounter } from 'naifu';
import React from 'react';

export default () => {
  // 回调
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <ControlledCounter initialValue={8} onChange={handleChangeCounter}>
      <ControlledCounter.Decrement icon="minus" />
      <ControlledCounter.Label>计数器</ControlledCounter.Label>
      <ControlledCounter.Count limit={10} />
      <ControlledCounter.Increment icon="plus" />
    </ControlledCounter>
  );
};
