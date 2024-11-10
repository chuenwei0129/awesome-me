import React from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;

  &::after {
    content: attr(data-tooltip);
    display: block;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    bottom: 100%;
    left: 0;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const CssFuncAttr = () => {
  return (
    <TooltipContainer data-tooltip="This is a tooltip message.">
      Hover over me
    </TooltipContainer>
  );
};

export default CssFuncAttr;
