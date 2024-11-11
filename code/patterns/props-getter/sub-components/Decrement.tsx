import React, { ButtonHTMLAttributes } from 'react';
import Icon from '../../../comp/Icon';
import { StyledButton } from './StyledButton';

export const Decrement = ({
  icon = 'minus',
  onClick,
  ...rest
}: {
  icon: 'minus' | 'circle-minus' | 'square-minus';
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <StyledButton onClick={onClick} {...rest}>
      <Icon icon={icon} variant={'primary'}></Icon>
    </StyledButton>
  );
};

Decrement.displayName = 'Decrement';
