// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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

  /* Brutalist Typography: Massive, Tight, Poster-like */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    line-height: 0.95;
    letter-spacing: -0.05em;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

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
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 400;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    max-width: 65ch;
    font-size: 1.15rem;
  }
  
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #000;
  }

  /* Thin minimal scrollbar — brutalist */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.mainBg};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: 0; /* Square, not pill */
  }
`;