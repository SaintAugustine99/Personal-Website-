import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;700&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.darkBg}, ${({ theme }) => theme.colors.lightBg});
    background-attachment: fixed;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: none;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 1rem;
  }
`;