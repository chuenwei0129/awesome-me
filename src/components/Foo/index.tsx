import React, { type FC } from 'react';
import styled from 'styled-components';
import './styles.scss';

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em 1em;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Foo: FC<{ title: string }> = (props) => (
  <Button>
    <span>{props.title}</span>
    <span className={'helloWorld'}>hello world</span>
  </Button>
);

export default Foo;
