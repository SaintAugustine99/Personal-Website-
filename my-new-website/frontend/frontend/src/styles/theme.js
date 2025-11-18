// src/styles/theme.js
export const theme = {
  colors: {
    // Base Colors
    mainBg: '#FFFFFF',      // Pure white expanse
    secondaryBg: '#F8F9FA', // Very subtle gray for sections/cards
    
    // Typography
    text: '#111111',        // Almost black for strong contrast
    textSecondary: '#666666', // Muted gray for body text
    
    // The "Vibrance" - Electric Blue
    accent: '#0033FF',      
    
    // Borders/Lines
    border: '#E5E5E5',
  },
  fonts: {
    // We will use Inter for everything to keep it clean, 
    // but play with weights (800 vs 300) for contrast.
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  // Minimalist shadows instead of glows
  shadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
  transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)', // Smooth, sophisticated easing
};