import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

const HeroSection = styled(motion.section)`
  height: calc(100vh - 16rem); // Full viewport minus nav/padding
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.violet};
    text-shadow: ${({ theme }) => theme.glowViolet};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

// We style the Link component from react-router-dom as a Button
const StyledLinkButton = styled(Link)`
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
`;

const Home = () => {
  return (
    <HeroSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <HeroTitle>
        Onserio Ogeto<span></span>
      </HeroTitle>
      <HeroSubtitle>Programmer, Lawyer, Artist.</HeroSubtitle>
      <StyledLinkButton to="/blog">Explore My Work</StyledLinkButton>
    </HeroSection>
  );
};

export default Home;