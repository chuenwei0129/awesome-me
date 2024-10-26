import React from 'react';
import { useBearStore } from './stores/BearStore';

const BearCard = () => {
  const { bears, increaseBear, removeAllBears } = useBearStore();
  return (
    <div>
      <p>bears: {bears}</p>
      <div>
        <button type="button" onClick={increaseBear}>
          add bear
        </button>
        <button type="button" onClick={removeAllBears}>
          remove all bears
        </button>
      </div>
    </div>
  );
};
export default BearCard;
