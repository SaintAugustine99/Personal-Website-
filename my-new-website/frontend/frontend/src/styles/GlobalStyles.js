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
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  /* Pixel Style Typography: Big, Bold, High Contrast */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 800; /* Extra Bold */
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
    letter-spacing: -0.04em; /* Tighter tracking for that modern editorial look */
    margin-bottom: 1.5rem;
  }

  /* Links are bold and coloured */
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: 600;
    transition: color ${({ theme }) => theme.transition};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 400; /* Increased from 300 for better readability on yellow */
    margin-bottom: 1.5rem;
    max-width: 65ch; 
    font-size: 1.1rem;
  }
  
  /* Selection color to match the sunflower */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #000;
  }

  /* Scrollbar Customization for that "Smooth" feel */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mainBg};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 20px; /* Pill shape scrollbar */
    border: 3px solid ${({ theme }) => theme.colors.mainBg}; /* Creates padding around the bar */
  }
`;