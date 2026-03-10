// src/styles/theme.js

const baseStyles = {
  fonts: {
    heading: "'Courier Prime', monospace",
    body: "'Courier Prime', monospace",
    mono: "'Courier Prime', monospace",
  },
  shadow: 'none', // Brutalist = flat, no shadows
  transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
};

export const lightTheme = {
  ...baseStyles,
  colors: {
    mainBg: '#FFFCF3',
    secondaryBg: '#F0EAD6',
    navBg: '#FFFCF3',
    text: '#0D0D0D',
    textSecondary: '#4A4843',
    accent: '#E6AA00',
    teal: '#556B2F',
    violet: '#8B4513',
    border: 'rgba(13, 13, 13, 0.15)',
    contour: 'rgba(13, 13, 13, 0.12)',
    brushShadow: 'rgba(230, 170, 0, 0.06)',
    lightBg: '#FFFFFF',
    darkBg: '#1A1915',
    glow: '0 0 15px rgba(230, 170, 0, 0.4)',
    glowViolet: '0 0 15px rgba(139, 69, 19, 0.3)',
  },
};

export const darkTheme = {
  ...baseStyles,
  colors: {
    mainBg: '#0F0E0B',
    secondaryBg: '#1A1915',
    navBg: '#0F0E0B',
    text: '#FDFBF7',
    textSecondary: '#B0ADA5',
    accent: '#FFC845',
    teal: '#8F9F73',
    violet: '#C68E17',
    border: 'rgba(255, 255, 255, 0.12)',
    contour: 'rgba(255, 200, 69, 0.1)',
    brushShadow: 'rgba(0, 0, 0, 0.15)',
    lightBg: 'rgba(255, 255, 255, 0.05)',
    darkBg: '#0F0E0B',
    glow: '0 0 20px rgba(255, 200, 69, 0.2)',
    glowViolet: '0 0 20px rgba(198, 142, 23, 0.2)',
  },
};