// src/pages/Home.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = styled(motion.section)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const NameTitle = styled.h1`
  font-size: clamp(3rem, 10vw, 7rem); 
  font-weight: 900; 
  line-height: 0.9;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.04em;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 12vw, 4rem);
  }
`;

const RoleList = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  
  span {
    position: relative;
    
    &:not(:last-child)::after {
      content: '•';
      position: absolute;
      right: -1rem;
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 3rem;
  max-width: 550px;
  line-height: 1.6;
  font-weight: 400;
`;

const CtaButton = styled(Link)`
  padding: 1rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.mainBg}; /* Inverted contrast */
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const Home = () => {
  return (
    <HeroSection
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <NameTitle>
        Onserio Ogeto.
      </NameTitle>

      <RoleList>
        <span>Law</span>
        <span>Code</span>
        <span>Art</span>
      </RoleList>

      <Subtitle>
        I build logic systems for the digital age.
        Exploring the friction between rigid laws and fluid code.
      </Subtitle>

      <CtaButton to="/portfolio">View Selected Work</CtaButton>
    </HeroSection>
  );
};

export default Home;