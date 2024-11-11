import React, { createContext, FunctionComponentElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Count } from './sub-components/Count';
import { Decrement } from './sub-components/Decrement';
import { Increment } from './sub-components/Increment';
import { Label } from './sub-components/Label';

type ControlCounterProps = {
  initialValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  children: React.ReactNode;
};

export const CounterContext = createContext(
  {} as {
    count: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
  },
);

const ControlCounter = ({ initialValue = 0, value, onChange, children }: ControlCounterProps) => {
  // 非受控，内部状态
  const [count, setCount] = useState(initialValue);

  // 是否受控
  const isControlled = value !== undefined && !!onChange;

  if (isControlled && initialValue !== 0) {
    console.warn('when isControlled, initialValue will be ignored');
  }

  // 状态控制权转移
  const getCount = () => (isControlled ? value : count);

  // 非受控模式同步数据
  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current && !isControlled) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange, isControlled]);

  // 改变状态控制权转移
  const handleCountChange = (newValue: number) => {
    isControlled ? onChange(newValue) : setCount(newValue);
  };

  const handleIncrement = () => {
    handleCountChange(getCount() + 1);
  };

  const handleDecrement = () => {
    handleCountChange(Math.max(0, getCount() - 1));
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<unknown>;
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
    <CounterContext.Provider value={{ count: getCount(), handleDecrement, handleIncrement }}>
      <StyledCounter>{renderChildren()}</StyledCounter>
    </CounterContext.Provider>
  );
};

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

ControlCounter.Count = Count;
ControlCounter.Label = Label;
ControlCounter.Increment = Increment;
ControlCounter.Decrement = Decrement;

export { ControlCounter };
