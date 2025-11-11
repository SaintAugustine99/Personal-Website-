// src/components/Desktop/Window.jsx
import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';

const WindowWrapper = styled.div`
  background: rgba(31, 40, 51, 0.8);
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 70vw;
  max-width: 800px;
  height: 60vh;
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 30px;
  background: ${({ theme }) => theme.colors.darkBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: move;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Title = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  width: 12px;
  height: 12px;
  background: #FF5F56;
  border-radius: 50%;
  border: 1px solid #E0443E;
  padding: 0;
  cursor: pointer;
`;

const ContentArea = styled.div`
  padding: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  
  /* Scrollbar styling for the window */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.teal};
    border-radius: 4px;
  }
`;

const Window = ({ title, children, onClose }) => {
  return (
    <Draggable handle=".window-title-bar" defaultPosition={{x: 150, y: 100}}>
      <WindowWrapper>
        <TitleBar className="window-title-bar">
          <CloseButton onClick={onClose} />
          <Title>{title}</Title>
          <div style={{width: '12px'}}></div> {/* Spacer */}
        </TitleBar>
        <ContentArea>
          {children}
        </ContentArea>
      </WindowWrapper>
    </Draggable>
  );
};

export default Window;