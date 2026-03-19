import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const EmptyContainer = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const EmptyMessage = styled.p`
  font-size: 0.95rem;
  opacity: 0.7;
`;

const EmptyState = ({ title = 'Nothing here yet', message = '' }) => (
  <EmptyContainer
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <EmptyTitle>{title}</EmptyTitle>
    {message && <EmptyMessage>{message}</EmptyMessage>}
  </EmptyContainer>
);

export default EmptyState;
