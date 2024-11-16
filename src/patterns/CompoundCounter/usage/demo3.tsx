import React from 'react';

import { CompoundCounter } from 'naifu';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={8}>
      <CompoundCounter.Increment icon="circle-plus" />
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Decrement icon="circle-minus" />
    </CompoundCounter>
  );
};
