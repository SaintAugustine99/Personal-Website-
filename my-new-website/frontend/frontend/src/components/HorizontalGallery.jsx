import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';

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
`;

const ProjectCard = styled.a`
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
  text-decoration: none;
  cursor: pointer;
  
  &:hover img {
    filter: grayscale(0%) blur(0px);
    transform: scale(1.03);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 75%;
  object-fit: cover;
  filter: grayscale(100%) blur(3px);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProjectInfo = styled.div`
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
`;

const HorizontalGallery = () => {
  const [projects, setProjects] = useState([]);
  const targetRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/portfolio/projects/')
      .then(res => setProjects(res.data.results || res.data))
      .catch(err => {
        console.error(err);
        // Fallback placeholder data if backend is not running
        setProjects([
          { id: 1, title: 'Constituent Feedback App', technologies: 'React · Django · PostgreSQL', slug: 'constituent-feedback', thumbnail: '', url: 'https://constituent-feedback-app.vercel.app' },
        ]);
      });
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const moveDistance = projects.length > 0 ? `-${(projects.length * 55)}vw` : "-100%";
  const x = useTransform(scrollYProgress, [0, 1], ["0%", moveDistance]);

  return (
    <GalleryContainer ref={targetRef} id="portfolio">
      <StickyWrapper>
        <BackgroundMarquee>Work</BackgroundMarquee>
        <HorizontalFlow style={{ x }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} href={project.url || `/project/${project.slug}`} target="_blank" rel="noopener noreferrer">
              <ProjectImage 
                src={project.thumbnail ? `http://127.0.0.1:8000${project.thumbnail}` : 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'} 
                alt={project.title} 
              />
              <ProjectInfo>
                <TitleRow>
                  <h3>{project.title}</h3>
                  <span>#{(index + 1).toString().padStart(3, '0')}</span>
                </TitleRow>
                <TechLine>{project.technologies}</TechLine>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </HorizontalFlow>
      </StickyWrapper>
    </GalleryContainer>
  );
};

export default HorizontalGallery;
