// src/components/hooks/useAbstractAnimation.js
// Custom hook for AbstractCanvas animation logic

import { useEffect, useRef } from 'react';
import { FIGURES } from '../data/figures';
import {
  lerp,
  getFormAmount,
  calculateMouseRepulsion,
  createScatteredCommands,
  createFlowSeeds,
} from '../utils/canvasUtils';

// Animation configuration constants
const ANIMATION_CONFIG = {
  mouseRadius: 200,
  formCycleDuration: 26,
  figureInstanceCount: 9,
  flowLineCount: 5,
};

/**
 * Draw a single command (line, curve, or hatch pattern)
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} cmd - Command object with type, pts, weight, scattered, drift
 * @param {number} cx - Center X position
 * @param {number} cy - Center Y position
 * @param {number} scale - Scale factor
 * @param {number} form - Formation amount (0-1)
 * @param {number} time - Current animation time
 */
const drawCommand = (ctx, cmd, cx, cy, scale, form, time) => {
  const pts = cmd.pts;
  const scat = cmd.scattered;
  const driftT = time * 0.3;
  ctx.lineWidth = cmd.weight * (cmd.type === 'hatch' ? 0.7 : 1);

  if (cmd.type === 'hatch') {
    if (form < 0.3) return;
    const hatchAlpha = (form - 0.3) / 0.7;
    ctx.globalAlpha = ctx.globalAlpha * hatchAlpha;

    const x1 = cx + pts[0] * scale;
    const y1 = cy + pts[1] * scale;
    const x2 = cx + pts[2] * scale;
    const y2 = cy + pts[3] * scale;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const spacing = 4 / scale;

    ctx.beginPath();
    for (let d = minX + minY; d < maxX + maxY; d += spacing * scale) {
      const sx = Math.max(minX, d - maxY);
      const sy = d - sx;
      const ex = Math.min(maxX, d - minY);
      const ey = d - ex;
      if (sy >= minY && sy <= maxY && ey >= minY && ey <= maxY) {
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
      }
    }
    ctx.stroke();
    return;
  }

  const interp = [];
  for (let i = 0; i < pts.length; i++) {
    const driftVal = Math.sin(driftT * cmd.drift[i % 2] + scat[i] * 0.01) * 15;
    const scatteredPos = scat[i] + driftVal;
    const homePos = pts[i] * scale;
    interp.push(cx + lerp(scatteredPos, homePos, form));
  }

  ctx.beginPath();
  if (cmd.type === 'line') {
    ctx.moveTo(interp[0], interp[1]);
    ctx.lineTo(interp[2], interp[3]);
  } else if (cmd.type === 'curve') {
    ctx.moveTo(interp[0], interp[1]);
    ctx.quadraticCurveTo(interp[2], interp[3], interp[4], interp[5]);
  }
  ctx.stroke();
};

/**
 * Draw flow lines in the background
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} flowSeeds - Array of flow line configurations
 * @param {number} w - Canvas width
 * @param {number} h - Canvas height
 * @param {number} time - Current animation time
 * @param {Object} theme - Theme object with colors
 */
const drawFlowLines = (ctx, flowSeeds, w, h, time, theme) => {
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = theme.colors.contour || 'rgba(0,0,0,0.06)';
  ctx.globalAlpha = 0.3;

  for (const fl of flowSeeds) {
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const frac = i / 100;
      const x = frac * w;
      const y = fl.yBase * h +
        Math.sin(frac * 5 + time * fl.speed + fl.phase) * h * fl.amplitude +
        Math.sin(frac * 9 + time * fl.speed * 0.6) * h * fl.amplitude * 0.25;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
};

/**
 * Draw all figure instances
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} instances - Array of figure instances
 * @param {number} w - Canvas width
 * @param {number} h - Canvas height
 * @param {number} time - Current animation time
 * @param {Object} mouse - Mouse position { x, y }
 * @param {Object} theme - Theme object with colors
 * @param {Object} config - Animation configuration
 */
const drawInstances = (ctx, instances, w, h, time, mouse, theme, config) => {
  const { mouseRadius, formCycleDuration } = config;

  for (const inst of instances) {
    const form = getFormAmount(time, inst.phaseOffset, formCycleDuration);
    const cx = inst.cx * w;
    const cy = inst.cy * h;

    const { mx, my } = calculateMouseRepulsion(cx, cy, mouse.x, mouse.y, mouseRadius);

    const drawCx = cx + mx;
    const drawCy = cy + my;

    const baseAlpha = 0.10 + form * 0.08;
    ctx.strokeStyle = theme.colors.text;

    for (const cmd of inst.commands) {
      ctx.globalAlpha = baseAlpha;
      drawCommand(ctx, cmd, drawCx, drawCy, inst.scale, form, time);
    }
  }
};

/**
 * Initialize figure instances with scattered positions
 * @param {Array} figures - Array of figure definitions
 * @param {number} count - Number of instances to create
 * @returns {Array} Array of initialized figure instances
 */
const initializeInstances = (figures, count) => {
  const instances = [];
  for (let i = 0; i < count; i++) {
    const fig = figures[i % figures.length];
    const cx = 0.06 + Math.random() * 0.88;
    const cy = 0.06 + Math.random() * 0.88;
    const scale = 0.5 + Math.random() * 0.7;
    const phaseOffset = Math.random() * Math.PI * 2;

    const scatteredCommands = createScatteredCommands(fig.commands);

    instances.push({
      cx,
      cy,
      scale,
      phaseOffset,
      commands: scatteredCommands,
      name: fig.name
    });
  }
  return instances;
};

/**
 * Custom hook for AbstractCanvas animation
 * Handles the animation loop, mouse tracking, and instance management
 *
 * @param {React.RefObject} canvasRef - Reference to the canvas element
 * @param {Object} theme - Theme object from styled-components
 * @param {Object} options - Optional configuration overrides
 * @returns {void}
 */
const useAbstractAnimation = (canvasRef, theme, options = {}) => {
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!theme) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const config = { ...ANIMATION_CONFIG, ...options };
    const { figureInstanceCount, flowLineCount } = config;

    // Initialize instances and flow seeds
    const instances = initializeInstances(FIGURES, figureInstanceCount);
    const flowSeeds = createFlowSeeds(flowLineCount);

    // Handle canvas resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Track mouse position
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Main draw loop
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      time += 1 / 60;

      // Clear canvas with background color
      ctx.fillStyle = theme.colors.mainBg;
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw background flow lines
      drawFlowLines(ctx, flowSeeds, w, h, time, theme);

      // Draw figure instances
      drawInstances(ctx, instances, w, h, time, mouse.current, theme, config);

      // Reset alpha and continue animation
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    // Set up event listeners and start animation
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, theme, options]);
};

export default useAbstractAnimation;
