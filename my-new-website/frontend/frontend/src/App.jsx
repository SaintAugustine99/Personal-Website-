import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme.js';
import { GlobalStyles } from './styles/GlobalStyles.js';
import styled from 'styled-components';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Topography from './components/Topography.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Experiments from './pages/Experiments.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';

import BranchingSection from './components/BranchingSection.jsx';

const MainFlow = styled.main`
  width: 100%;
  max-width: 1400px; 
  margin: 0 auto;
  position: relative; 
  z-index: 1;         
`;

// A wrapper to give each branch/section room to breathe
const Section = styled.section`
  min-height: 100vh;
  padding: 120px 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Let's default to dark for that artistic contrast

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Topography />
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <MainFlow>
        <Section id="home"><Home /></Section>
        <Section id="about"><About /></Section>
        <BranchingSection />
        <Section id="portfolio"><Portfolio /></Section>
        <Section id="experiments"><Experiments /></Section>
        <Section id="blog"><Blog /></Section>
        <Section id="contact"><Contact /></Section>
      </MainFlow>
      
      <Footer />
    </ThemeProvider>
  );
}

export default App;