import { CirclePlus, Plus, SquarePlus } from 'lucide-react';
import React, { ButtonHTMLAttributes } from 'react';
import { StyledButton } from './StyledButton';

export const Increment = ({
  icon = 'plus',
  onClick,
  ...rest
}: {
  icon: 'plus' | 'circle-plus' | 'square-plus';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
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
    <StyledButton onClick={onClick} {...rest}>
      {renderIcon()}
    </StyledButton>
  );
};

Increment.displayName = 'Increment';
