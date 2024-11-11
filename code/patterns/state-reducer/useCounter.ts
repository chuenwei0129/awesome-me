import { useReducer } from 'react';

export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

export type CounterState = {
  count: number;
};

export type CounterAction = {
  type: typeof INCREMENT | typeof DECREMENT;
  payload?: Record<string, any>;
};

const defaultReducer = (state: CounterState, action: CounterAction) => {
  const { type, payload } = action;

  switch (type) {
    case INCREMENT:
      return {
        count: Math.min(state.count + 1, payload?.max ?? Infinity),
      };
    case DECREMENT:
      return {
        count: Math.max(0, state.count - 1),
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

const useCounter = (
  { initialCount, max }: { initialCount: number; max?: number },
  reducer = defaultReducer,
) => {
  // 第二个参数初始状态
  const [{ count }, dispatch] = useReducer(reducer, { count: initialCount });

  const increment = () => dispatch({ type: INCREMENT, payload: { max } });
  const decrement = () => dispatch({ type: DECREMENT });

  return { count, increment, decrement };
};

useCounter.reducer = defaultReducer;
useCounter.types = {
  increment: INCREMENT,
  decrement: DECREMENT,
};

export { useCounter };
