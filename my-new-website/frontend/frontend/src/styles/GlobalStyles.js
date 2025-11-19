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
    
    /* REMOVED: background-image and blend modes */
    /* The Topography component now handles the background */

    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 800; 
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
    letter-spacing: -0.03em; 
    margin-bottom: 1.5rem;
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transition};
    
    &:hover {
      color: ${({ theme }) => theme.colors.teal};
      text-shadow: ${({ theme }) => theme.colors.glow};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 300;
    margin-bottom: 1.5rem;
    max-width: 65ch; 
  }
  
  ::selection {
    background: ${({ theme }) => theme.colors.teal};
    color: #000;
  }
`;