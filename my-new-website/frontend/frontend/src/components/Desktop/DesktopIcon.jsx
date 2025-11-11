// src/components/Desktop/DesktopIcon.jsx
import React from 'react';
import styled from 'styled-components';
import { FaFolder, FaFileAlt } from 'react-icons/fa';

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #FFD700; /* Solid Yellow */
  cursor: pointer;
  width: 80px;
  text-align: center;
  
  &:hover {
    color: #FFFFFF; 
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
  color: #FFFFFF;
`;

// <-- 1. Renamed prop to 'onDoubleClick' -->
const DesktopIcon = ({ label, onDoubleClick }) => {
  const isFile = label.includes('.');
  
  return (
    // <-- 2. Changed event to 'onDoubleClick' -->
    <IconWrapper onDoubleClick={onDoubleClick}>
      <IconVisual>
        {isFile ? <FaFileAlt /> : <FaFolder />}
      </IconVisual>
      <IconLabel>{label}</IconLabel>
    </IconWrapper>
  );
};

export default DesktopIcon;