import clsx from 'clsx';
import React from 'react';
import { CounterContext } from '..';

/**
 * @description Count组件的属性
 */
export interface CountProps {
  /**
   * @description 计数器的上限
   */
  limit?: number;
}

export const Count = ({ limit }: CountProps) => {
  const { count } = React.useContext(CounterContext);

  const hasError = limit ? count >= limit : false;

  return (
    <div
      className={clsx('text-white p-1.5', {
        'bg-red-700': hasError,
        'bg-teal-500': !hasError,
      })}
    >
      {count}
    </div>
  );
};

Count.displayName = 'Count';
