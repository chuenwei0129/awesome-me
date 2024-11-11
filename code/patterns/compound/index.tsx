import React, { createContext, FunctionComponentElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Count } from './sub-components/Count';
import { Decrement } from './sub-components/Decrement';
import { Increment } from './sub-components/Increment';
import { Label } from './sub-components/Label';

type CompoundCounterProps = {
  initialValue?: number;
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

const CompoundCounter = ({ initialValue = 0, onChange, children }: CompoundCounterProps) => {
  const [count, setCount] = useState(initialValue);

  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
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
    <CounterContext.Provider value={{ count, handleDecrement, handleIncrement }}>
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

CompoundCounter.Count = Count;
CompoundCounter.Label = Label;
CompoundCounter.Increment = Increment;
CompoundCounter.Decrement = Decrement;

export { CompoundCounter };
