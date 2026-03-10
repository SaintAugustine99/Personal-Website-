// src/components/AbstractCanvas.jsx
// Generative architectural sketch background: floating line segments coalesce
// into complex gesture figures with bezier curves, cross-hatching, and variable weight.
import React, { useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: ${({ theme }) => theme.colors.mainBg};
  transition: background-color 0.8s ease;
`;

// --- FIGURE DEFINITIONS ---
// Each figure is an array of drawing commands:
//   { type: 'line', pts: [x1,y1,x2,y2], weight: 1 }
//   { type: 'curve', pts: [x1,y1, cpx,cpy, x2,y2], weight: 1 }
//   { type: 'hatch', pts: [x1,y1,x2,y2], weight: 0.5 }  (cross-hatching detail)

const FIGURES = [
  // 0: Standing figure reaching up — fluid, organic (Alvaro Siza style)
  { name: 'reaching', commands: [
    { type: 'curve', pts: [0,-72, 3,-68, 0,-64], weight: 1.2 },   // head curve
    { type: 'curve', pts: [0,-64, -3,-45, -1,-20], weight: 1.4 }, // upper spine
    { type: 'curve', pts: [-1,-20, 1,-5, 0,10], weight: 1.2 },    // lower spine
    { type: 'curve', pts: [0,10, -8,30, -14,52], weight: 1.0 },   // left leg
    { type: 'curve', pts: [0,10, 10,32, 16,50], weight: 1.0 },    // right leg
    { type: 'curve', pts: [-2,-48, -18,-62, -22,-78], weight: 0.9 }, // left arm up
    { type: 'curve', pts: [-2,-48, 20,-60, 26,-76], weight: 0.9 },  // right arm up
    { type: 'hatch', pts: [-4,-40, 3,-25], weight: 0.4 },          // torso hatching
    { type: 'hatch', pts: [-2,-35, 5,-22], weight: 0.4 },
  ]},

  // 1: Walking figure with weight — sketchy, hatched (urban sketch style)
  { name: 'walking', commands: [
    { type: 'curve', pts: [5,-65, 6,-62, 5,-58], weight: 1.3 },    // head
    { type: 'curve', pts: [5,-58, 2,-38, -2,-15], weight: 1.4 },   // torso lean
    { type: 'curve', pts: [-2,-15, -4,0, -3,8], weight: 1.2 },     // hip
    { type: 'curve', pts: [-3,8, 8,28, 18,48], weight: 1.1 },      // front leg
    { type: 'curve', pts: [-3,8, -15,25, -22,46], weight: 1.0 },   // back leg
    { type: 'curve', pts: [3,-42, 18,-28, 22,-15], weight: 0.8 },  // front arm
    { type: 'curve', pts: [3,-42, -12,-30, -18,-20], weight: 0.8 },// back arm
    { type: 'hatch', pts: [0,-50, 8,-30], weight: 0.35 },          // torso cross-hatch
    { type: 'hatch', pts: [2,-45, 6,-28], weight: 0.35 },
    { type: 'hatch', pts: [-3,-38, 4,-25], weight: 0.3 },
    { type: 'line',  pts: [18,48, 20,52], weight: 0.6 },           // foot
    { type: 'line',  pts: [-22,46, -25,49], weight: 0.6 },
  ]},

  // 2: Person with bag — everyday urban figure
  { name: 'bag_person', commands: [
    { type: 'curve', pts: [0,-62, 2,-58, 0,-54], weight: 1.2 },    // head
    { type: 'curve', pts: [0,-54, -2,-35, -1,-12], weight: 1.3 },  // torso
    { type: 'curve', pts: [-1,-12, -6,8, -10,42], weight: 1.0 },   // left leg
    { type: 'curve', pts: [-1,-12, 4,10, 8,44], weight: 1.0 },     // right leg
    { type: 'curve', pts: [-1,-40, -15,-30, -18,-18], weight: 0.9 },// left arm
    { type: 'curve', pts: [0,-40, 14,-32, 16,-22], weight: 0.9 },  // right arm (holding)
    // Bag shape
    { type: 'line',  pts: [16,-22, 20,-22], weight: 0.7 },
    { type: 'line',  pts: [20,-22, 22,-8], weight: 0.7 },
    { type: 'line',  pts: [22,-8, 14,-8], weight: 0.7 },
    { type: 'line',  pts: [14,-8, 16,-22], weight: 0.7 },
    { type: 'hatch', pts: [16,-20, 21,-10], weight: 0.3 },        // bag shading
  ]},

  // 3: Couple walking — two minimal figures together
  { name: 'couple', commands: [
    // Figure A
    { type: 'curve', pts: [-12,-60, -10,-56, -12,-52], weight: 1.1 },
    { type: 'curve', pts: [-12,-52, -14,-30, -13,-8], weight: 1.2 },
    { type: 'line',  pts: [-13,-8, -20,42], weight: 0.9 },
    { type: 'line',  pts: [-13,-8, -6,40], weight: 0.9 },
    { type: 'line',  pts: [-13,-35, -22,-22], weight: 0.7 },
    // Figure B
    { type: 'curve', pts: [10,-56, 12,-52, 10,-48], weight: 1.1 },
    { type: 'curve', pts: [10,-48, 8,-28, 9,-5], weight: 1.2 },
    { type: 'line',  pts: [9,-5, 2,42], weight: 0.9 },
    { type: 'line',  pts: [9,-5, 16,40], weight: 0.9 },
    { type: 'line',  pts: [9,-32, 20,-20], weight: 0.7 },
    // Hands touching
    { type: 'curve', pts: [-13,-35, -5,-28, 9,-32], weight: 0.6 },
  ]},

  // 4: Leaning/contemplative figure — Renzo Piano style silhouette
  { name: 'leaning', commands: [
    { type: 'curve', pts: [0,-60, -2,-56, 0,-52], weight: 1.3 },
    { type: 'curve', pts: [0,-52, 8,-30, 15,-10], weight: 1.4 },   // leaning torso
    { type: 'curve', pts: [15,-10, 12,10, 5,45], weight: 1.1 },    // leg
    { type: 'curve', pts: [15,-10, 20,15, 22,44], weight: 1.0 },   // other leg
    { type: 'curve', pts: [5,-38, -10,-45, -15,-55], weight: 0.9 },// arm up to chin
    { type: 'curve', pts: [10,-25, 25,-18, 30,-10], weight: 0.8 }, // support arm
    { type: 'hatch', pts: [5,-40, 15,-15], weight: 0.35 },
    { type: 'hatch', pts: [8,-35, 13,-18], weight: 0.3 },
  ]},

  // 5: Tree — organic branching form (willow-like)
  { name: 'willow_tree', commands: [
    { type: 'curve', pts: [0,50, -2,25, 0,5], weight: 1.5 },       // trunk
    { type: 'curve', pts: [0,5, -3,-5, 0,-12], weight: 1.3 },
    { type: 'curve', pts: [0,-12, -15,-25, -28,-35], weight: 1.0 }, // left branch
    { type: 'curve', pts: [0,-12, 18,-22, 30,-30], weight: 1.0 },   // right branch
    { type: 'curve', pts: [-28,-35, -35,-28, -32,-18], weight: 0.6 },// left droop
    { type: 'curve', pts: [-15,-25, -22,-18, -20,-8], weight: 0.6 },
    { type: 'curve', pts: [30,-30, 35,-22, 30,-12], weight: 0.6 },  // right droop
    { type: 'curve', pts: [18,-22, 24,-15, 22,-5], weight: 0.6 },
    { type: 'curve', pts: [0,-12, -5,-30, -10,-45], weight: 0.8 },  // center branch
    { type: 'curve', pts: [-10,-45, -8,-38, -5,-25], weight: 0.5 }, // center droop
  ]},

  // 6: Cyclist — dynamic motion figure
  { name: 'cyclist', commands: [
    { type: 'curve', pts: [5,-50, 7,-46, 5,-42], weight: 1.1 },    // head
    { type: 'curve', pts: [5,-42, -2,-28, -8,-15], weight: 1.2 },  // torso bent
    { type: 'curve', pts: [-8,-15, -12,-5, -15,5], weight: 1.0 },  // hip to pedal
    { type: 'curve', pts: [-15,5, -5,15, 5,10], weight: 0.8 },     // leg stroke
    { type: 'curve', pts: [-8,-15, 8,-5, 15,5], weight: 0.8 },     // other leg
    // Wheel (front)
    { type: 'curve', pts: [20,15, 25,5, 20,-5], weight: 0.7 },
    { type: 'curve', pts: [20,-5, 15,5, 20,15], weight: 0.7 },
    // Wheel (back)
    { type: 'curve', pts: [-20,15, -15,5, -20,-5], weight: 0.7 },
    { type: 'curve', pts: [-20,-5, -25,5, -20,15], weight: 0.7 },
    // Handlebars
    { type: 'curve', pts: [-2,-28, 10,-20, 20,-5], weight: 0.6 },
    { type: 'line',  pts: [-20,5, 20,5], weight: 0.5 },             // frame
  ]},

  // 7: Blocky abstract figure — Theo van Doesburg / constructivist
  { name: 'constructivist', commands: [
    { type: 'line', pts: [-10,-52, 10,-52], weight: 1.3 },
    { type: 'line', pts: [10,-52, 12,-8], weight: 1.3 },
    { type: 'line', pts: [12,-8, -12,-8], weight: 1.3 },
    { type: 'line', pts: [-12,-8, -10,-52], weight: 1.3 },
    { type: 'curve', pts: [0,-62, 3,-56, 0,-52], weight: 1.1 },   // head
    { type: 'line', pts: [-8,-8, -14,40], weight: 1.0 },           // left leg
    { type: 'line', pts: [8,-8, 16,38], weight: 1.0 },             // right leg
    { type: 'line', pts: [12,-38, 32,-22], weight: 0.9 },          // arm
    { type: 'hatch', pts: [-8,-48, 8,-12], weight: 0.3 },          // body fill
    { type: 'hatch', pts: [-5,-45, 5,-15], weight: 0.3 },
    { type: 'hatch', pts: [-3,-42, 3,-18], weight: 0.25 },
  ]},

  // 8: Seated reading figure — contemplative (Norman Foster style)
  { name: 'reader', commands: [
    { type: 'curve', pts: [-5,-55, -3,-50, -5,-45], weight: 1.2 },  // head tilted
    { type: 'curve', pts: [-5,-45, 5,-28, 10,-10], weight: 1.3 },   // bent back
    { type: 'curve', pts: [10,-10, 5,5, -5,12], weight: 1.1 },      // hip
    { type: 'curve', pts: [-5,12, -20,20, -25,35], weight: 0.9 },   // leg forward
    { type: 'curve', pts: [-5,12, 5,25, 0,40], weight: 0.9 },       // leg down
    { type: 'curve', pts: [5,-30, 15,-35, 20,-40], weight: 0.8 },   // arm to book
    { type: 'curve', pts: [-5,-35, -15,-35, -20,-30], weight: 0.8 },// other arm
    // Book shape
    { type: 'line', pts: [20,-40, 25,-35], weight: 0.6 },
    { type: 'line', pts: [25,-35, 22,-28], weight: 0.6 },
    { type: 'line', pts: [22,-28, 17,-33], weight: 0.6 },
    { type: 'hatch', pts: [3,-25, 12,-12], weight: 0.3 },
  ]},

  // 9: Conifer/pine tree — architectural landscape element
  { name: 'pine', commands: [
    { type: 'line', pts: [0,50, 0,-10], weight: 1.2 },             // trunk
    { type: 'curve', pts: [0,-10, -20,-5, 0,-25], weight: 0.9 },   // lower branch tier
    { type: 'curve', pts: [0,-10, 20,-5, 0,-25], weight: 0.9 },
    { type: 'curve', pts: [0,-25, -16,-22, 0,-38], weight: 0.8 },  // mid tier
    { type: 'curve', pts: [0,-25, 16,-22, 0,-38], weight: 0.8 },
    { type: 'curve', pts: [0,-38, -10,-36, 0,-50], weight: 0.7 },  // top tier
    { type: 'curve', pts: [0,-38, 10,-36, 0,-50], weight: 0.7 },
    { type: 'line', pts: [0,-50, 0,-55], weight: 0.6 },            // tip
  ]},

  // 10: Expressive dancer — wide gesture
  { name: 'dancer', commands: [
    { type: 'curve', pts: [0,-62, 4,-58, 2,-52], weight: 1.2 },
    { type: 'curve', pts: [2,-52, -3,-30, -5,-10], weight: 1.4 },
    { type: 'curve', pts: [-5,-10, -8,5, -25,42], weight: 1.0 },   // extended leg
    { type: 'curve', pts: [-5,-10, 5,15, 12,48], weight: 1.0 },    // supporting leg
    { type: 'curve', pts: [0,-42, -28,-52, -35,-48], weight: 0.9 },// left arm flung wide
    { type: 'curve', pts: [-35,-48, -38,-42, -40,-38], weight: 0.6 },// hand flourish
    { type: 'curve', pts: [0,-42, 30,-35, 38,-25], weight: 0.9 },  // right arm
    { type: 'curve', pts: [38,-25, 42,-22, 40,-18], weight: 0.6 }, // hand
    { type: 'hatch', pts: [-4,-45, 2,-15], weight: 0.3 },
    { type: 'hatch', pts: [-6,-40, 0,-18], weight: 0.25 },
  ]},

  // 11: Abstract minimal figure — just 3 strokes (contrast with complex ones)
  { name: 'minimal', commands: [
    { type: 'curve', pts: [0,-55, 2,-30, 0,5], weight: 1.5 },      // single body stroke
    { type: 'curve', pts: [0,5, -10,30, -8,48], weight: 1.0 },     // leg gesture
    { type: 'curve', pts: [0,-35, -15,-50, -20,-55], weight: 0.8 },// arm gesture
  ]},
];

const AbstractCanvas = () => {
  const canvasRef = useRef(null);
  const theme = useTheme();
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (!theme) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const mouseRadius = 200;
    const formCycleDuration = 26; // seconds per cycle (slow, meditative)
    const figureInstanceCount = 9;
    const flowLineCount = 5;

    // Generate figure instances at random positions, picking from all templates
    const instances = [];
    for (let i = 0; i < figureInstanceCount; i++) {
      const fig = FIGURES[i % FIGURES.length];
      const cx = 0.06 + Math.random() * 0.88;
      const cy = 0.06 + Math.random() * 0.88;
      const scale = 0.5 + Math.random() * 0.7;
      const phaseOffset = Math.random() * Math.PI * 2;

      // Each command gets its own scattered position
      const scatteredCommands = fig.commands.map(cmd => {
        const pts = cmd.pts;
        const scattered = pts.map(() => (Math.random() - 0.5) * 350);
        const drift = [
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
        ];
        return { ...cmd, scattered, drift };
      });

      instances.push({ cx, cy, scale, phaseOffset, commands: scatteredCommands, name: fig.name });
    }

    // Flowing background curves
    const flowSeeds = Array.from({ length: flowLineCount }, () => ({
      yBase: 0.1 + Math.random() * 0.8,
      amplitude: 0.04 + Math.random() * 0.08,
      speed: 0.15 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Smooth forming cycle
    const smoothstep = (t) => {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    };

    const getFormAmount = (t, phaseOffset) => {
      const cycle = ((t / formCycleDuration) + phaseOffset / (Math.PI * 2)) % 1;
      if (cycle < 0.25) return 0;          // scattered, drifting
      if (cycle < 0.45) return smoothstep((cycle - 0.25) / 0.20); // slowly forming
      if (cycle < 0.65) return 1;          // holding formed shape
      return 1 - smoothstep((cycle - 0.65) / 0.20);               // slowly dissolving
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    // Draw a single command (line/curve/hatch)
    const drawCommand = (cmd, cx, cy, scale, form, t) => {
      const pts = cmd.pts;
      const scat = cmd.scattered;
      const driftT = t * 0.3;
      ctx.lineWidth = cmd.weight * (cmd.type === 'hatch' ? 0.7 : 1);

      if (cmd.type === 'hatch') {
        // Cross-hatching: diagonal lines within a bounding region
        // Only draw when forming (opacity linked to form)
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

      // Interpolate between scattered and home positions
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

    // Main loop
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      time += 1 / 60;

      ctx.fillStyle = theme.colors.mainBg;
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // 1. Flowing background curves
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

      // 2. Gesture figures (forming/dissolving from floating segments)
      for (const inst of instances) {
        const form = getFormAmount(time, inst.phaseOffset);
        const cx = inst.cx * w;
        const cy = inst.cy * h;

        // Mouse repulsion
        const dx = cx - mouse.current.x;
        const dy = cy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let mx = 0, my = 0;
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * 25;
          mx = (dx / dist) * force;
          my = (dy / dist) * force;
        }

        const drawCx = cx + mx;
        const drawCy = cy + my;

        // Vary opacity: formed figures are more visible
        const baseAlpha = 0.10 + form * 0.08;
        ctx.strokeStyle = theme.colors.text;

        for (const cmd of inst.commands) {
          ctx.globalAlpha = baseAlpha;
          drawCommand(cmd, drawCx, drawCy, inst.scale, form, time);
        }
      }

      ctx.globalAlpha = 1;
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

export default AbstractCanvas;
