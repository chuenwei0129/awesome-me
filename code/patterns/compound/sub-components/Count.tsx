import React from 'react';
import styled from 'styled-components';
import { CounterContext } from '..';

export const Count = ({ limit }: { limit?: number }) => {
  const { count } = React.useContext(CounterContext);

  const hasError = limit ? count >= limit : false;

  return <StyledCount hasError={hasError}>{count}</StyledCount>;
};

Count.displayName = 'Count';

const StyledCount = styled.div<{ hasError: boolean }>`
  background-color: ${({ hasError }) => (hasError ? '#bd2130' : '#17a2b8')};
  color: white;
  padding: 5px 7px;
`;
