// src/components/Topography.jsx
import React, { useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { createNoise3D } from 'simplex-noise';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: background-color 0.8s ease; 
  background: ${({ theme }) => theme.colors.mainBg};
`;

const Topography = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!theme) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const noise3D = createNoise3D();
    
    let animationId;
    let zOff = 0;

    // --- CONFIGURATION ---
    const zoom = 550;          
    const speed = 0.0001;      
    const cellSize = 20;       
    const lineWidth = 1.2;     
    
    // Interaction
    const mouseRadius = 600;
    const mouseStrength = 0.12;

    // "Brush" Settings
    const shadowOffset = 4; // How far the shadow drops
    const shadowWidth = 3;  // Shadow is wider/softer
    
    // Levels
    const levels = [-0.4, -0.2, 0, 0.2, 0.4]; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Standard Linear Interpolation
    const lerp = (start, end, t) => start + t * (end - start);
    const getT = (val1, val2, threshold) => (threshold - val1) / (val2 - val1);

    // --- THE "ROUGHNESS" GENERATOR ---
    // Adds a static sine-wave distortion based on screen position.
    // Since it uses x/y (and not time), the "texture" stays on the paper 
    // while the fluid moves through it, feeling like drawing on textured paper.
    const jitter = (val, frequency = 0.1, amplitude = 1.5) => {
      return Math.sin(val * frequency) * amplitude;
    };

    const draw = () => {
      // 1. Clear
      ctx.fillStyle = theme.colors.mainBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 2. Initialize Two Paths
      // Path2D allows us to record drawing commands without rendering them immediately.
      const mainPath = new Path2D();
      const shadowPath = new Path2D();

      const cols = Math.ceil(canvas.width / cellSize) + 1;
      const rows = Math.ceil(canvas.height / cellSize) + 1;
      const grid = [];

      // 3. Calculate Grid (with Mouse Influence)
      for (let x = 0; x < cols; x++) {
        grid[x] = [];
        for (let y = 0; y < rows; y++) {
          let noiseVal = noise3D(x * cellSize / zoom, y * cellSize / zoom, zOff);
          
          const screenX = x * cellSize;
          const screenY = y * cellSize;
          const dx = screenX - mouse.current.x;
          const dy = screenY - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const normDist = dist / mouseRadius;
            const influence = (1 - normDist * normDist); 
            noiseVal += influence * mouseStrength;
          }
          grid[x][y] = noiseVal;
        }
      }

      // 4. Marching Squares -> To Paths
      for (let level of levels) {
        for (let x = 0; x < cols - 1; x++) {
          for (let y = 0; y < rows - 1; y++) {
            const valTL = grid[x][y];
            const valTR = grid[x + 1][y];
            const valBR = grid[x + 1][y + 1];
            const valBL = grid[x][y + 1];

            const state = 
              (valTL > level ? 8 : 0) + 
              (valTR > level ? 4 : 0) + 
              (valBR > level ? 2 : 0) + 
              (valBL > level ? 1 : 0);

            if (state === 0 || state === 15) continue;

            const x0 = x * cellSize;
            const x1 = (x + 1) * cellSize;
            const y0 = y * cellSize;
            const y1 = (y + 1) * cellSize;

            const a = { x: lerp(x0, x1, getT(valTL, valTR, level)), y: y0 };
            const b = { x: x1, y: lerp(y0, y1, getT(valTR, valBR, level)) };
            const c = { x: lerp(x1, x0, getT(valBR, valBL, level)), y: y1 };
            const d = { x: x0, y: lerp(y1, y0, getT(valBL, valTL, level)) };

            // Helper to add segments to both paths
            const addSegment = (p1, p2) => {
              // MAIN PATH: Clean, exact coordinates
              mainPath.moveTo(p1.x, p1.y);
              mainPath.lineTo(p2.x, p2.y);

              // SHADOW PATH: Offset + "Hand Drawn" Jitter
              // We perturb the coordinates slightly to make it look sketchy
              const j1x = jitter(p1.y); // Jitter X based on Y position
              const j1y = jitter(p1.x); // Jitter Y based on X position
              const j2x = jitter(p2.y);
              const j2y = jitter(p2.x);

              shadowPath.moveTo(p1.x + shadowOffset + j1x, p1.y + shadowOffset + j1y);
              shadowPath.lineTo(p2.x + shadowOffset + j2x, p2.y + shadowOffset + j2y);
            };

            switch (state) {
              case 1:  addSegment(c, d); break;
              case 2:  addSegment(b, c); break;
              case 3:  addSegment(b, d); break;
              case 4:  addSegment(a, b); break;
              case 5:  addSegment(a, d); addSegment(b, c); break;
              case 6:  addSegment(a, c); break;
              case 7:  addSegment(a, d); break;
              case 8:  addSegment(a, d); break;
              case 9:  addSegment(a, c); break;
              case 10: addSegment(a, b); addSegment(c, d); break;
              case 11: addSegment(a, b); break;
              case 12: addSegment(b, d); break;
              case 13: addSegment(b, c); break;
              case 14: addSegment(c, d); break;
            }
          }
        }
      }

      // 5. Render (Layer Order Matters!)
      
      // First: Draw the "Brush" Shadow
      ctx.lineWidth = shadowWidth;
      ctx.strokeStyle = theme.colors.brushShadow || 'rgba(0,0,0,0.1)'; // Fallback
      ctx.lineCap = "round";
      ctx.stroke(shadowPath); // <--- Draw the rough path first

      // Second: Draw the Ink
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = theme.colors.contour;
      ctx.lineCap = "round"; // "butt" or "square" creates sharper ends, "round" implies liquid
      ctx.stroke(mainPath);   // <--- Draw the clean path on top

      // Loop
      zOff += speed;
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return <Canvas ref={canvasRef} />;
};

export default Topography;