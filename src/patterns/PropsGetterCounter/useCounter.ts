import { ButtonHTMLAttributes, useState } from 'react';

// 定义一个函数来按顺序调用传入的函数列表
export const callFnsInSequence =
  (...fns: (((...args: unknown[]) => void) | undefined)[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn(...args));

// 定义一个自定义的 Hook: useCounter
export const useCounter = ({ initialCount, max }: { initialCount: number; max: number }) => {
  const [count, setCount] = useState(initialCount); // 初始化计数值
  const increment = () => setCount((prevCount) => Math.min(prevCount + 1, max)); // 增加计数，如果超出最大值，则保持为最大值
  const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 0)); // 减少计数，如果低于 0，则保持为 0

  // 获取计数器属性（这是为了支持无障碍访问）
  const getCounterProps = ({ ...otherProps } = {}) => ({
    value: count,
    'aria-valuemax': max, // 设置 aria 最大值
    'aria-valuemin': 0, // 设置 aria 最小值
    'aria-valuenow': count, // 设置当前值
    ...otherProps,
  });

  // 获取减少按钮的属性
  const getDecrementProps = ({
    onClick,
    ...otherProps
  }: {
    onClick?: () => void;
  } & ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
    onClick: callFnsInSequence(decrement, onClick), // 点击时先调用 decrement，然后调用用户自定义的 onClick
    disabled: count === 0, // 如果计数值为0，则按钮不可用
    ...otherProps,
  });

  // 获取增加按钮的属性
  const getIncrementProps = ({
    onClick,
    ...otherProps
  }: {
    onClick?: () => void;
  } & ButtonHTMLAttributes<HTMLButtonElement> = {}) => ({
    onClick: callFnsInSequence(increment, onClick), // 点击时先调用 increment，然后调用用户自定义的 onClick
    disabled: count === max, // 如果计数值为最大值，则按钮不可用
    ...otherProps,
  });

  // 返回计数值及使用此 Hook 提供的操作和属性获取器
  return {
    count,
    increment,
    decrement,
    getCounterProps,
    getDecrementProps,
    getIncrementProps,
  };
};
