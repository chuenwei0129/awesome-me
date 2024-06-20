import React, { type FC } from 'react';
import styled from 'styled-components';

const StyledFoo = styled.div`
  color: red;
`;

const Foo: FC<{ title: string }> = (props) => (
  <StyledFoo>{props.title} hello world</StyledFoo>
);

export default Foo;
