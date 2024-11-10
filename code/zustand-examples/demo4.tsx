import React from 'react';
import { useBearStore } from './stores/BearStore';

const Demo4 = () => {
  const { bears } = useBearStore();

  const handleClick = () => {
    useBearStore.setState({
      bears: bears + 1,
    });
  };

  return (
    <div>
      <h1>{Math.random()}</h1>
      <p>Bears: {bears}</p>
      <button type="button" onClick={handleClick}>
        add bear
      </button>
    </div>
  );
};
export default Demo4;
