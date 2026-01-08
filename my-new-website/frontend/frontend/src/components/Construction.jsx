// src/components/Construction.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const GlitchAnimation = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  position: relative;
  
  &:hover {
    animation: ${GlitchAnimation} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
    color: ${({ theme }) => theme.colors.accent};
  }

  &::after {
    content: '_';
    animation: blink 1s infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 500px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-left: 3px solid ${({ theme }) => theme.colors.teal};
  padding-left: 1.5rem;
  margin-top: 2rem;
`;

const Construction = () => {
    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Title>Gestating...</Title>
                <Subtitle>
                    This module is currently compiling. <br />
                    I am planting seeds for digital experiments. <br />
                    Check back for the harvest.
                </Subtitle>
            </motion.div>
        </Container>
    );
};

export default Construction;
