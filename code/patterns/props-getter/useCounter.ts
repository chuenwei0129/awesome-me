import { ButtonHTMLAttributes, useState } from 'react';

//Function which concat all functions together
export const callFnsInSequence =
  (...fns: (((...args: unknown[]) => void) | undefined)[]) =>
  (...args: unknown[]) =>
    fns.forEach((f) => f && f(...args));

export const useCounter = ({ initialCount, max }: { initialCount: number; max: number }) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount((prevCount) => Math.min(prevCount + 1, max));
  const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 0));

  //props getter for 'Counter'
  // 给用户更多权限，让用户可以与没封装一样使用 props
  // 不过 props 还是得看内部如何使用
  const getCounterProps = ({ ...otherProps } = {}) => ({
    value: count,
    // 无障碍访问
    'aria-valuemax': max,
    'aria-valuemin': 0,
    'aria-valuenow': count,
    ...otherProps,
  });

  //props getter for 'Decrement'
  // 控制反转
  const getDecrementProps = ({
    onClick,
    ...otherProps
  }: {
    onClick?: () => void;
  } & ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
    onClick: callFnsInSequence(decrement, onClick),
    disabled: count === 0,
    ...otherProps,
  });

  //props getter for 'Increment'
  const getIncrementProps = ({
    onClick,
    ...otherProps
  }: {
    onClick?: () => void;
  } & ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
    onClick: callFnsInSequence(increment, onClick),
    disabled: count === max,
    ...otherProps,
  });

  return {
    count,
    increment,
    decrement,
    getCounterProps,
    getDecrementProps,
    getIncrementProps,
  };
};
