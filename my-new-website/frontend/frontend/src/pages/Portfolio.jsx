import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../components/common.js';
import { FaGithub, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';

// API URLs
const API_URL = "http://127.0.0.1:8000";
const PORTFOLIO_API_URL = `${API_URL}/api/portfolio/projects/`;

const PortfolioContainer = styled(motion.div)`
  h1 {
    font-size: 3rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.violet};
    text-shadow: ${({ theme }) => theme.glowViolet};
    margin-bottom: 3rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  background: rgba(31, 40, 51, 0.5); // Slightly more opaque
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBg};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  ${ProjectCard}:hover & {
    color: ${({ theme }) => theme.colors.teal};
  }
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const TechBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechBadge = styled.span`
  background: rgba(102, 252, 241, 0.1);
  color: ${({ theme }) => theme.colors.teal};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinksContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.25rem;
  margin-top: auto; // Pushes to the bottom
  
  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.violet};
      transform: scale(1.1);
    }
  }
`;


const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from your Django API
    axios.get(PORTFOLIO_API_URL)
      .then(response => {
        setProjects(response.data.results || response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Is the Django server running?");
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PortfolioContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1>My Work</h1>
      <ProjectGrid>
        {projects.map(project => (
          <ProjectCard key={project.id} variants={itemVariants}>
            
            {/* Construct full image URL from Django */}
            <ProjectImage src={`${API_URL}${project.thumbnail}`} alt={project.title} />

            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <TechBadgeContainer>
                {/* Split the comma-separated tech string into badges */}
                {project.technologies.split(',').map((tech, index) => (
                  <TechBadge key={index}>{tech.trim()}</TechBadge>
                ))}
              </TechBadgeContainer>
              
              <ProjectLinksContainer>
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" title="Live Demo"><FaExternalLinkAlt /></a>
                )}
                {project.youtube_url && (
                  <a href={project.youtube_url} target="_blank" rel="noopener noreferrer" title="YouTube Demo"><FaYoutube /></a>
                )}
              </ProjectLinksContainer>
            </ProjectContent>

          </ProjectCard>
        ))}
      </ProjectGrid>
    </PortfolioContainer>
  );
};

export default Portfolio;