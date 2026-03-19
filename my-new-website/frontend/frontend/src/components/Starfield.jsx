// src/components/Starfield.jsx
import React, { useRef, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Particle from './Particle';
import SpatialGrid from './SpatialGrid';

// This is our <canvas> element, styled to be the background
const StyledCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.darkBg}, ${({ theme }) => theme.colors.lightBg});
`;

// Configuration constants
const CONFIG = {
  // Connection settings
  MAX_CONNECTION_DISTANCE: 100, // Reduced from dynamic calculation for better performance
  MAX_CONNECTIONS_PER_PARTICLE: 5, // Limit connections per particle to reduce overdraw

  // Grid cell size should be >= MAX_CONNECTION_DISTANCE for correct neighbor detection
  GRID_CELL_SIZE: 100,

  // Mouse interaction
  MOUSE_RADIUS: 150,

  // Particle density - higher = fewer particles
  PARTICLE_DENSITY: 9000,
};

const Starfield = () => {
  const canvasRef = useRef(null);
  const theme = useContext(ThemeContext);

  // Refs for animation state (don't trigger re-renders)
  const mouse = useRef({
    x: null,
    y: null,
    radius: CONFIG.MOUSE_RADIUS
  });
  const particlesArray = useRef([]);
  const spatialGrid = useRef(null);

  // --- Constellation Data ---
  const constellations = [
    // Ursa Major (Big Dipper)
    [
      { x: 50, y: 150 }, { x: 100, y: 140 }, { x: 140, y: 120 }, { x: 180, y: 100 },
      { x: 220, y: 80 }, { x: 270, y: 80 }, { x: 300, y: 50 }
    ],
    // Orion's Belt
    [
      { x: 100, y: 100 }, { x: 120, y: 110 }, { x: 140, y: 120 }
    ],
    // Cassiopeia
    [
      { x: 100, y: 100 }, { x: 120, y: 130 }, { x: 140, y: 100 }, { x: 160, y: 130 }, { x: 180, y: 100 }
    ]
  ];

  // --- Main Effect Hook ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set colors from our theme
    const colorPrimary = theme.colors.textSecondary;

    let animationFrameId;

    // Squared distance for comparison (avoids sqrt in hot path)
    const maxDistanceSquared = CONFIG.MAX_CONNECTION_DISTANCE * CONFIG.MAX_CONNECTION_DISTANCE;

    // --- Init Function ---
    const init = () => {
      particlesArray.current = [];
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      // Set canvas size
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Initialize or resize spatial grid
      if (!spatialGrid.current) {
        spatialGrid.current = new SpatialGrid(canvasWidth, canvasHeight, CONFIG.GRID_CELL_SIZE);
      } else {
        spatialGrid.current.resize(canvasWidth, canvasHeight);
      }

      const numberOfParticles = (canvas.width * canvas.height) / CONFIG.PARTICLE_DENSITY;

      // 1. Create the "free-floating" stars
      for (let i = 0; i < numberOfParticles; i++) {
        let radius = (Math.random() * 0.5) + 0.5;
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        particlesArray.current.push(new Particle(x, y, radius, colorPrimary));
      }

      // 2. Create the "constellation" stars
      const scale = Math.min(canvasWidth / 800, canvasHeight / 600) * 0.8;
      const offsetX = canvasWidth / 2 - (150 * scale);
      const offsetY = canvasHeight / 2 - (100 * scale);

      const constellation = constellations[Math.floor(Math.random() * constellations.length)];
      const constellationColor = theme.colors.violet;

      for (let i = 0; i < constellation.length; i++) {
        let radius = (Math.random() * 1) + 1;
        let x = (constellation[i].x * scale) + offsetX;
        let y = (constellation[i].y * scale) + offsetY;
        particlesArray.current.push(new Particle(x, y, radius, constellationColor, true));
      }
    };

    // --- Optimized Connect Lines Function ---
    // Uses spatial partitioning to reduce O(n^2) to approximately O(n)
    const connect = () => {
      const particles = particlesArray.current;
      const grid = spatialGrid.current;

      // Update spatial grid with current particle positions
      grid.populate(particles);

      // Track connections per particle to limit overdraw
      const connectionCounts = new Uint8Array(particles.length);

      // For each particle, only check neighbors in nearby grid cells
      for (let a = 0; a < particles.length; a++) {
        // Skip if this particle already has max connections
        if (connectionCounts[a] >= CONFIG.MAX_CONNECTIONS_PER_PARTICLE) {
          continue;
        }

        const particleA = particles[a];
        const neighborIndices = grid.getNeighborIndices(a, particles);

        for (let i = 0; i < neighborIndices.length; i++) {
          const b = neighborIndices[i];

          // Skip if the other particle already has max connections
          if (connectionCounts[b] >= CONFIG.MAX_CONNECTIONS_PER_PARTICLE) {
            continue;
          }

          const particleB = particles[b];

          // Calculate squared distance (avoid sqrt for performance)
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distanceSquared = dx * dx + dy * dy;

          // Draw line if they are close enough
          if (distanceSquared < maxDistanceSquared) {
            // Calculate opacity based on distance
            const distance = Math.sqrt(distanceSquared);
            const opacityValue = 1 - (distance / CONFIG.MAX_CONNECTION_DISTANCE);

            ctx.strokeStyle = `rgba(102, 252, 241, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();

            // Increment connection counts
            connectionCounts[a]++;
            connectionCounts[b]++;

            // Break if this particle has reached max connections
            if (connectionCounts[a] >= CONFIG.MAX_CONNECTIONS_PER_PARTICLE) {
              break;
            }
          }
        }
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the connecting lines first
      connect();

      // Update and draw every particle
      for (const particle of particlesArray.current) {
        particle.update(ctx, canvas.width, canvas.height, mouse.current);
      }
    };

    // --- Event Listeners ---
    const handleMouseMove = (event) => {
      mouse.current.x = event.x;
      mouse.current.y = event.y;
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      init();
      animate();
    };

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Start
    init();
    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return <StyledCanvas ref={canvasRef} />;
};

export default Starfield;
