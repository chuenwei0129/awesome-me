import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './StyledButton';

import { CircleMinus, Minus, SquareMinus } from 'lucide-react';

export const Decrement = ({
  icon = 'minus',
  onClick,
  ...props
}: {
  icon: 'minus' | 'circle-minus' | 'square-minus';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
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
    <StyledButton onClick={onClick} {...props}>
      {renderIcon()}
    </StyledButton>
  );
};

Decrement.displayName = 'Decrement';
