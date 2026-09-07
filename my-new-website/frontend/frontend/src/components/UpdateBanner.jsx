// src/components/UpdateBanner.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Bump this key whenever the message changes — everyone sees the new one once.
const STORAGE_KEY = 'banner-dismissed:molting-2026';
const BANNER_HEIGHT = '2.25rem';

const Strip = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 101; /* above the Navbar (100) */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: ${BANNER_HEIGHT};
  padding: 0 2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.darkBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
    gap: 0.5rem;
    font-size: 0.6rem;
    letter-spacing: 0.04em;
  }
`;

const blink = keyframes`
  50% { opacity: 0; }
`;

const Message = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::after {
    content: '_';
    margin-left: 0.15rem;
    animation: ${blink} 1s step-end infinite;
  }
`;

/* The second clause is the joke — first to go when the strip gets narrow. */
const Aside = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;

const Dismiss = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: 1px solid currentColor;
  border-radius: 0; /* Square — brutalist */
  color: inherit;
  font-family: inherit;
  font-size: 0.65rem;
  line-height: 1;
  padding: 0.2rem 0.4rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const UpdateBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      // Private browsing / blocked storage — just show the banner.
    }
    setIsVisible(!dismissed);
  }, []);

  // Push the fixed Navbar down so the strip never sits on top of it.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--banner-offset', isVisible ? BANNER_HEIGHT : '0px');
    return () => root.style.setProperty('--banner-offset', '0px');
  }, [isVisible]);

  const dismiss = () => {
    setIsVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Nothing to persist to — it'll be back next visit. Fine.
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Strip
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          role="status"
        >
          <Message>
            Molting in progress — this site is shedding its old skin in public
            <Aside>. Loose wires, half-finished thoughts, no hard hats</Aside>
          </Message>
          <Dismiss onClick={dismiss} aria-label="Dismiss notice">
            [ X ]
          </Dismiss>
        </Strip>
      )}
    </AnimatePresence>
  );
};

export default UpdateBanner;
