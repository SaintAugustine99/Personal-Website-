// src/styles/theme.js

const baseStyles = {
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  // Pixel UI uses softer, larger shadows
  shadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  // Smooth, slightly bouncy transitions
  transition: '0.3s cubic-bezier(0.2, 0.0, 0.2, 1)',
};

export const lightTheme = {
  ...baseStyles,
  colors: {
    // Layout - A warm, cream/yellow tinted off-white (The light on the child's skin)
    mainBg: '#FFFCF3',
    secondaryBg: '#F0EAD6', // Eggshell/parchment

    // The "Glass" Navbar - slightly frosted yellow-white
    navBg: 'rgba(255, 252, 243, 0.85)',

    // Text - Sharp, Bold Black (The background shadows of the painting)
    text: '#0D0D0D',
    textSecondary: '#4A4843', // Warm charcoal

    // Accents - Extracted from the Sunflower
    accent: '#E6AA00', // Deep Sunflower Gold
    teal: '#556B2F',   // Olive Green (The stem) - replacing your old teal
    violet: '#8B4513', // Saddle Brown (The wood/skin tone) - replacing violet

    // UI Elements
    border: 'rgba(13, 13, 13, 0.1)', // Subtle black borders

    // Topography Animation Colors
    contour: 'rgba(13, 13, 13, 0.15)', // Faint ink lines like a sketch
    brushShadow: 'rgba(230, 170, 0, 0.1)', // Very faint yellow wash

    // Compatibility keys
    lightBg: '#FFFFFF',
    darkBg: '#1A1915', // Warm dark
    glow: '0 0 15px rgba(230, 170, 0, 0.4)', // Gold glow
    glowViolet: '0 0 15px rgba(139, 69, 19, 0.3)',
  },
};

// Dark Mode to match this aesthetic (Deep Warmth)
export const darkTheme = {
  ...baseStyles,
  colors: {
    mainBg: '#1A1915', // Dark Warm Brown/Black
    secondaryBg: '#2C2A25',
    navBg: 'rgba(26, 25, 21, 0.85)',

    text: '#FDFBF7', // Cream text
    textSecondary: '#B0ADA5',

    accent: '#FFC845', // Lighter Sunflower for dark mode
    teal: '#8F9F73',   // Light Olive
    violet: '#C68E17',

    border: 'rgba(255, 255, 255, 0.1)',

    contour: 'rgba(255, 200, 69, 0.15)',
    brushShadow: 'rgba(0, 0, 0, 0.2)',

    lightBg: 'rgba(255, 255, 255, 0.05)',
    darkBg: '#1A1915',
    glow: '0 0 20px rgba(255, 200, 69, 0.2)',
    glowViolet: '0 0 20px rgba(198, 142, 23, 0.2)',
  },
};