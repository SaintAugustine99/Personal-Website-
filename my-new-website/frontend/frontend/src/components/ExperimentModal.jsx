// src/components/ExperimentModal.jsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
`;

const IframeContainer = styled.div`
  width: 90vw;
  height: 85vh;
  max-width: 1400px;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
`;

const ExperimentModal = ({ isOpen, onClose, experiment }) => {
  const iframeRef = useRef(null);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Send pause/resume messages to iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    try {
      iframe.contentWindow.postMessage(
        { type: isOpen ? 'resume' : 'pause' },
        '*'
      );
    } catch (e) {
      // Ignore cross-origin errors
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && experiment && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <CloseButton onClick={onClose} aria-label="Close modal">
            &times;
          </CloseButton>
          <IframeContainer onClick={(e) => e.stopPropagation()}>
            <StyledIframe
              ref={iframeRef}
              src={experiment.sandboxUrl}
              title={experiment.title}
              allow="fullscreen"
            />
          </IframeContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ExperimentModal;
