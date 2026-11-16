// src/meadow/MeadowScene.jsx
// The painting behind every meadow page: one field, drawn once as layers
// (sky, ground, the seated figure, three depths of flowers) so it can change
// hour, sway in the wind and lean away from the pointer.
import React, { useEffect, useRef, useState } from 'react';

const SRC = '/meadow';

// Fixed positions (percent of the scene) so the fireflies never jump between
// renders; the meadow starts about 60% of the way down.
const FIREFLIES = [
  [8, 66], [17, 81], [24, 71], [33, 88], [41, 69], [48, 79], [55, 92],
  [61, 73], [72, 84], [79, 68], [86, 77], [93, 90], [13, 93], [68, 64],
];

const isNightNow = () => {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour < 6.25 || hour >= 18.75;
};

// 'auto' follows the visitor's own clock and re-checks every minute, so a tab
// left open through sunset changes with it.
function useHour(time) {
  const [night, setNight] = useState(isNightNow);
  useEffect(() => {
    if (time !== 'auto') return undefined;
    const id = setInterval(() => setNight(isNightNow()), 60000);
    return () => clearInterval(id);
  }, [time]);
  if (time === 'auto') return night ? 'night' : 'day';
  return time;
}

const Bird = ({ className = '', size = 26 }) => (
  <svg
    className={`oo-bird ${className}`}
    width={size}
    height={Math.round(size * 0.46)}
    viewBox="0 0 26 12"
    fill="none"
    stroke="#0B1530"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M1 9 Q7 1 13 8 Q19 1 25 9" />
  </svg>
);

// time: 'auto' | 'day' | 'night' | 'dusk'
// strip: a short header band rather than a full-height hero
// mirrored: flips the field, so the figure sits somewhere new on each page
const MeadowScene = ({ time = 'auto', strip = false, mirrored = false }) => {
  const ref = useRef(null);
  const hour = useHour(time);

  // The flowers tip slightly away from the pointer, more as it nears them.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        const y = (e.clientY - r.top) / r.height;
        let lean = 0;
        if (y >= 0 && y <= 1) {
          lean = ((e.clientX - r.left) / r.width - 0.5) * 2 * (0.25 + 0.75 * y);
          if (mirrored) lean = -lean;
        }
        el.style.setProperty('--gx', lean.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mirrored]);

  const classes = ['oo-scene', `is-${hour}`, strip && 'is-strip', mirrored && 'is-mirrored']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} aria-hidden="true">
      {hour === 'dusk' ? (
        <img src={`${SRC}/sky-dusk.webp`} alt="" />
      ) : (
        <>
          <img src={`${SRC}/sky-day.webp`} alt="" />
          <div className="oo-fill oo-scrim" />
          <img className="oo-sky-night" src={`${SRC}/sky-night.webp`} alt="" />
          <div className="oo-fill oo-birds">
            <Bird />
            <Bird className="b2" size={18} />
          </div>
        </>
      )}
      <img className="oo-ground" src={`${SRC}/ground.webp`} alt="" />
      <img className="oo-figure" src={`${SRC}/figure.webp`} alt="" />
      {hour !== 'dusk' && <img className="oo-glow" src={`${SRC}/glow.jpg`} alt="" />}
      <div className="oo-lean l1">
        <img className="oo-sway oo-bloom" src={`${SRC}/flowers-back.webp`} alt="" />
      </div>
      <div className="oo-lean l2">
        <img className="oo-sway oo-bloom" src={`${SRC}/flowers-mid.webp`} alt="" />
      </div>
      <div className="oo-lean l3">
        <img className="oo-sway oo-bloom" src={`${SRC}/flowers-front.webp`} alt="" />
      </div>
      {hour !== 'dusk' && (
        <div className="oo-fill oo-flies">
          {FIREFLIES.map(([left, top], i) => (
            <span key={i} className={`oo-ff f${i % 5}`} style={{ left: `${left}%`, top: `${top}%` }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MeadowScene;
