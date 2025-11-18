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
  align-items: flex-start;
  max-width: 1000px;
  margin: 0 auto;
`;

const LargeTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem); /* Responsive massive text */
  font-weight: 800;
  line-height: 0.95;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
  
  span {
    color: transparent;
    -webkit-text-stroke: 2px ${({ theme }) => theme.colors.accent};
    display: block; /* Stack the text */
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 500px;
  border-left: 3px solid ${({ theme }) => theme.colors.accent};
  padding-left: 1.5rem;
`;

const CtaButton = styled(Link)`
  padding: 1rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.text};
  color: #FFF;
  font-weight: 600;
  border-radius: 50px; // Pill shape
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #FFF; // Ensure text stays white
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 51, 255, 0.3);
  }
`;

const Home = () => {
  return (
    <HeroSection
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <LargeTitle>
        Legal Mind. <br />
        <span>Creative Soul.</span>
      </LargeTitle>
      
      <Subtitle>
        I build bridges between complex legal frameworks and elegant technical solutions. 
        Programmer, Lawyer, Artist.
      </Subtitle>
      
      <CtaButton to="/portfolio">Explore Selected Work</CtaButton>
    </HeroSection>
  );
};

export default Home;