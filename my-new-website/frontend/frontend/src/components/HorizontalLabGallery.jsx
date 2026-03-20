// src/components/HorizontalLabGallery.jsx
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIMENTS_DATA } from '../data/experimentsData';
import ExperimentModal from './ExperimentModal';

const GalleryContainer = styled.section`
  position: relative;
  height: 400vh;
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HorizontalFlow = styled(motion.div)`
  display: flex;
  gap: 4rem;
  padding: 0 10vw;

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 0 5vw;
  }
`;

const ExperimentCard = styled.div`
  width: 55vw;
  max-width: 750px;
  height: 65vh;
  flex-shrink: 0;
  position: relative;
  background: ${({ theme }) => theme.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  &:hover img {
    filter: grayscale(0%) blur(0px);
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    width: 85vw;
    height: 60vh;
  }
`;

const ExperimentImage = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
  filter: grayscale(100%) blur(3px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ExperimentInfo = styled.div`
  padding: 1.5rem 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.mainBg};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  h3 {
    margin: 0;
    font-size: clamp(1.2rem, 2.5vw, 2rem);
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: -0.03em;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
  }
`;

const TechLine = styled.p`
  margin: 0.5rem 0 0 0;
  opacity: 0.6;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const BackgroundMarquee = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 25vw;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  text-transform: uppercase;
  letter-spacing: -0.05em;

  @media (max-width: 768px) {
    font-size: 40vw;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 75%;
  background: ${({ theme }) => theme.colors.secondaryBg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.mono};
`;

const HorizontalLabGallery = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const experiments = EXPERIMENTS_DATA;
  const moveDistance = experiments.length > 0 ? `-${experiments.length * 55}vw` : '-100%';
  const x = useTransform(scrollYProgress, [0, 1], ['0%', moveDistance]);

  const handleCardClick = (experiment) => {
    setSelectedExperiment(experiment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedExperiment(null);
  };

  return (
    <>
      <GalleryContainer ref={targetRef} id="experiments">
        <StickyWrapper>
          <BackgroundMarquee>Lab</BackgroundMarquee>
          <HorizontalFlow style={{ x }}>
            {experiments.map((experiment, index) => (
              <ExperimentCard
                key={experiment.id}
                onClick={() => handleCardClick(experiment)}
              >
                {experiment.thumbnail ? (
                  <ExperimentImage
                    src={experiment.thumbnail}
                    alt={experiment.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <PlaceholderImage style={{ display: experiment.thumbnail ? 'none' : 'flex' }}>
                  {experiment.title}
                </PlaceholderImage>
                <ExperimentInfo>
                  <TitleRow>
                    <h3>{experiment.title}</h3>
                    <span>#{(index + 1).toString().padStart(3, '0')}</span>
                  </TitleRow>
                  <TechLine>{experiment.technologies}</TechLine>
                </ExperimentInfo>
              </ExperimentCard>
            ))}
          </HorizontalFlow>
        </StickyWrapper>
      </GalleryContainer>

      <ExperimentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        experiment={selectedExperiment}
      />
    </>
  );
};

export default HorizontalLabGallery;
