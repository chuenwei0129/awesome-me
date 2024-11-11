import React from 'react';
import styled from 'styled-components';

export const Label = ({ children }: { children: string }) => {
  return <StyledLabel>{children}</StyledLabel>;
};

Label.displayName = 'Label';

const StyledLabel = styled.div`
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 7px;
`;
