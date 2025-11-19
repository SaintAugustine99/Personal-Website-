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
    // Layout
    mainBg: '#FFFFFF',
    secondaryBg: '#F8F9FA',
    navBg: 'rgba(255, 255, 255, 0.8)', // <-- FIXES GREY HEADER (White Glass)
    
    // Text
    text: '#111111',
    textSecondary: '#666666',
    
    // Accents
    accent: '#0033FF',
    teal: '#008080',
    violet: '#7209B7',
    
    // UI
    border: '#E5E5E5',
    
    // Topography (The "Sketch" Look)
    contour: 'rgba(0, 0, 0, 0.6)',      
    brushShadow: 'rgba(0, 0, 0, 0.1)',
    
    // Compatibility keys (Prevents crashes)
    lightBg: '#FFFFFF',
    darkBg: '#111111',
    glow: '0 0 10px rgba(0, 51, 255, 0.3)',
    glowViolet: '0 0 10px rgba(114, 9, 183, 0.3)',
  },
};

export const darkTheme = {
  ...baseStyles,
  colors: {
    // Layout
    mainBg: '#0b0c10',      
    secondaryBg: 'rgba(31, 40, 51, 0.5)', 
    navBg: 'rgba(11, 12, 16, 0.8)', // <-- FIXES GREY HEADER (Dark Glass)
    
    // Text
    text: '#FFFFFF',
    textSecondary: '#c5c6c7',
    
    // Accents
    accent: '#66FCF1',
    teal: '#66FCF1',
    violet: '#45a29e',
    
    // UI
    border: 'rgba(102, 252, 241, 0.2)',
    
    // Topography (The "Cyber" Look)
    contour: 'rgba(255, 255, 255, 0.9)',    
    brushShadow: 'rgba(255, 255, 255, 0.15)',
    
    // Compatibility keys
    lightBg: 'rgba(255, 255, 255, 0.05)',
    darkBg: '#0b0c10',
    glow: '0 0 10px rgba(102, 252, 241, 0.4)',
    glowViolet: '0 0 10px rgba(69, 162, 158, 0.4)',
  },
};