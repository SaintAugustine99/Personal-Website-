// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Starfield from './Starfield.jsx';

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