// Spinner.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  position: relative;
`;

const Hexagon = styled.svg<{ color: string; leftOffset?: string }>`
  width: 50px;
  height: 50px;
  animation: ${rotate} 3s linear infinite;
  fill: none;
  stroke: ${({ color }) => color};
  stroke-width: 5;
  transform-origin: 50% 50%;
  position: absolute;
  left: ${({ leftOffset }) => leftOffset};
`;

const Spinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <Hexagon color="green" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
      </Hexagon>
      <Hexagon color="blue" leftOffset="185px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
      </Hexagon>
    </SpinnerContainer>
  );
};

export default Spinner;
