// src/components/Starfield.jsx
import React, { useRef, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

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

const Starfield = () => {
  const canvasRef = useRef(null);
  const theme = useContext(ThemeContext); // Get theme colors

  // We use refs for these values because they will be updated inside the
  // animation loop, and we don't want to trigger React re-renders.
  const mouse = useRef({
    x: null,
    y: null,
    radius: 150 // The radius of influence for the mouse
  });
  const particlesArray = useRef([]);

  // --- Particle Class ---
  // This is the blueprint for every star
  class Particle {
    constructor(x, y, radius, color, isConstellation = false) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      
      // 'home' is the original constellation position
      this.homeX = x;
      this.homeY = y;
      
      // 'vx'/'vy' is the velocity for the "free-floating" effect
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      
      this.isConstellation = isConstellation;
      
      // How much the particle is affected by forces
      this.density = Math.random() * 30 + 10;
    }

    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update(ctx, canvasWidth, canvasHeight) {
      // --- 1. Mouse Interaction (Repulsion) ---
      // This is the "changes trajectory" effect
      let dx = mouse.current.x - this.x;
      let dy = mouse.current.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.current.radius) {
        // Calculate a force based on how close the mouse is
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.current.radius - distance) / mouse.current.radius;
        
        // Apply the force, slowed by the particle's "density"
        this.vx -= forceDirectionX * force * (1 / this.density);
        this.vy -= forceDirectionY * force * (1 / this.density);
      }

      // --- 2. Spring Force (For Constellations) ---
      // This pulls the constellation stars back to their "home"
      if (this.isConstellation) {
        let homeDX = this.homeX - this.x;
        let homeDY = this.homeY - this.y;
        this.vx += homeDX * 0.005 * (1 / this.density);
        this.vy += homeDY * 0.005 * (1 / this.density);
      }

      // --- 3. Friction & Movement ---
      // This makes them slow down naturally
      this.vx *= 0.96; 
      this.vy *= 0.96;

      // Update position
      this.x += this.vx;
      this.y += this.vy;

      // --- 4. Handle Screen Edges ---
      // This makes the "free-floating" stars wrap around
      if (!this.isConstellation) {
        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }

      this.draw(ctx);
    }
  }
  
  // --- Constellation Data ---
  // Simple coordinates for a few constellations.
  // We'll scale and position them dynamically.
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
    const colorSecondary = theme.colors.teal;
    const colorLines = 'rgba(102, 252, 241, 0.15)'; // Faint teal lines

    let animationFrameId;

    // --- Init Function ---
    // This creates all our stars
    const init = () => {
      particlesArray.current = [];
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      
      // Set canvas size
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      const numberOfParticles = (canvas.width * canvas.height) / 9000;

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

    // --- Connect Lines Function ---
    // This draws the "shifting geometries"
    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.current.length; a++) {
        for (let b = a; b < particlesArray.current.length; b++) {
          let particleA = particlesArray.current[a];
          let particleB = particlesArray.current[b];
          let distance = 
            (particleA.x - particleB.x) * (particleA.x - particleB.x) +
            (particleA.y - particleB.y) * (particleA.y - particleB.y);

          // Draw line if they are close
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(102, 252, 241, ${opacityValue * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
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
        particle.update(ctx, canvas.width, canvas.height);
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
    // This runs when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Re-run if theme changes

  return <StyledCanvas ref={canvasRef} />;
};

export default Starfield;