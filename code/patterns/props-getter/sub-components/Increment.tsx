import React, { ButtonHTMLAttributes } from 'react';
import Icon from '../../../comp/Icon';
import { StyledButton } from './StyledButton';

export const Increment = ({
  icon = 'plus',
  onClick,
  ...rest
}: {
  icon: 'plus' | 'circle-plus' | 'square-plus';
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton onClick={onClick} {...rest}>
      <Icon icon={icon} variant={'primary'}></Icon>
    </StyledButton>
  );
};

Increment.displayName = 'Increment';
