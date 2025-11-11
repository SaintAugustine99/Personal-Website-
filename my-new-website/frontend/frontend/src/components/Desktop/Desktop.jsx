// src/components/Desktop/Desktop.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Window from './Window.jsx';
import DesktopIcon from './DesktopIcon.jsx';
import Starfield from '../Starfield.jsx'; 
import Taskbar from './Taskbar.jsx';         // <-- 1. IMPORT
import StartMenu from './StartMenu.jsx';     // <-- 2. IMPORT
import About from '../../pages/About.jsx';
import Blog from '../../pages/Blog.jsx';
import Portfolio from '../../pages/Portfolio.jsx';
import Contact from '../../pages/Contact.jsx';

const DesktopWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0B0C10, #1F2833);
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
  const [openApps, setOpenApps] = useState([]);
  // <-- 3. ADD NEW STATE for Start Menu -->
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  // Function to open a new app (window)
  // <-- 4. BUG FIX HERE (removed the extra '.') -->
  const openApp = (app) => {
    if (openApps.find(a => a.id === app.id)) return;
    setOpenApps(prev => [...prev, app]);
    setIsStartMenuOpen(false); // Close menu when app opens
  };

  // Function to close an app
  const closeApp = (appId) => {
    setOpenApps(prev => prev.filter(app => app.id !== appId));
  };
  
  // <-- 5. ADD NEW FUNCTION to toggle menu -->
  const toggleStartMenu = () => {
    setIsStartMenuOpen(prev => !prev);
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
      <Starfield />

      {/* 1. Desktop Icons */}
      <IconsWrapper>
        <DesktopIcon 
          label="About Me.txt" 
          onDoubleClick={() => openApp(apps.about)} // <-- 6. Changed to onDoubleClick
        />
        <DesktopIcon 
          label="Portfolio" 
          onDoubleClick={() => openApp(apps.portfolio)} // <-- 6. Changed to onDoubleClick
        />
        <DesktopIcon 
          label="Blog" 
          onDoubleClick={() => openApp(apps.blog)} // <-- 6. Changed to onDoubleClick
        />
         <DesktopIcon 
          label="Contact" 
          onDoubleClick={() => openApp(apps.contact)} // <-- 6. Changed to onDoubleClick
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

      {/* <-- 7. ADD Start Menu & Taskbar --> */}
      <Taskbar onToggleStartMenu={toggleStartMenu} />
      {isStartMenuOpen && (
        <StartMenu 
          apps={apps} 
          openApp={openApp} 
          onClose={() => setIsStartMenuOpen(false)} 
        />
      )}
    </DesktopWrapper>
  );
};

export default Desktop;