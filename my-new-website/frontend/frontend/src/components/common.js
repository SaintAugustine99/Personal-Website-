// src/components/common.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent}; /* Solid Sunflower fill */
  border: none;
  color: #000; /* Black text on Yellow button */
  padding: 1rem 2rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50px; /* Full Pill Shape */
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(230, 170, 0, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.secondaryBg}; 
  /* In Light mode, this is now a subtle eggshell, distinct from the cream background */
  
  border: 1px solid transparent;
  border-radius: 28px; /* Pixel-style large rounded corners */
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.mainBg};
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: ${({ theme }) => theme.shadow};
    transform: scale(1.01);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.colors.navBg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px; /* Soft edges */
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 150px;
`;