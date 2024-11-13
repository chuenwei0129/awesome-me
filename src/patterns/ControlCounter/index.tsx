import React, { createContext, FunctionComponentElement, useEffect, useRef, useState } from 'react';
import { Count, CountProps } from './sub-components/Count';
import { Decrement, DecrementProps } from './sub-components/Decrement';
import { Increment, IncrementProps } from './sub-components/Increment';
import { Label, LabelProps } from './sub-components/Label';

/**
 * @description ControlCounter 组件的属性
 */
interface ControlCounterProps {
  /**
   * @description 初始计数值，非受控模式有效
   * @default 0
   */
  initialValue?: number;

  /**
   * @description 受控组件的计数值
   */
  value?: number; // 受控的计数值

  /**
   * @description 值变化时的回调函数
   */
  onChange?: (value: number) => void;

  /**
   * @description 子组件
   */
  children: React.ReactNode;
}

// 创建上下文，提供计数值和增减操作方法
export const CounterContext = createContext(
  {} as {
    count: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
  },
);

const ControlCounter = ({ initialValue = 0, value, onChange, children }: ControlCounterProps) => {
  const [count, setCount] = useState(initialValue); // 本地 state 用于非受控模式
  const isControlled = value !== undefined && !!onChange; // 判断是否是受控组件

  if (isControlled && initialValue !== 0) {
    console.warn('when isControlled, initialValue will be ignored'); // 受控模式下，忽略 initialValue 并警告
  }

  const getCount = () => (isControlled ? value : count); // 获取当前计数值，根据受控或非受控模式

  const firstMounded = useRef(true); // 用于判断组件是否首次加载

  useEffect(() => {
    if (!firstMounded.current && !isControlled) {
      if (onChange) onChange(count); // 在非受控模式下，计数值更新时调用 onChange 回调
    }
    firstMounded.current = false; // 标记组件已挂载
  }, [count, onChange, isControlled]);

  const handleCountChange = (newValue: number) => {
    if (isControlled) {
      onChange(newValue); // 受控模式下，通过 onChange 传递新值
    } else {
      setCount(newValue); // 非受控模式下，更新本地 state
    }
  };

  const handleIncrement = () => {
    handleCountChange(getCount() + 1); // 增加计数值
  };

  const handleDecrement = () => {
    handleCountChange(Math.max(0, getCount() - 1)); // 减少计数值，但不低于 0
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as
        | FunctionComponentElement<CountProps>
        | FunctionComponentElement<DecrementProps>
        | FunctionComponentElement<IncrementProps>
        | FunctionComponentElement<LabelProps>;
      if (
        childElement.type.displayName === 'Increment' ||
        childElement.type.displayName === 'Decrement' ||
        childElement.type.displayName === 'Label' ||
        childElement.type.displayName === 'Count'
      ) {
        return childElement; // 仅渲染特定的子组件
      } else {
        console.warn(`type: ${childElement.type} 被限制输入，已过滤`); // 过滤非特定子组件，并警告
      }
    });
  };

  return (
    <CounterContext.Provider value={{ count: getCount(), handleDecrement, handleIncrement }}>
      <div className="inline-flex border border-blue-500 line-height-1.5 rounded overflow-hidden">{renderChildren()}</div>
    </CounterContext.Provider>
  );
};

ControlCounter.Count = Count;
ControlCounter.Label = Label;
ControlCounter.Increment = Increment;
ControlCounter.Decrement = Decrement;

export { ControlCounter };
