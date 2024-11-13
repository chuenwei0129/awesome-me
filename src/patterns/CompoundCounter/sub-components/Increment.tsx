import { CirclePlus, Plus, SquarePlus } from 'lucide-react';
import React from 'react';
import { CounterContext } from '..';

/**
 * @description Increment 组件的属性
 */
export interface IncrementProps {
  /**
   * @description 图标类型
   * @default "plus"
   */
  icon?: 'plus' | 'circle-plus' | 'square-plus';
}

export const Increment = ({ icon = 'plus' }: IncrementProps) => {
  const { handleIncrement } = React.useContext(CounterContext);

  const renderIcon = () => {
    switch (icon) {
      case 'circle-plus':
        return <CirclePlus />;
      case 'square-plus':
        return <SquarePlus />;
      case 'plus':
      default:
        return <Plus />;
    }
  };

  return (
    <button type="button" onClick={handleIncrement} className="bg-white border-none hover:cursor-pointer focus:outline-none active:outline-none">
      {renderIcon()}
    </button>
  );
};

Increment.displayName = 'Increment';
