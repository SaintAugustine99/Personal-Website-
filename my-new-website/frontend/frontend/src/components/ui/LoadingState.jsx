import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const LoadingState = ({ message = 'Loading...' }) => (
  <LoadingContainer
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.6 }}
    transition={{ duration: 0.3 }}
  >
    {message}
  </LoadingContainer>
);

export default LoadingState;
