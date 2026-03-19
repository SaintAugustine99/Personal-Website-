// src/pages/Experiments.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Construction from '../components/Construction';

// Use the same API base as your other pages
const API_URL = "http://127.0.0.1:8000";

// Set this to TRUE to force the construction page
const FORCE_CONSTRUCTION_MODE = false;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ExperimentCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.6); 
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: transform 0.4s ease, border-color 0.4s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.teal};
    
    img {
      transform: scale(1.05);
    }
  }
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.8rem;
  background: ${({ theme, status }) =>
    status === 'active' ? 'rgba(102, 252, 241, 0.2)' : 'rgba(100, 100, 100, 0.3)'};
  color: ${({ theme, status }) =>
    status === 'active' ? theme.colors.teal : theme.colors.textSecondary};
  border: 1px solid ${({ theme, status }) =>
    status === 'active' ? theme.colors.teal : 'transparent'};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
`;

const ThumbnailWrapper = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

// --- LIGHTBOX / SANDBOX MODAL STYLES ---
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const ModalContainer = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  height: 85vh;
  background: ${({ theme }) => theme.colors.mainBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.navBg};
  
  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ModalBody = styled.div`
  flex: 1;
  background: #000;
  position: relative;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.mainBg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: center;
`;

// Featured Emergence Visualization
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

const ActionButton = styled.a`
  padding: 0.6rem 1.2rem;
  background: ${({ primary, theme }) => primary ? theme.colors.teal : 'transparent'};
  color: ${({ primary, theme }) => primary ? theme.colors.darkBg : theme.colors.teal};
  border: 1px solid ${({ theme }) => theme.colors.teal};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const Experiments = () => {
  const [experiments, setExperiments] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data fallback in case backend isn't ready immediately
  const mockData = [
    {
      id: 1,
      title: "Neural Noise Generator",
      description: "An interactive playground using Simplex Noise and canvas manipulation to create organic, shifting topography.",
      thumbnail: null, // Use placeholder if null
      status: "active",
      sandbox_url: "https://codepen.io/jakob-e/embed/xbXmLV?default-tab=result" // Example embed
    },
    {
      id: 2,
      title: "Three.js Physics",
      description: "Testing rigid body physics in a browser environment.",
      thumbnail: null,
      status: "active",
      sandbox_url: ""
    }
  ];

  useEffect(() => {
    axios.get(`${API_URL}/api/experiments/list/`)
      .then(res => {
        setExperiments(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Backend not ready, using mock data for layout preview.");
        setExperiments(mockData);
        setLoading(false);
      });
  }, []);

  // Show construction page if forced or no experiments
  if (FORCE_CONSTRUCTION_MODE || experiments.length === 0) {
    return (
      <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Construction />
      </PageContainer>
    );
  }

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
          A collection of active experiments, code snippets, and unfinished symphonies.
          Click on a card to interact or view details.
        </p>
      </Header>

      {/* Featured: Emergence Visualization */}
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

      <Grid>
        {experiments.map((exp, i) => (
          <ExperimentCard
            key={exp.id}
            onClick={() => setSelectedExperiment(exp)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <StatusBadge status={exp.status}>{exp.status}</StatusBadge>
            <ThumbnailWrapper>
              <img
                src={exp.thumbnail || "https://via.placeholder.com/600x400/111/333?text=Experiment"}
                alt={exp.title}
              />
            </ThumbnailWrapper>
            <CardContent>
              <h3>{exp.title}</h3>
              <p>{exp.description}</p>
            </CardContent>
          </ExperimentCard>
        ))}
      </Grid>

      {/* Lightbox / Sandbox Modal */}
      <AnimatePresence>
        {selectedExperiment && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExperiment(null)}
          >
            <ModalContainer
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <ModalHeader>
                <h2>{selectedExperiment.title}</h2>
                <CloseButton onClick={() => setSelectedExperiment(null)}>×</CloseButton>
              </ModalHeader>

              <ModalBody>
                {selectedExperiment.sandbox_url ? (
                  <iframe
                    src={selectedExperiment.sandbox_url}
                    title={selectedExperiment.title}
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedExperiment.thumbnail || "https://via.placeholder.com/600x400"}
                    alt={selectedExperiment.title}
                  />
                )}
              </ModalBody>

              <ViewToggle>
                {selectedExperiment.github_url && (
                  <ActionButton href={selectedExperiment.github_url} target="_blank">
                    View Code
                  </ActionButton>
                )}
                {selectedExperiment.sandbox_url && (
                  <ActionButton href={selectedExperiment.sandbox_url} target="_blank" primary>
                    Open Fullscreen
                  </ActionButton>
                )}
              </ViewToggle>
            </ModalContainer>
          </Overlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Experiments;