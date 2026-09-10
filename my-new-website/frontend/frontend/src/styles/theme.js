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
// Tokens for the minimal redesign (design_handoff_home_redesign).
// Kept separate rather than folded into darkTheme on purpose: this is a new
// visual language for the rewrite, and overwriting darkTheme would repaint the
// live holding page, which is still on the yellow accent. Fold these in when
// the rewrite lands across every page.
// The mono treatment that recurs in top bars, footers and page metadata.
// Every size below is fluid: the vw term hits the handoff's px value at a
// 1280px viewport and grows from there, so the page scales with the display
// instead of shrinking into a corner of a large one.
export const metaType = `
  font-size: clamp(0.6875rem, 0.86vw, 1rem);
  font-weight: 400;
  line-height: 1;
`;

// Body copy: 17px at 1280, up to 26px on a wide display.
export const bodyType = `
  font-size: clamp(1.0625rem, 1.33vw, 1.625rem);
  line-height: 1.65;
`;

// Page headline: 56px at 1280, up to 88px.
export const displayType = `
  font-size: clamp(1.75rem, 4.4vw, 5.5rem);
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.01em;
`;

export const minimalTokens = {
  bg: '#131211',
  text: '#f1efec',
  textDim: 'rgba(241, 239, 236, 0.62)',
  meta: 'rgba(241, 239, 236, 0.45)',
  metaDim: 'rgba(241, 239, 236, 0.42)',
  rule: 'rgba(241, 239, 236, 0.18)',
  ruleFaint: 'rgba(241, 239, 236, 0.12)',
  accent: '#e0785e',
  // The page runs edge to edge; padX is the only margin, so it is what keeps
  // the wordmark and footer off the very edge of the glass.
  padX: 'clamp(1.5rem, 5.6vw, 6rem)',
  padY: 'clamp(2.5rem, 8vh, 5rem)',
};
