// src/pages/Experiments.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;

    span {
      color: ${({ theme }) => theme.colors.teal};
      font-style: italic;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeaturedSection = styled(motion.section)`
  margin-bottom: 4rem;
`;

const FeaturedCard = styled.div`
  background: ${({ theme }) => theme.colors.secondaryBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
`;

const FeaturedHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FeaturedLabel = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.mainBg};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
`;

const FeaturedTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeaturedDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  max-width: 700px;
  font-size: 1rem;
`;

const EmergenceFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: none;
  display: block;

  @media (max-width: 768px) {
    height: 500px;
  }

  @media (max-width: 480px) {
    height: 420px;
  }
`;

const Experiments = () => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The <span>Lab</span>
        </motion.h1>
        <p>
          Interactive experiments exploring complex systems and emergent behavior.
        </p>
      </Header>

      <FeaturedSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FeaturedCard>
          <FeaturedHeader>
            <FeaturedLabel>Featured Experiment</FeaturedLabel>
            <FeaturedTitle>Emergence</FeaturedTitle>
            <FeaturedDescription>
              Six interactive simulations exploring emergence — the phenomenon by which
              higher-order properties arise irreducibly from local interactions. From boid
              flocking to vascular trees governed by Murray's Law, each visualization
              demonstrates how complex structure crystallizes from simple rules.
            </FeaturedDescription>
          </FeaturedHeader>
          <EmergenceFrame
            src="/emergence.html"
            title="Emergence Visualization"
            allow="fullscreen"
            loading="lazy"
          />
        </FeaturedCard>
      </FeaturedSection>
    </PageContainer>
  );
};

export default Experiments;
