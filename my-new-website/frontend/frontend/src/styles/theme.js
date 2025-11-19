// src/styles/theme.js

const baseStyles = {
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  shadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
  transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
};

export const lightTheme = {
  ...baseStyles,
  colors: {
    mainBg: '#FFFFFF',
    secondaryBg: '#F8F9FA',
    text: '#111111',
    textSecondary: '#666666',
    accent: '#0033FF',
    violet: '#7209B7',
    teal: '#008080',
    border: '#E5E5E5',
    // Topography specific colors
    contour: 'rgba(0, 0, 0, 0.15)', // Black lines, low opacity
  },
};

export const darkTheme = {
  ...baseStyles,
  colors: {
    mainBg: '#0b0c10',
    secondaryBg: 'rgba(31, 40, 51, 0.5)', 
    text: '#FFFFFF',
    textSecondary: '#c5c6c7',
    accent: '#66FCF1',
    violet: '#45a29e',
    teal: '#66FCF1',
    border: 'rgba(102, 252, 241, 0.2)',
    // Topography specific colors
    contour: 'rgba(255, 255, 255, 0.1)', // White lines, low opacity
  },
};