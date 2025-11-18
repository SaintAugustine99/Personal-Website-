// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    background-color: ${({ theme }) => theme.colors.mainBg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 800; /* Strong, distinctive weight */
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
    letter-spacing: -0.03em; /* Tight tracking for modern feel */
    margin-bottom: 1.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 300;
    margin-bottom: 1.5rem;
    max-width: 65ch; /* Optimal reading length */
  }
  
  /* Utility: Selection color */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #FFF;
  }
`;