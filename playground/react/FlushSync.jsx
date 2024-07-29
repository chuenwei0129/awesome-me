import { useState } from 'react';
import { flushSync } from 'react-dom';

export default function FlushSync() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount((c) => c + 1);

    flushSync(() => {
      setFlag((f) => !f);
    });
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Next
      </button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  );
}
