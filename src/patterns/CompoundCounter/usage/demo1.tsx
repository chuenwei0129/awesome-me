import React from 'react';

import { CompoundCounter } from 'naifu';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={8}>
      <CompoundCounter.Decrement icon="minus" />
      <h1>hello world</h1>
      <CompoundCounter.Label>计数器</CompoundCounter.Label>
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Increment icon="plus" />
    </CompoundCounter>
  );
};
