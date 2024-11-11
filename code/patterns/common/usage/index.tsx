import React from 'react';
import { CommonCounter } from 'favor-ui';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CommonCounter
      limit={10}
      initialValue={11}
      label={'计数器'}
      iconDecrement={'minus'}
      iconIncrement={'plus'}
      onChange={handleChangeCounter}
    />
  );
};
