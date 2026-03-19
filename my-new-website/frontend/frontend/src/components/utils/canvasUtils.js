// src/components/utils/canvasUtils.js
// Math utilities for canvas animations

/**
 * Smoothstep interpolation function
 * Returns smooth Hermite interpolation between 0 and 1 when t is in [0, 1]
 * @param {number} t - Value to interpolate (will be clamped to [0, 1])
 * @returns {number} Smoothly interpolated value
 */
export const smoothstep = (t) => {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
};

/**
 * Linear interpolation between two values
 * @param {number} a - Start value
 * @param {number} b - End value
 * @param {number} t - Interpolation factor (0 = a, 1 = b)
 * @returns {number} Interpolated value
 */
export const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Calculate the formation amount based on time and phase offset
 * Controls when figures transition from scattered to formed states
 * @param {number} t - Current time
 * @param {number} phaseOffset - Phase offset for this instance
 * @param {number} formCycleDuration - Duration of one full cycle
 * @returns {number} Formation amount (0 = scattered, 1 = fully formed)
 */
export const getFormAmount = (t, phaseOffset, formCycleDuration) => {
  const cycle = ((t / formCycleDuration) + phaseOffset / (Math.PI * 2)) % 1;
  if (cycle < 0.25) return 0;
  if (cycle < 0.45) return smoothstep((cycle - 0.25) / 0.20);
  if (cycle < 0.65) return 1;
  return 1 - smoothstep((cycle - 0.65) / 0.20);
};

/**
 * Calculate mouse repulsion force on a point
 * @param {number} cx - Center X of the object
 * @param {number} cy - Center Y of the object
 * @param {number} mouseX - Mouse X position
 * @param {number} mouseY - Mouse Y position
 * @param {number} mouseRadius - Radius of mouse influence
 * @returns {{ mx: number, my: number }} X and Y offset from mouse repulsion
 */
export const calculateMouseRepulsion = (cx, cy, mouseX, mouseY, mouseRadius) => {
  const dx = cx - mouseX;
  const dy = cy - mouseY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < mouseRadius && dist > 0) {
    const force = (1 - dist / mouseRadius) * 25;
    return {
      mx: (dx / dist) * force,
      my: (dy / dist) * force
    };
  }

  return { mx: 0, my: 0 };
};

/**
 * Create scattered commands from figure commands
 * Adds random scatter positions and drift values for animation
 * @param {Array} commands - Original figure commands
 * @returns {Array} Commands with scattered positions and drift values added
 */
export const createScatteredCommands = (commands) => {
  return commands.map(cmd => {
    const pts = cmd.pts;
    const scattered = pts.map(() => (Math.random() - 0.5) * 350);
    const drift = [
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 0.4,
    ];
    return { ...cmd, scattered, drift };
  });
};

/**
 * Create flow line seeds for background animation
 * @param {number} count - Number of flow lines to create
 * @returns {Array} Array of flow line configuration objects
 */
export const createFlowSeeds = (count) => {
  return Array.from({ length: count }, () => ({
    yBase: 0.1 + Math.random() * 0.8,
    amplitude: 0.04 + Math.random() * 0.08,
    speed: 0.15 + Math.random() * 0.25,
    phase: Math.random() * Math.PI * 2,
  }));
};
