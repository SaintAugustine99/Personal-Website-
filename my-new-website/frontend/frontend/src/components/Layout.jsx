// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Topography from './Topography.jsx'; // <--- Import the new background

const MainContent = styled.main`
  width: 100%;
  max-width: 1400px; 
  margin: 0 auto;
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  
  /* IMPORTANT: These lines ensure your text sits ABOVE the background canvas */
  position: relative; 
  z-index: 1;         
`;

// We destructure the props passed from App.jsx here
const Layout = ({ toggleTheme, isDarkMode }) => {
  return (
    <>
      {/* The background canvas (z-index: -1 inside the component) */}
      <Topography /> 
      
      {/* Pass the toggle functionality down to the Navbar */}
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;