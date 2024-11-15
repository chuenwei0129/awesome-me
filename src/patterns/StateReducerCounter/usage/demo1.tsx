import { CounterActionType, CounterStateType, DECREMENT, StateReducerCounter, useCounterStateReducer } from 'naifu';
import React from 'react';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  // 覆盖默认 reducer 行为
  const reducer = (state: CounterStateType, action: CounterActionType) => {
    switch (action.type) {
      case DECREMENT:
        return {
          count: Math.max(0, state.count - 2), // The decrement delta was changed for 2 (Default is 1)
        };
      default:
        return useCounterStateReducer.reducer(state, action);
    }
  };

  const { count, decrement, increment } = useCounterStateReducer({ initialCount: 0, max: 10 }, reducer);

  return (
    <>
      <StateReducerCounter value={count} onChange={handleChangeCounter}>
        <StateReducerCounter.Decrement icon="minus" onClick={decrement} />
        <StateReducerCounter.Label>计数器</StateReducerCounter.Label>
        <StateReducerCounter.Count limit={10} />
        <StateReducerCounter.Increment icon="plus" onClick={increment} />
      </StateReducerCounter>
      {/* 逻辑复用 */}
      <div style={{ marginTop: '20px' }}>
        <button type="button" onClick={increment} disabled={count >= 6}>
          自定义递增按钮 最大值 6
        </button>
      </div>
    </>
  );
};
