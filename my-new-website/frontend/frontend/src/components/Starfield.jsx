import React from 'react';
import styled, { keyframes } from 'styled-components';

const moveStars = keyframes`
  from {transform: translateY(0px);}
  to {transform: translateY(-2000px);}
`;

const StarfieldWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  z-index: -1;
  animation: ${moveStars} 120s linear infinite;
`;

const createStars = (boxShadow) => styled.div`
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${boxShadow};
`;

// Function to generate random box-shadows
const generateStars = (n) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }
  return value;
};

const StarsSmall = createStars(generateStars(700));
const StarsMedium = createStars(generateStars(200));
const StarsLarge = createStars(generateStars(100));

const Starfield = () => (
  <StarfieldWrapper>
    <StarsSmall />
    <StarsMedium />
    <StarsLarge />
  </StarfieldWrapper>
);

export default Starfield;