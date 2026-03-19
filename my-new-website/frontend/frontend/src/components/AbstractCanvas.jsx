// src/components/AbstractCanvas.jsx
// Generative architectural sketch background using canvas animation
import React, { useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import useAbstractAnimation from './hooks/useAbstractAnimation';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: ${({ theme }) => theme.colors.mainBg};
  transition: background-color 0.8s ease;
`;

const AbstractCanvas = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();

  // Use the custom animation hook to handle all animation logic
  useAbstractAnimation(canvasRef, theme);

  return <Canvas ref={canvasRef} />;
};

export default AbstractCanvas;
