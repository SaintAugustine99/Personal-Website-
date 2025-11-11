// src/pages/About.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Placeholder content ---
// TODO: Replace this with your actual image
const PROFILE_IMAGE_URL = "https://via.placeholder.com/350"; 
// TODO: Replace this with a link to your resume
const RESUME_URL = "/resume.pdf"; // Assuming you'll add resume.pdf to your /public folder

const skills = [
  'Python', 'Django', 'JavaScript', 'React',
  'Cybersecurity', 'AI Governance', 'Legal Tech',
  'PostgreSQL', 'Docker', 'Git & GitHub'
];
// --- End placeholder content ---


const AboutContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
`;

const PageHeader = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.violet};
  text-shadow: ${({ theme }) => theme.glowViolet};
  margin-bottom: 3rem;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProfileSection = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    order: -1; // Move image to top on mobile
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.lightBg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
`;

const StyledLinkButton = styled.a`
  display: inline-block;
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.teal};
  padding: 0.75rem 1.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.darkBg};
    box-shadow: ${({ theme }) => theme.glow};
  }
`;

const TextSection = styled.div`
  h2 {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: underline;
    font-weight: 500;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 2rem;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SkillBadge = styled.span`
  background: rgba(102, 252, 241, 0.1);
  color: ${({ theme }) => theme.colors.teal};
  padding: 0.4rem 0.9rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const About = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader>About Me</PageHeader>
      <AboutContent>
        <ProfileSection>
          <ProfileImage src={PROFILE_IMAGE_URL} alt="Onserio Ogeto" />
          <StyledLinkButton href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Download Resume
          </StyledLinkButton>
        </ProfileSection>

        <TextSection>
          <h2>Who I Am</h2>
          <p>
            I'm Onserio Ogeto, a multi-disciplinary professional with a passion for 
            technology, law, and creative expression. My journey has taken me from 
            the structured world of law to the dynamic, ever-evolving realm of 
            software engineering and cybersecurity. My passion however, is in the Arts. 
          </p>
          <p>
            My unique background allows me to build bridges between complex technical 
            systems and the human-centric legal frameworks that govern them. I'm 
            driven by a curiosity to understand how things work, a desire to build 
            tools that solve real-world problems, and a commitment to ensuring 
            technology is developed ethically and responsibly.
          </p>
          <p>
            When I'm not coding or diving into legal texts, you can find me 
            exploring digital art or working on my next project. Feel free 
            to <Link to="/contact">get in touch</Link>!
          </p>

          <SkillsContainer>
            <h2>My Toolkit</h2>
            <SkillsGrid>
              {skills.map((skill, index) => (
                <SkillBadge key={index}>{skill}</SkillBadge>
              ))}
            </SkillsGrid>
          </SkillsContainer>

        </TextSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;