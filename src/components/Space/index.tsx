import clsx from 'clsx';
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';
import React, { Children, useContext, useMemo } from 'react';
import { ConfigContext } from './ConfigProvider';
import './index.scss';

export type SizeType = 'small' | 'middle' | 'large' | number | undefined;

export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: ReactNode;
  wrap?: boolean;
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  // 如果 size 是一个字符串，则返回 spaceSize 对应键的值；如果 size 不是字符串，则返回 size 本身，如果 size 为假值（如 null、undefined、0 等），则返回 0。
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}

const Space: FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);

  const {
    className,
    style,
    children,
    size = space?.size || 'small',
    direction = 'horizontal',
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  const childNodes = Children.toArray(children);

  const mergedAlign =
    direction === 'horizontal' && align === undefined ? 'center' : align;
  const cn = clsx(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;

    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {i < childNodes.length && split && (
          <span
            className={`${className}-split`}
            style={style}
            key={`${key}-split`}
          >
            {split}
          </span>
        )}
      </>
    );
  });

  const otherStyles: CSSProperties = {};

  const [horizontalSize, verticalSize] = useMemo(
    () =>
      ((Array.isArray(size) ? size : [size, size]) as [SizeType, SizeType]).map(
        (item) => getNumberSize(item),
      ),
    [size],
  );

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }

  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style,
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  );
};

export default Space;
