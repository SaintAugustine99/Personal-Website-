// src/workers/abstractCanvas.worker.js
// Runs the generative architectural sketch animation off the main thread
// via OffscreenCanvas, freeing the UI thread for smooth scrolling.

const FIGURES = [
  { name: 'reaching', commands: [
    { type: 'curve', pts: [0,-72, 3,-68, 0,-64], weight: 1.2 },
    { type: 'curve', pts: [0,-64, -3,-45, -1,-20], weight: 1.4 },
    { type: 'curve', pts: [-1,-20, 1,-5, 0,10], weight: 1.2 },
    { type: 'curve', pts: [0,10, -8,30, -14,52], weight: 1.0 },
    { type: 'curve', pts: [0,10, 10,32, 16,50], weight: 1.0 },
    { type: 'curve', pts: [-2,-48, -18,-62, -22,-78], weight: 0.9 },
    { type: 'curve', pts: [-2,-48, 20,-60, 26,-76], weight: 0.9 },
    { type: 'hatch', pts: [-4,-40, 3,-25], weight: 0.4 },
    { type: 'hatch', pts: [-2,-35, 5,-22], weight: 0.4 },
  ]},
  { name: 'walking', commands: [
    { type: 'curve', pts: [5,-65, 6,-62, 5,-58], weight: 1.3 },
    { type: 'curve', pts: [5,-58, 2,-38, -2,-15], weight: 1.4 },
    { type: 'curve', pts: [-2,-15, -4,0, -3,8], weight: 1.2 },
    { type: 'curve', pts: [-3,8, 8,28, 18,48], weight: 1.1 },
    { type: 'curve', pts: [-3,8, -15,25, -22,46], weight: 1.0 },
    { type: 'curve', pts: [3,-42, 18,-28, 22,-15], weight: 0.8 },
    { type: 'curve', pts: [3,-42, -12,-30, -18,-20], weight: 0.8 },
    { type: 'hatch', pts: [0,-50, 8,-30], weight: 0.35 },
    { type: 'hatch', pts: [2,-45, 6,-28], weight: 0.35 },
    { type: 'hatch', pts: [-3,-38, 4,-25], weight: 0.3 },
    { type: 'line',  pts: [18,48, 20,52], weight: 0.6 },
    { type: 'line',  pts: [-22,46, -25,49], weight: 0.6 },
  ]},
  { name: 'bag_person', commands: [
    { type: 'curve', pts: [0,-62, 2,-58, 0,-54], weight: 1.2 },
    { type: 'curve', pts: [0,-54, -2,-35, -1,-12], weight: 1.3 },
    { type: 'curve', pts: [-1,-12, -6,8, -10,42], weight: 1.0 },
    { type: 'curve', pts: [-1,-12, 4,10, 8,44], weight: 1.0 },
    { type: 'curve', pts: [-1,-40, -15,-30, -18,-18], weight: 0.9 },
    { type: 'curve', pts: [0,-40, 14,-32, 16,-22], weight: 0.9 },
    { type: 'line',  pts: [16,-22, 20,-22], weight: 0.7 },
    { type: 'line',  pts: [20,-22, 22,-8], weight: 0.7 },
    { type: 'line',  pts: [22,-8, 14,-8], weight: 0.7 },
    { type: 'line',  pts: [14,-8, 16,-22], weight: 0.7 },
    { type: 'hatch', pts: [16,-20, 21,-10], weight: 0.3 },
  ]},
  { name: 'couple', commands: [
    { type: 'curve', pts: [-12,-60, -10,-56, -12,-52], weight: 1.1 },
    { type: 'curve', pts: [-12,-52, -14,-30, -13,-8], weight: 1.2 },
    { type: 'line',  pts: [-13,-8, -20,42], weight: 0.9 },
    { type: 'line',  pts: [-13,-8, -6,40], weight: 0.9 },
    { type: 'line',  pts: [-13,-35, -22,-22], weight: 0.7 },
    { type: 'curve', pts: [10,-56, 12,-52, 10,-48], weight: 1.1 },
    { type: 'curve', pts: [10,-48, 8,-28, 9,-5], weight: 1.2 },
    { type: 'line',  pts: [9,-5, 2,42], weight: 0.9 },
    { type: 'line',  pts: [9,-5, 16,40], weight: 0.9 },
    { type: 'line',  pts: [9,-32, 20,-20], weight: 0.7 },
    { type: 'curve', pts: [-13,-35, -5,-28, 9,-32], weight: 0.6 },
  ]},
  { name: 'leaning', commands: [
    { type: 'curve', pts: [0,-60, -2,-56, 0,-52], weight: 1.3 },
    { type: 'curve', pts: [0,-52, 8,-30, 15,-10], weight: 1.4 },
    { type: 'curve', pts: [15,-10, 12,10, 5,45], weight: 1.1 },
    { type: 'curve', pts: [15,-10, 20,15, 22,44], weight: 1.0 },
    { type: 'curve', pts: [5,-38, -10,-45, -15,-55], weight: 0.9 },
    { type: 'curve', pts: [10,-25, 25,-18, 30,-10], weight: 0.8 },
    { type: 'hatch', pts: [5,-40, 15,-15], weight: 0.35 },
    { type: 'hatch', pts: [8,-35, 13,-18], weight: 0.3 },
  ]},
  { name: 'willow_tree', commands: [
    { type: 'curve', pts: [0,50, -2,25, 0,5], weight: 1.5 },
    { type: 'curve', pts: [0,5, -3,-5, 0,-12], weight: 1.3 },
    { type: 'curve', pts: [0,-12, -15,-25, -28,-35], weight: 1.0 },
    { type: 'curve', pts: [0,-12, 18,-22, 30,-30], weight: 1.0 },
    { type: 'curve', pts: [-28,-35, -35,-28, -32,-18], weight: 0.6 },
    { type: 'curve', pts: [-15,-25, -22,-18, -20,-8], weight: 0.6 },
    { type: 'curve', pts: [30,-30, 35,-22, 30,-12], weight: 0.6 },
    { type: 'curve', pts: [18,-22, 24,-15, 22,-5], weight: 0.6 },
    { type: 'curve', pts: [0,-12, -5,-30, -10,-45], weight: 0.8 },
    { type: 'curve', pts: [-10,-45, -8,-38, -5,-25], weight: 0.5 },
  ]},
  { name: 'cyclist', commands: [
    { type: 'curve', pts: [5,-50, 7,-46, 5,-42], weight: 1.1 },
    { type: 'curve', pts: [5,-42, -2,-28, -8,-15], weight: 1.2 },
    { type: 'curve', pts: [-8,-15, -12,-5, -15,5], weight: 1.0 },
    { type: 'curve', pts: [-15,5, -5,15, 5,10], weight: 0.8 },
    { type: 'curve', pts: [-8,-15, 8,-5, 15,5], weight: 0.8 },
    { type: 'curve', pts: [20,15, 25,5, 20,-5], weight: 0.7 },
    { type: 'curve', pts: [20,-5, 15,5, 20,15], weight: 0.7 },
    { type: 'curve', pts: [-20,15, -15,5, -20,-5], weight: 0.7 },
    { type: 'curve', pts: [-20,-5, -25,5, -20,15], weight: 0.7 },
    { type: 'curve', pts: [-2,-28, 10,-20, 20,-5], weight: 0.6 },
    { type: 'line',  pts: [-20,5, 20,5], weight: 0.5 },
  ]},
  { name: 'constructivist', commands: [
    { type: 'line', pts: [-10,-52, 10,-52], weight: 1.3 },
    { type: 'line', pts: [10,-52, 12,-8], weight: 1.3 },
    { type: 'line', pts: [12,-8, -12,-8], weight: 1.3 },
    { type: 'line', pts: [-12,-8, -10,-52], weight: 1.3 },
    { type: 'curve', pts: [0,-62, 3,-56, 0,-52], weight: 1.1 },
    { type: 'line', pts: [-8,-8, -14,40], weight: 1.0 },
    { type: 'line', pts: [8,-8, 16,38], weight: 1.0 },
    { type: 'line', pts: [12,-38, 32,-22], weight: 0.9 },
    { type: 'hatch', pts: [-8,-48, 8,-12], weight: 0.3 },
    { type: 'hatch', pts: [-5,-45, 5,-15], weight: 0.3 },
    { type: 'hatch', pts: [-3,-42, 3,-18], weight: 0.25 },
  ]},
  { name: 'reader', commands: [
    { type: 'curve', pts: [-5,-55, -3,-50, -5,-45], weight: 1.2 },
    { type: 'curve', pts: [-5,-45, 5,-28, 10,-10], weight: 1.3 },
    { type: 'curve', pts: [10,-10, 5,5, -5,12], weight: 1.1 },
    { type: 'curve', pts: [-5,12, -20,20, -25,35], weight: 0.9 },
    { type: 'curve', pts: [-5,12, 5,25, 0,40], weight: 0.9 },
    { type: 'curve', pts: [5,-30, 15,-35, 20,-40], weight: 0.8 },
    { type: 'curve', pts: [-5,-35, -15,-35, -20,-30], weight: 0.8 },
    { type: 'line', pts: [20,-40, 25,-35], weight: 0.6 },
    { type: 'line', pts: [25,-35, 22,-28], weight: 0.6 },
    { type: 'line', pts: [22,-28, 17,-33], weight: 0.6 },
    { type: 'hatch', pts: [3,-25, 12,-12], weight: 0.3 },
  ]},
  { name: 'pine', commands: [
    { type: 'line', pts: [0,50, 0,-10], weight: 1.2 },
    { type: 'curve', pts: [0,-10, -20,-5, 0,-25], weight: 0.9 },
    { type: 'curve', pts: [0,-10, 20,-5, 0,-25], weight: 0.9 },
    { type: 'curve', pts: [0,-25, -16,-22, 0,-38], weight: 0.8 },
    { type: 'curve', pts: [0,-25, 16,-22, 0,-38], weight: 0.8 },
    { type: 'curve', pts: [0,-38, -10,-36, 0,-50], weight: 0.7 },
    { type: 'curve', pts: [0,-38, 10,-36, 0,-50], weight: 0.7 },
    { type: 'line', pts: [0,-50, 0,-55], weight: 0.6 },
  ]},
  { name: 'dancer', commands: [
    { type: 'curve', pts: [0,-62, 4,-58, 2,-52], weight: 1.2 },
    { type: 'curve', pts: [2,-52, -3,-30, -5,-10], weight: 1.4 },
    { type: 'curve', pts: [-5,-10, -8,5, -25,42], weight: 1.0 },
    { type: 'curve', pts: [-5,-10, 5,15, 12,48], weight: 1.0 },
    { type: 'curve', pts: [0,-42, -28,-52, -35,-48], weight: 0.9 },
    { type: 'curve', pts: [-35,-48, -38,-42, -40,-38], weight: 0.6 },
    { type: 'curve', pts: [0,-42, 30,-35, 38,-25], weight: 0.9 },
    { type: 'curve', pts: [38,-25, 42,-22, 40,-18], weight: 0.6 },
    { type: 'hatch', pts: [-4,-45, 2,-15], weight: 0.3 },
    { type: 'hatch', pts: [-6,-40, 0,-18], weight: 0.25 },
  ]},
  { name: 'minimal', commands: [
    { type: 'curve', pts: [0,-55, 2,-30, 0,5], weight: 1.5 },
    { type: 'curve', pts: [0,5, -10,30, -8,48], weight: 1.0 },
    { type: 'curve', pts: [0,-35, -15,-50, -20,-55], weight: 0.8 },
  ]},
];

let ctx = null;
let time = 0;
let mouseX = -1000, mouseY = -1000;
let themeColors = { mainBg: '#FFFCF3', text: '#0D0D0D', contour: 'rgba(13, 13, 13, 0.12)' };
let canvasW = 0, canvasH = 0;

const mouseRadius = 200;
const formCycleDuration = 26;
const figureInstanceCount = 9;
const flowLineCount = 5;

let instances = [];
let flowSeeds = [];

function initInstances() {
  instances = [];
  for (let i = 0; i < figureInstanceCount; i++) {
    const fig = FIGURES[i % FIGURES.length];
    const cx = 0.06 + Math.random() * 0.88;
    const cy = 0.06 + Math.random() * 0.88;
    const scale = 0.5 + Math.random() * 0.7;
    const phaseOffset = Math.random() * Math.PI * 2;

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

  flowSeeds = Array.from({ length: flowLineCount }, () => ({
    yBase: 0.1 + Math.random() * 0.8,
    amplitude: 0.04 + Math.random() * 0.08,
    speed: 0.15 + Math.random() * 0.25,
    phase: Math.random() * Math.PI * 2,
  }));
}

const smoothstep = (t) => {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
};

const getFormAmount = (t, phaseOffset) => {
  const cycle = ((t / formCycleDuration) + phaseOffset / (Math.PI * 2)) % 1;
  if (cycle < 0.25) return 0;
  if (cycle < 0.45) return smoothstep((cycle - 0.25) / 0.20);
  if (cycle < 0.65) return 1;
  return 1 - smoothstep((cycle - 0.65) / 0.20);
};

const lerp = (a, b, t) => a + (b - a) * t;

const drawCommand = (cmd, cx, cy, scale, form, t) => {
  const pts = cmd.pts;
  const scat = cmd.scattered;
  const driftT = t * 0.3;
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

function draw() {
  const w = canvasW, h = canvasH;
  time += 1 / 60;

  ctx.fillStyle = themeColors.mainBg;
  ctx.fillRect(0, 0, w, h);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Background flow lines
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = themeColors.contour || 'rgba(0,0,0,0.06)';
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

  // Gesture figures
  for (const inst of instances) {
    const form = getFormAmount(time, inst.phaseOffset);
    const cx = inst.cx * w;
    const cy = inst.cy * h;

    const dx = cx - mouseX;
    const dy = cy - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let mx = 0, my = 0;
    if (dist < mouseRadius && dist > 0) {
      const force = (1 - dist / mouseRadius) * 25;
      mx = (dx / dist) * force;
      my = (dy / dist) * force;
    }

    const drawCx = cx + mx;
    const drawCy = cy + my;

    const baseAlpha = 0.10 + form * 0.08;
    ctx.strokeStyle = themeColors.text;

    for (const cmd of inst.commands) {
      ctx.globalAlpha = baseAlpha;
      drawCommand(cmd, drawCx, drawCy, inst.scale, form, time);
    }
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

// Message handler
self.onmessage = function(e) {
  const { type, canvas, width, height, colors, x, y } = e.data;

  switch (type) {
    case 'init':
      ctx = canvas.getContext('2d');
      canvasW = width;
      canvasH = height;
      if (colors) themeColors = colors;
      initInstances();
      draw();
      break;

    case 'resize':
      canvasW = width;
      canvasH = height;
      break;

    case 'mousemove':
      mouseX = x;
      mouseY = y;
      break;

    case 'theme':
      if (colors) themeColors = colors;
      break;
  }
};
