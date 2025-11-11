// src/App.jsx
import React from 'react';
import Desktop from './components/Desktop/Desktop.jsx';
import { GlobalStyles } from './styles/GlobalStyles.js';
import { theme } from './styles/theme.js';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Desktop />
    </ThemeProvider>
  );
}

export default App;