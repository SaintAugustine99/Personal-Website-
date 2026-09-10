/* frontend/src/App.jsx */
// The site is now routed. Home and Contact are real; every other section
// renders ComingSoon until there is work worth putting behind it.
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
import Contact from './pages/Contact.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

// Flip to true to put the molting holding page back up over everything.
const HOLDING_MODE = false;

const PLACEHOLDERS = [
  { path: '/writing', title: 'Writing', note: 'Essays in progress. I would rather publish these late than publish them thin.' },
  { path: '/projects', title: 'Projects', note: 'Being reworked from the ground up — new questions, fewer demos.' },
];

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
