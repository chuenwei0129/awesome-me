import React from 'react';

/**
 * @description Label 组件的属性
 */

export interface LabelProps {
  /**
   * @description Label的子组件
   */
  children: string;
}

export const Label = ({ children }: LabelProps) => {
  return <div className="bg-gray-100 text-gray-700 p-1.5">{children}</div>;
};

Label.displayName = 'Label';
