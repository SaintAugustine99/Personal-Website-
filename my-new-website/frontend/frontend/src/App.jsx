/* frontend/src/App.jsx */
// Home, Writing, Projects and Contact are real. The meadow pages are built
// from src/meadow; essays and projects are Markdown files in src/content,
// each with a page of its own. DESIGN.md at the repo root has the rules.
//
// The single-page scroll layout this replaces (HeroParallax, BranchingSection,
// the horizontal galleries, About/Blog/Portfolio/Experiments) is still in the
// repo, unreferenced, for whenever those sections come back.
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { darkTheme } from './styles/theme.js';
import { GlobalStyles } from './styles/GlobalStyles.js';

import Home from './pages/Home.jsx';
import Writing from './pages/Writing.jsx';
import Essay from './pages/Essay.jsx';
import Projects from './pages/Projects.jsx';
import Project from './pages/Project.jsx';
import Contact from './pages/Contact.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

// Flip to true to put the molting holding page back up over everything.
const HOLDING_MODE = false;

const PLACEHOLDERS = [];

function App() {
  if (HOLDING_MODE) {
    // Imported lazily so the retired holding page stays out of the bundle.
    const Holding = React.lazy(() => import('./pages/Holding.jsx'));
    return (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles />
        <React.Suspense fallback={null}>
          <Holding />
        </React.Suspense>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<Essay />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        {PLACEHOLDERS.map(({ path, title, note }) => (
          <Route key={path} path={path} element={<ComingSoon title={title} note={note} />} />
        ))}
        {/* Anything else — including the old deep links — lands here, not on a
            blank screen. */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
