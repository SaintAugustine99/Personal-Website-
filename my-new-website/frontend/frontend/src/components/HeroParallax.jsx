import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const ContentLayer = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MassiveTitle = styled.h1`
  font-size: clamp(3rem, 10vw, 8rem);
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  margin: 0;
  line-height: 0.95;
  color: ${({ theme }) => theme.colors.text};
`;

const RoleSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 400;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2rem;
  letter-spacing: 0.1em;
  max-width: none;
`;

const MetaInfo = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  
  @media (max-width: 768px) {
    left: 1.5rem;
    bottom: 2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  
  @media (max-width: 768px) {
    right: 1.5rem;
    bottom: 2rem;
  }
`;

const ArrowDown = styled(motion.div)`
  width: 1px;
  height: 40px;
  background: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-right: 1px solid ${({ theme }) => theme.colors.textSecondary};
    transform: translateX(-50%) rotate(45deg);
  }
`;

const HeroParallax = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <HeroContainer ref={containerRef} id="home">
      <ContentLayer style={{ y: yText, opacity: opacityText }}>
        <MassiveTitle>
          Onserio<br/>Ogeto
        </MassiveTitle>
        <RoleSubtitle>
          Researcher — Developer — Artist
        </RoleSubtitle>
      </ContentLayer>
      
      <MetaInfo>
        Based in Nairobi // 2026
      </MetaInfo>
      
      <ScrollIndicator
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <ArrowDown />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroParallax;
