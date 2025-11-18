// src/pages/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const API_URL = "http://127.0.0.1:8000";

const Container = styled.div`
  padding-top: 4rem;
`;

const SectionHeader = styled.h1`
  font-size: 3rem;
  margin-bottom: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 1rem;
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

  useEffect(() => {
    axios.get(`${API_URL}/api/portfolio/projects/`)
      .then(res => setProjects(res.data.results || res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <SectionHeader>Selected Projects</SectionHeader>
      <Grid>
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={`/project/${project.slug}`}> {/* Ensure you have a route for this */}
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