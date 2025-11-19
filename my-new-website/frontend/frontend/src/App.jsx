// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme.js'; // Import both themes
import { GlobalStyles } from './styles/GlobalStyles.js';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';
import Portfolio from './pages/Portfolio.jsx';

function App() {
  // State to manage current theme ('light' or 'dark')
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    // Pass the actual theme object based on state
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Routes>
        {/* Pass toggle function to Layout so Navbar can use it */}
        <Route path="/" element={<Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;