import React from 'react';
import styled from 'styled-components';
import { useCounterContext } from '../useCounterContext';

const StyledCount = styled.div<{ $error: boolean }>`
  background-color: ${({ $error }) => ($error ? '#bd2130' : '#17a2b8')};
  color: white;
  padding: 5px 7px;
`;

export const Count = ({ limit }: { limit?: number }) => {
  const { count } = useCounterContext();

  const $error = limit ? count >= limit : false;

  return <StyledCount $error={$error}>{count}</StyledCount>;
};

Count.displayName = 'Count';
