import { ControlCounter } from 'naifu';
import React from 'react';

export default () => {
  // 回调
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <ControlCounter initialValue={8} onChange={handleChangeCounter}>
      <ControlCounter.Decrement icon="minus" />
      <ControlCounter.Label>计数器</ControlCounter.Label>
      <ControlCounter.Count limit={10} />
      <ControlCounter.Increment icon="plus" />
    </ControlCounter>
  );
};
