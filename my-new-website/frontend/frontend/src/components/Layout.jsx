// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

// Removed Starfield import

const MainContent = styled.main`
  width: 100%;
  // Remove max-width constraints for full-bleed sections if needed, 
  // or keep a wide container.
  max-width: 1400px; 
  margin: 0 auto;
  padding: 120px 2rem 4rem; // Top padding accounts for fixed nav
  min-height: 100vh;
`;

const Layout = () => {
  return (
    <>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;