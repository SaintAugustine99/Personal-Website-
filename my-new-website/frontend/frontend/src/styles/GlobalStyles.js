// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap'); - Removed for Book Antiqua */

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

  /* Typewriter Typography: Spaced, Legible, Manuscript-like */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700; /* Courier Prime's bold weight */
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.2;
    letter-spacing: -0.02em; /* Just a tiny bit tighter for headings */
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
    font-weight: 400; 
    line-height: 1.8; /* Gives the text that drafted, double-spaced feel */
    margin-bottom: 1.5rem;
    max-width: 70ch; /* Optimal reading width for monospace */
    font-size: 1.05rem;
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