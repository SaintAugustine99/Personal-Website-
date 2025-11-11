// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar.jsx';      // <-- Add .jsx
import Footer from './Footer.jsx';      // <-- Add .jsx
import Starfield from './Starfield.jsx';  // <-- Add .jsx

const MainContent = styled.main`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;
`;

const Layout = () => {
  return (
    <>
      <Starfield />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;