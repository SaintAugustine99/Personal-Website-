// src/pages/About.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Placeholder content ---
const PROFILE_IMAGE_URL = "https://via.placeholder.com/350";

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
  font-size: clamp(3rem, 8vw, 6rem);
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
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
  @media (max-width: 768px) {
    order: -1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  filter: grayscale(100%);
  transition: filter 0.6s ease;
  
  &:hover {
    filter: grayscale(0%);
  }
`;

const TextSection = styled.div`
  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.15rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    font-weight: 500;
  }
`;

const SkillsContainer = styled.div`
  margin-top: 2rem;
  
  h3 {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1rem;
    font-weight: 400;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillBadge = styled.span`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.3rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const About = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader>About</PageHeader>
      <AboutContent>
        <ProfileSection>
          <ProfileImage src={PROFILE_IMAGE_URL} alt="Onserio Ogeto" />
        </ProfileSection>

        <TextSection>
          <p>
            I am a multidisciplinary researcher, interested in Philosophy, The Sciences and The Arts. I have formal training in The Laws, Software Engineering and Cybersecurity.
          </p>
          <p>
            I am leveraging my background and interests to determine meaningful methods for abstracting and resolving problems that are unique to human being;- particularly for the subaltern- we former <em>Others</em>. Currently building competence in AI governance research work.
          </p>
          <p>
            When I am not programming, experimenting, or drawing/writing/reading, you can find me hiking, sleeping, cycling, running. Feel free
            to <a href="#contact">get in touch</a>!
          </p>

          <SkillsContainer>
            <h3>// Tools & Disciplines</h3>
            <SkillsGrid>
              {skills.map(skill => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </SkillsGrid>
          </SkillsContainer>
        </TextSection>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;