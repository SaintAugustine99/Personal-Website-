export const theme = {
  colors: {
    // Base Colors - SWITCHED TO DARK
    mainBg: '#111111',      // Matches the image background
    secondaryBg: 'rgba(255, 255, 255, 0.05)', // Glassmorphism effect for cards
    
    // Typography - SWITCHED TO LIGHT
    text: '#FFFFFF',        
    textSecondary: '#B0B0B0', 
    
    // Accents
    accent: '#0033FF',      // Electric Blue still works well
    violet: '#9D4EDD',      // Your secondary accent
    teal: '#66FCF1',        // Cyberpunk teal
    
    // Borders
    border: 'rgba(255, 255, 255, 0.1)',
    
    // Glows (Add these for the "Cyber" feel)
    glow: '0 0 10px rgba(102, 252, 241, 0.6)',
    glowViolet: '0 0 10px rgba(157, 78, 221, 0.6)',
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  shadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
  transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
};