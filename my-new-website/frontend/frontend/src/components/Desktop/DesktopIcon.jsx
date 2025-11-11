// src/components/Desktop/DesktopIcon.jsx
import React from 'react';
import styled from 'styled-components';
import { FaFolder, FaFileAlt } from 'react-icons/fa';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  width: 80px;
  text-align: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.teal};
  }
`;

const IconVisual = styled.div`
  font-size: 3rem;
`;

const IconLabel = styled.span`
  font-size: 0.9rem;
  background: rgba(0,0,0,0.3);
  padding: 2px 5px;
  border-radius: 3px;
`;

const DesktopIcon = ({ label, onClick }) => {
  const isFile = label.includes('.');
  
  return (
    <IconWrapper onDoubleClick={onClick}>
      <IconVisual>
        {isFile ? <FaFileAlt /> : <FaFolder />}
      </IconVisual>
      <IconLabel>{label}</IconLabel>
    </IconWrapper>
  );
};

export default DesktopIcon;