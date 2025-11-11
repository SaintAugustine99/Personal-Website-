// src/components/Desktop/Taskbar.jsx
import React from 'react';
import styled from 'styled-components';
import { FaReact } from 'react-icons/fa'; // Using React icon as a "start" logo

const TaskbarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: rgba(11, 12, 16, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid ${({ theme }) => theme.colors.lightBg};
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const StartButton = styled.button`
  background: ${({ theme }) => theme.colors.darkBg};
  border: 1px solid ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.teal};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  padding: 0 12px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.darkBg};
    box-shadow: ${({ theme }) => theme.glow};
  }
`;

const Taskbar = ({ onToggleStartMenu }) => {
  return (
    <TaskbarWrapper>
      <StartButton onClick={onToggleStartMenu}>
        <FaReact />
        Start
      </StartButton>
    </TaskbarWrapper>
  );
};

export default Taskbar;