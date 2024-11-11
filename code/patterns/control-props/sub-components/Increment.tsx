import React from 'react';
import { CounterContext } from '..';
import Icon from '../../../comp/Icon';
import { StyledButton } from './StyledButton';

export const Increment = ({ icon = 'plus' }: { icon: 'plus' | 'circle-plus' | 'square-plus' }) => {
  const { handleIncrement } = React.useContext(CounterContext);
  return (
    <StyledButton onClick={handleIncrement}>
      <Icon icon={icon} variant={'primary'}></Icon>
    </StyledButton>
  );
};

Increment.displayName = 'Increment';
