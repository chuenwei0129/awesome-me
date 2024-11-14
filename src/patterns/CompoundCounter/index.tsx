import React, { createContext, FunctionComponentElement, useEffect, useRef, useState } from 'react';
import { Count, CountProps } from './sub-components/Count';
import { Decrement, DecrementProps } from './sub-components/Decrement';
import { Increment, IncrementProps } from './sub-components/Increment';
import { Label, LabelProps } from './sub-components/Label';

export type CompoundCounterProps = {
  /**
   * @description 记数器的初始值
   * @default 0
   */
  initialValue?: number; // 初始值

  /**
   * @description 计数值改变时的回调函数
   */
  onChange?: (value: number) => void; // 值改变时的回调函数

  /**
   * @description 记数器的子组件
   */
  children: React.ReactNode; // 子组件
};

type CounterContextType = {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

// 创建上下文，用于传递计数器状态和控制函数
export const CounterContext = createContext<CounterContextType>({} as CounterContextType);

const CompoundCounter = ({ initialValue = 0, onChange, children }: CompoundCounterProps) => {
  // 使用state保存当前的计数值
  const [count, setCount] = useState(initialValue);

  // 使用ref来保存组件是否是第一次挂载
  const firstMounded = useRef(true);

  // 监听count的变化，调用onChange回调函数
  useEffect(() => {
    if (!firstMounded.current) {
      if (onChange) onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  // 增加计数值的函数
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // 减少计数值的函数
  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  // 渲染子组件，过滤不符合要求的子组件
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
        return childElement;
      } else {
        console.warn(`type: ${childElement.type} 被限制输入，已过滤`);
      }
    });
  };

  return (
    // 使用上下文提供器传递计数器状态和控制函数
    <CounterContext.Provider value={{ count, handleDecrement, handleIncrement }}>
      <div className={'inline-flex border border-teal-500 leading-[1.5] rounded overflow-hidden border-solid'}>{renderChildren()}</div>
    </CounterContext.Provider>
  );
};

// 将子组件挂载到CompoundCounter组件上
CompoundCounter.Count = Count;
CompoundCounter.Label = Label;
CompoundCounter.Increment = Increment;
CompoundCounter.Decrement = Decrement;

export default CompoundCounter;
