// src/pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/api';

const Container = styled.div`
  padding-top: 4rem;
`;

const SectionHeader = styled.h1`
  font-size: 3rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1rem;
`;

// Featured Project Styles
const FeaturedSection = styled(motion.section)`
  margin-bottom: 6rem;
`;

const FeaturedCard = styled.div`
  background: ${({ theme }) => theme.colors.secondaryBg};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const FeaturedHeader = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturedInfo = styled.div`
  flex: 1;
`;

const FeaturedLabel = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.accent};
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
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeaturedDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
`;

const FeaturedTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechBadge = styled.span`
  background: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DemoActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const DemoButton = styled.button`
  background: ${({ $primary, theme }) => $primary ? theme.colors.teal : 'transparent'};
  color: ${({ $primary, theme }) => $primary ? '#fff' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.teal};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    background: ${({ theme }) => theme.colors.teal};
    color: #fff;
    transform: translateY(-2px);
  }
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const DemoContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    filter: brightness(0.9);
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: ${({ theme }) => theme.colors.mainBg};
  
  @media (max-width: 768px) {
    height: 450px;
  }
`;

const DemoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.mainBg};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  z-index: 10;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const FullscreenHint = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  pointer-events: none;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Single column for "editorial" feel on mobile
  gap: 6rem; // Huge gap for negative space
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr); // 12 col grid
  }
`;

// Using the 12-column grid to offset items
const ProjectItem = styled(motion.div)`
  position: relative;
  
  // Layout logic:
  // Even items take left 6 cols, Odd take right 6 cols
  // OR utilize offsets for "deconstructed" feel
  @media (min-width: 768px) {
    grid-column: span 5;
    
    &:nth-child(even) {
      grid-column: 7 / span 5;
      margin-top: 6rem; // Offset down
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.colors.secondaryBg};
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    filter: grayscale(100%); // Artistic touch
  }
  
  &:hover img {
    transform: scale(1.05);
    filter: grayscale(0%); // Reveal color on hover
  }
`;

const ProjectTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const ProjectMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  display: flex;
  gap: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/portfolio/projects/`)
      .then(res => setProjects(res.data.results || res.data))
      .catch(err => console.error(err));
  }, []);

  // Featured project data
  const featuredProject = {
    title: "Jamii – Constituent Feedback Platform",
    description: "A civic tech platform enabling citizens to track legislation, submit feedback to representatives, report issues, and stay informed about local government activities. Built to enhance democratic participation and transparency.",
    technologies: ["React", "Django", "PostgreSQL", "Vercel"],
    demoUrl: "https://constituent-feedback-app.vercel.app",
    previewImage: "/images/jamii-preview.png", // We'll use the uploaded screenshot
    year: "2026"
  };

  return (
    <Container>
      <SectionHeader>Selected Projects</SectionHeader>

      {/* Featured Project - Jamii */}
      <FeaturedSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FeaturedCard>
          <FeaturedHeader>
            <FeaturedInfo>
              <FeaturedLabel>Featured Project</FeaturedLabel>
              <FeaturedTitle>{featuredProject.title}</FeaturedTitle>
              <FeaturedDescription>{featuredProject.description}</FeaturedDescription>
              <FeaturedTech>
                {featuredProject.technologies.map((tech, i) => (
                  <TechBadge key={i}>{tech}</TechBadge>
                ))}
              </FeaturedTech>
            </FeaturedInfo>
            <DemoActions>
              <DemoButton $primary onClick={() => setShowDemo(!showDemo)}>
                {showDemo ? 'Hide Demo' : 'Try Live Demo'}
              </DemoButton>
              <ExternalLink
                href={featuredProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in New Tab
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </ExternalLink>
            </DemoActions>
          </FeaturedHeader>

          <DemoContainer
            initial={false}
            animate={{ height: showDemo ? 'auto' : 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {showDemo && (
              <IframeWrapper>
                <CloseButton onClick={() => setShowDemo(false)} aria-label="Close demo">
                  ×
                </CloseButton>
                <DemoIframe
                  src={featuredProject.demoUrl}
                  title="Jamii – Constituent Feedback Platform Demo"
                  allow="fullscreen"
                  loading="lazy"
                />
                <FullscreenHint>Click within to interact • Scroll to explore</FullscreenHint>
              </IframeWrapper>
            )}
          </DemoContainer>

          {!showDemo && (
            <PreviewImage
              src={featuredProject.previewImage}
              alt="Jamii Platform Preview"
              onClick={() => setShowDemo(true)}
              onError={(e) => {
                // Fallback if image not found - show a gradient placeholder
                e.target.style.display = 'none';
              }}
            />
          )}
        </FeaturedCard>
      </FeaturedSection>

      {/* Other Projects Grid */}
      <Grid>
        {projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={`/project/${project.slug}`}>
              <ImageWrapper>
                <img src={`${API_URL}${project.thumbnail}`} alt={project.title} />
              </ImageWrapper>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectMeta>
                <span>{project.technologies.split(',')[0]}</span>
                <span>—</span>
                <span>{new Date(project.created).getFullYear()}</span>
              </ProjectMeta>
            </Link>
          </ProjectItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolio;