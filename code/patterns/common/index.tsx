import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Icon from '../../comp/Icon';

export type CommonCounterProps = {
  initialValue?: number;
  label: string;
  iconDecrement: 'minus' | 'circle-minus' | 'square-minus';
  iconIncrement: 'plus' | 'circle-plus' | 'square-plus';
  limit?: number;
  onChange?: (value: number) => void;
};

export const CommonCounter: FC<CommonCounterProps> = ({
  initialValue = 0,
  label,
  iconDecrement,
  iconIncrement,
  limit,
  onChange,
}) => {
  const [count, setCount] = React.useState(initialValue);

  const hasError = limit ? count >= limit : false;

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(Math.max(0, count - 1));
  };

  const firstMounded = useRef(true);

  useEffect(() => {
    if (!firstMounded.current) {
      onChange && onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  return (
    <StyledCounter>
      <StyledButton onClick={handleDecrement}>
        <Icon icon={iconDecrement} variant={'primary'} />
      </StyledButton>
      <StyledLabel>{label}</StyledLabel>
      <StyledCount hasError={hasError}>{count}</StyledCount>
      <StyledButton onClick={handleIncrement}>
        <Icon icon={iconIncrement} variant={'primary'} />
      </StyledButton>
    </StyledCounter>
  );
};

const StyledLabel = styled.div`
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 7px;
`;

const StyledCount = styled.div<{ hasError: boolean }>`
  background-color: ${({ hasError }) => (hasError ? '#bd2130' : '#17a2b8')};
  color: white;
  padding: 5px 7px;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:active,
  &:focus {
    outline: none;
  }
`;

const StyledCounter = styled.div`
  display: inline-flex;
  border: 1px solid #17a2b8;
  line-height: 1.5;
  border-radius: 0.25rem;
  overflow: hidden;
`;
