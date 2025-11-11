// src/components/Desktop/StartMenu.jsx
import React from 'react';
import styled from 'styled-components';
import { FaFolder, FaFileAlt } from 'react-icons/fa';

const MenuWrapper = styled.div`
  position: absolute;
  bottom: 40px; /* Height of the taskbar */
  left: 0;
  width: 300px;
  height: 400px;
  background: rgba(11, 12, 16, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 8px 8px 0 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
  
  h3 {
    color: white;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0.5rem;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.darkBg};
  }
`;

const StartMenu = ({ apps, openApp, onClose }) => {
  // We need to get the app objects from the 'apps' prop
  const appList = Object.values(apps);

  const handleAppClick = (app) => {
    openApp(app);
    onClose(); // Close the menu
  };

  return (
    <MenuWrapper>
      <MenuHeader>
        <h3>Programs</h3>
      </MenuHeader>
      <MenuList>
        {appList.map(app => (
          <MenuItem key={app.id} onClick={() => handleAppClick(app)}>
            {app.title.includes('.') ? <FaFileAlt /> : <FaFolder />}
            <span>{app.title}</span>
          </MenuItem>
        ))}
      </MenuList>
    </MenuWrapper>
  );
};

export default StartMenu;