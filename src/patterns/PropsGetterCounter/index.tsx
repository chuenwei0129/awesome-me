import React, { FunctionComponentElement, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CounterProvider } from './CounterProvider';
import { Count } from './sub-components/Count';
import { Decrement } from './sub-components/Decrement';
import { Increment } from './sub-components/Increment';
import { Label } from './sub-components/Label';

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;

type PropsGetterCounterProps = {
  /**
   * @description 当前计数值
   * @default 0
   */
  value: number;
  /**
   * @description 计数变化时的回调函数
   */
  onChange?: (value: number) => void;
  /**
   * @description 子组件
   */
  children: React.ReactNode;
};

const PropsGetterCounter = (props: PropsGetterCounterProps) => {
  // 内部对接收的 props 做了限制
  const { value: count, onChange, children } = props;
  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current) {
      if (onChange) onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

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
    <CounterProvider value={{ count }}>
      <StyledCounter>{renderChildren()}</StyledCounter>
    </CounterProvider>
  );
};

PropsGetterCounter.Count = Count;
PropsGetterCounter.Label = Label;
PropsGetterCounter.Increment = Increment;
PropsGetterCounter.Decrement = Decrement;

export { useCounter } from './useCounter';
export { PropsGetterCounter };
