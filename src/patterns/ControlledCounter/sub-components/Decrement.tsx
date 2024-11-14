import { CircleMinus, Minus, SquareMinus } from 'lucide-react';
import React from 'react';
import { CounterContext } from '..';

/**
 * @description Decrement组件的属性
 */
export interface DecrementProps {
  /**
   * @description 图标类型
   * @default 'minus'
   */
  icon?: 'minus' | 'circle-minus' | 'square-minus';
}

export const Decrement = ({ icon = 'minus' }: DecrementProps) => {
  const { handleDecrement } = React.useContext(CounterContext);

  const renderIcon = () => {
    switch (icon) {
      case 'circle-minus':
        return <CircleMinus />;
      case 'square-minus':
        return <SquareMinus />;
      case 'minus':
      default:
        return <Minus />;
    }
  };

  return (
    <button type="button" onClick={handleDecrement} className="bg-white border-none hover:cursor-pointer focus:outline-none active:outline-none">
      {renderIcon()}
    </button>
  );
};

Decrement.displayName = 'Decrement';
