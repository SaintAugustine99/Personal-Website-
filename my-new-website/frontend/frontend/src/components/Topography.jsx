// src/components/Topography.jsx
import React, { useRef, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { createNoise3D } from 'simplex-noise';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  /* Smoothly transition the background color when theme changes */
  transition: background-color 0.4s ease; 
  background: ${({ theme }) => theme.colors.mainBg};
`;

const Topography = () => {
  const canvasRef = useRef(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const noise3D = createNoise3D();
    
    let animationId;
    let zOff = 0;

    // Config
    const zoom = 300;    
    const speed = 0.001; // Very slow, liquid movement
    const cellSize = 25; 
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      // 1. Clear with the specific Theme Background
      ctx.fillStyle = theme.colors.mainBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 2. Set Line Color from Theme
      ctx.strokeStyle = theme.colors.contour; 
      ctx.lineWidth = 1;
      ctx.beginPath();

      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);
      const grid = [];

      // Calculate Noise
      for (let x = 0; x <= cols; x++) {
        grid[x] = [];
        for (let y = 0; y <= rows; y++) {
          grid[x][y] = noise3D(x * cellSize / zoom, y * cellSize / zoom, zOff);
        }
      }

      // Marching Squares Algorithm
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const valBL = grid[x][y + 1];
          const valBR = grid[x + 1][y + 1];
          const valTR = grid[x + 1][y];
          const valTL = grid[x][y];

          const binary = 
            (valTL > 0 ? 8 : 0) + 
            (valTR > 0 ? 4 : 0) + 
            (valBR > 0 ? 2 : 0) + 
            (valBL > 0 ? 1 : 0);
          
          // Interpolation for smooth curves
          const a = { x: (x + 0.5) * cellSize, y: y * cellSize };
          const b = { x: (x + 1) * cellSize,   y: (y + 0.5) * cellSize };
          const c = { x: (x + 0.5) * cellSize, y: (y + 1) * cellSize };
          const d = { x: x * cellSize,         y: (y + 0.5) * cellSize };
          
          // Draw lines based on binary state
          switch (binary) {
            case 1:  drawLine(c, d); break;
            case 2:  drawLine(b, c); break;
            case 3:  drawLine(b, d); break;
            case 4:  drawLine(a, b); break;
            case 5:  drawLine(a, d); drawLine(b, c); break;
            case 6:  drawLine(a, c); break;
            case 7:  drawLine(a, d); break;
            case 8:  drawLine(a, d); break;
            case 9:  drawLine(a, c); break;
            case 10: drawLine(a, b); drawLine(c, d); break;
            case 11: drawLine(a, b); break;
            case 12: drawLine(b, d); break;
            case 13: drawLine(b, c); break;
            case 14: drawLine(c, d); break;
          }
        }
      }
      ctx.stroke();
      
      zOff += speed;
      animationId = requestAnimationFrame(draw);
    };

    const drawLine = (p1, p2) => {
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]); // <--- Important: Re-run effect when theme changes

  return <Canvas ref={canvasRef} />;
};

export default Topography;