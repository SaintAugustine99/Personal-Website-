import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled.button`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.teal};
  padding: 0.75rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.darkBg};
    box-shadow: ${({ theme }) => theme.glow};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Card = styled(motion.div)`
  background: rgba(31, 40, 51, 0.3);
  border: 1px solid ${({ theme }) => theme.colors.lightBg};
  border-radius: 8px;
  padding: 1.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 4px 20px rgba(102, 252, 241, 0.1);
    transform: translateY(-5px);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.lightBg};
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.violet};
    box-shadow: ${({ theme }) => theme.glowViolet};
  }
`;

export const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 150px;
`;