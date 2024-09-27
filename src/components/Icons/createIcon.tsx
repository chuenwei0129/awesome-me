import React, { forwardRef } from 'react';
import { MyIcon, MyIconProps } from './Icon';

interface CreateIconOptions {
  content: React.ReactNode;
  iconProps?: MyIconProps;
  viewBox?: string;
}

// 高阶函数
export function createIcon(options: CreateIconOptions) {
  const { content, iconProps = {}, viewBox = '0 0 1024 1024' } = options;

  return forwardRef<SVGSVGElement, MyIconProps>((props, ref) => {
    return (
      <MyIcon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </MyIcon>
    );
  });
}
