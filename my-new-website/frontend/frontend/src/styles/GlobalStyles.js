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
    /* --- BACKGROUND CONFIGURATION --- */
    background-color: ${({ theme }) => theme.colors.mainBg};
    color: ${({ theme }) => theme.colors.text};
    
    /* Use the image from the public folder */
    background-image: url('/bg-texture.jpg'); 
    
    /* Cover: Ensures no empty space 
       Fixed: Creates a parallax effect (lines stay still while you scroll)
    */
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;

    /* Overlay: Adds a black tint over the image so text pops.
       Adjust the 0.85 value to make lines brighter (lower) or darker (higher)
    */
    background-blend-mode: overlay;
    background-color: rgba(0, 0, 0, 0.7); 
    /* ------------------------------- */

    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
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
      color: ${({ theme }) => theme.colors.teal}; /* Updated to Teal */
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