import React from 'react';
import styled from 'styled-components';

const ParentDiv = styled.div`
  width: 300px;
  height: 300px;
  font-size: 20px;
`;

const ChildDiv = styled.div`
  /* border 的宽度是什么？ */
  border: 1em solid;
`;

const App = () => {
  return (
    <ParentDiv>
      <ChildDiv></ChildDiv>
    </ParentDiv>
  );
};

export default App;
