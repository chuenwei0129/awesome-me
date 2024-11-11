import React from 'react';
import {
  CounterAction,
  CounterState,
  DECREMENT,
  ReducerCounter,
  useReducerCounter,
} from 'favor-ui';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  // 覆盖默认 reducer 行为
  const reducer = (state: CounterState, action: CounterAction) => {
    switch (action.type) {
      case DECREMENT:
        return {
          count: Math.max(0, state.count - 2), // The decrement delta was changed for 2 (Default is 1)
        };
      default:
        return useReducerCounter.reducer(state, action);
    }
  };

  const { count, decrement, increment } = useReducerCounter({ initialCount: 0, max: 10 }, reducer);

  return (
    <>
      <ReducerCounter value={count} onChange={handleChangeCounter}>
        <ReducerCounter.Decrement icon="minus" onClick={decrement} />
        <ReducerCounter.Label>计数器</ReducerCounter.Label>
        <ReducerCounter.Count limit={10} />
        <ReducerCounter.Increment icon="plus" onClick={increment} />
      </ReducerCounter>
      {/* 逻辑复用 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={increment} disabled={count >= 6}>
          Custom increment btn 1 Max 6
        </button>
      </div>
    </>
  );
};
