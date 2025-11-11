// src/components/Desktop/Desktop.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Window from './Window.jsx';
import DesktopIcon from './DesktopIcon.jsx';
// <-- 1. REMOVED Starfield import -->
import About from '../../pages/About.jsx';
import Blog from '../../pages/Blog.jsx';
import Portfolio from '../../pages/Portfolio.jsx';
import Contact from '../../pages/Contact.jsx';
// We'll import games here later
// import SnakeGame from '../../games/SnakeGame.jsx';

// <-- 2. MODIFIED the background -->
const DesktopWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  /* This is your new "Bliss" wallpaper from the /public folder */
  background: url('/desktop-bg.jpg') center center / cover no-repeat;
  overflow: hidden;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};
`;

const IconsWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;
`;

const Desktop = () => {
  // This state will manage all our open windows
  const [openApps, setOpenApps] = useState([]);

  // Function to open a new app (window)
  const openApp = (app) => {
    // Prevent opening the same app multiple times
    if (openApps.find(a => a.id === app.id)) return;
    setOpenApps(prev => [...prev, app]);
  };

  // Function to close an app
  const closeApp = (appId) => {
    setOpenApps(prev => prev.filter(app => app.id !== appId));
  };

  // Define our "apps"
  const apps = {
    about: {
      id: 'about',
      title: 'About Me.txt',
      content: <About />
    },
    blog: {
      id: 'blog',
      title: 'Blog Posts',
      content: <Blog />
    },
    portfolio: {
      id: 'portfolio',
      title: 'My Work',
      content: <Portfolio />
    },
    contact: {
      id: 'contact',
      title: 'Get in Touch',
      content: <Contact />
    },
  };

  return (
    <DesktopWrapper>
      {/* <-- 3. REMOVED <Starfield /> -->

      {/* 1. Desktop Icons */}
      <IconsWrapper>
        <DesktopIcon 
          label="About Me.txt" 
          onClick={() => openApp(apps.about)} 
        />
        <DesktopIcon 
          label="Portfolio" 
          onClick={() => openApp(apps.portfolio)} 
        />
        <DesktopIcon 
          label="Blog" 
          onClick={() => openApp(apps.blog)} 
        />
         <DesktopIcon 
          label="Contact" 
          onClick={() => openApp(apps.contact)} 
        />
      </IconsWrapper>

      {/* 2. Render Open Windows */}
      {openApps.map(app => (
        <Window 
          key={app.id} 
          title={app.title} 
          onClose={() => closeApp(app.id)}
        >
          {app.content}
        </Window>
      ))}
    </DesktopWrapper>
  );
};

export default Desktop;