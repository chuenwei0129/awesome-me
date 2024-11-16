import React from 'react';

import { CompoundCounter } from 'naifu';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={8}>
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Increment icon="circle-plus" />
    </CompoundCounter>
  );
};
