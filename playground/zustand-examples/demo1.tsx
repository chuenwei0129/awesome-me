import React from 'react';
import { useCountStore } from './stores/CountStore';

const Counter = () => {
  const count = useCountStore((state) => state.count);
  return (
    <div>
      <h1>{Math.random()}</h1>
      <h1>{count}</h1>
    </div>
  );
};

const IncrementControl = () => {
  const increment = useCountStore((state) => state.increment);
  return (
    <div>
      <h1>{Math.random()}</h1>
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  );
};

const DecrementControl = () => {
  const decrement = useCountStore((state) => state.decrement);
  return (
    <div>
      <h1>{Math.random()}</h1>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  );
};

const UpdateCountControl = () => {
  const updateCount = useCountStore((state) => state.updateCount);
  return (
    <div>
      <h1>{Math.random()}</h1>
      <button type="button" onClick={() => updateCount((count) => count * 100)}>
        Update Count
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter></Counter>
      <IncrementControl></IncrementControl>
      <DecrementControl></DecrementControl>
      <UpdateCountControl></UpdateCountControl>
    </div>
  );
};
export default App;
