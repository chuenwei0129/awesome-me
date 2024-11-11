import React from 'react';
import { CounterContext } from '..';
import Icon from '../../../comp/Icon';
import { StyledButton } from './StyledButton';

export const Decrement = ({
  icon = 'minus',
}: {
  icon: 'minus' | 'circle-minus' | 'square-minus';
}) => {
  const { handleDecrement } = React.useContext(CounterContext);
  return (
    <StyledButton onClick={handleDecrement}>
      <Icon icon={icon} variant={'primary'}></Icon>
    </StyledButton>
  );
};

Decrement.displayName = 'Decrement';
