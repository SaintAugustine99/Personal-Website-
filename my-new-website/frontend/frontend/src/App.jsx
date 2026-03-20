/* frontend/src/App.jsx */
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme.js';
import { GlobalStyles } from './styles/GlobalStyles.js';
import styled from 'styled-components';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AbstractCanvas from './components/AbstractCanvas.jsx';

import HeroParallax from './components/HeroParallax.jsx';
import About from './pages/About.jsx';
import BranchingSection from './components/BranchingSection.jsx';
import HorizontalGallery from './components/HorizontalGallery.jsx';
import Experiments from './pages/Experiments.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';

const MainFlow = styled.main`
  width: 100%;
  position: relative; 
  z-index: 1;         
`;

// Standard sections get padding and visible top border for brutalist separation
const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 120px 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AbstractCanvas />
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <MainFlow>
        <HeroParallax />
        
        <Section id="about"><About /></Section>
        
        <BranchingSection />
        
        <HorizontalGallery />
        
        <Section id="experiments"><Experiments /></Section>
        <Section id="blog"><Blog /></Section>
        <Section id="contact"><Contact /></Section>
      </MainFlow>
      
      <Footer />
    </ThemeProvider>
  );
}

export default App;