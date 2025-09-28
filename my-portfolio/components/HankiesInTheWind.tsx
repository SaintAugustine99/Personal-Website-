// components/HankiesInTheWind.tsx

'use client';

import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

interface WaveProps {
  resolution?: number;
  complexity?: number;
  speed?: number;
  opacity?: number;
  paused?: boolean;
}

// GPU Shader implementation
const vertexShader = `
  uniform float time;
  uniform float complexity;
  uniform float speed;
  varying vec2 vUv;
  varying float vZ;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Multiple wave sources
    float wave1 = sin(position.x * 2.0 + time * speed) * complexity * 0.1;
    float wave2 = cos(position.y * 1.5 + time * speed * 0.8) * complexity * 0.08;
    float wave3 = sin((position.x + position.y) * 1.2 + time * speed * 1.2) * complexity * 0.06;
    
    pos.z = wave1 + wave2 + wave3;
    vZ = pos.z;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float opacity;
  varying vec2 vUv;
  varying float vZ;
  
  void main() {
    vec3 color = vec3(0.2, 0.2, 0.25);
    // Add slight color variation based on height
    color += vZ * 2.0;
    gl_FragColor = vec4(color, opacity);
  }
`;

// GPU Shader Mesh Component
function ShaderWavesMesh({ resolution = 64, speed = 1, complexity = 0.5, paused = false, opacity = 0.3 }: WaveProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      complexity: { value: complexity },
      speed: { value: speed },
      opacity: { value: opacity },
    }),
    []
  );

  useFrame((state) => {
    if (paused || !materialRef.current) return;
    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
  });

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.complexity.value = complexity;
      materialRef.current.uniforms.speed.value = speed;
      materialRef.current.uniforms.opacity.value = opacity;
    }
  }, [complexity, speed, opacity]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8, resolution, resolution]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// CPU Fallback Mesh Component
function CPUWavesMesh({ resolution = 32, speed = 1, complexity = 0.5, paused = false, opacity = 0.3 }: WaveProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);
  const positionBuffer = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const plane = new THREE.PlaneGeometry(8, 8, resolution, resolution);
    positionBuffer.current = new Float32Array(plane.attributes.position.array);
    return plane;
  }, [resolution]);

  useFrame((state) => {
    if (paused || !geometryRef.current) return;
    
    const time = state.clock.getElapsedTime() * speed;
    const pos = geometryRef.current.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const original = positionBuffer.current!;

    // Update z coordinates based on x,y position
    for (let i = 0; i < arr.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      
      arr[i] = x;
      arr[i + 1] = y;
      arr[i + 2] = 
        Math.sin((x * 2 + time) * (1 + complexity * 2)) * 0.1 +
        Math.cos((y * 1.5 + time * 0.8)) * 0.08 +
        Math.sin((x + y) * 1.2 + time * 1.2) * complexity * 0.06;
    }

    pos.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geometryRef} />
      <meshBasicMaterial 
        color="#333344" 
        wireframe 
        opacity={opacity} 
        transparent 
      />
    </mesh>
  );
}

// Visibility observer hook
function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}

// Static fallback for reduced motion
function StaticFallback() {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="wave-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0,10 Q5,5 10,10 T20,10"
              stroke="#333344"
              strokeWidth="0.5"
              fill="none"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#wave-pattern)" />
      </svg>
    </div>
  );
}

// Canvas content wrapper
function CanvasContent({ useGPU, ...props }: WaveProps & { useGPU: boolean }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 768;
  const adjustedResolution = isMobile ? 32 : props.resolution;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      {useGPU ? (
        <ShaderWavesMesh {...props} resolution={adjustedResolution} />
      ) : (
        <CPUWavesMesh {...props} resolution={adjustedResolution} />
      )}
    </>
  );
}

// Main component
export interface HankiesProps {
  initialZoom?: number;
  resolution?: number;
  complexity?: number;
  speed?: number;
  opacity?: number;
  paused?: boolean;
  useGPU?: boolean;
  className?: string;
}

export default function HankiesInTheWind({
  initialZoom = 6,
  resolution = 64,
  complexity = 0.5,
  speed = 1,
  opacity = 0.3,
  paused: externalPaused = false,
  useGPU = true,
  className = "",
}: HankiesProps) {
  const [internalPaused, setInternalPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const isVisible = usePageVisibility();
  
  const isPaused = externalPaused || internalPaused || !isVisible;

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR fallback or reduced motion
  if (!mounted || reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<StaticFallback />}>
        <Canvas
          camera={{ position: [0, 0, initialZoom], fov: 45 }}
          dpr={[1, 2]}
          className="absolute inset-0"
        >
          <CanvasContent
            useGPU={useGPU}
            resolution={resolution}
            complexity={complexity}
            speed={speed}
            opacity={opacity}
            paused={isPaused}
          />
        </Canvas>
      </Suspense>
      
      {/* Accessibility controls */}
      <button
        onClick={() => setInternalPaused(!internalPaused)}
        className="absolute bottom-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-sm text-white/70 hover:bg-white/20 transition-colors"
        aria-label={internalPaused ? "Resume animation" : "Pause animation"}
      >
        {internalPaused ? "Resume" : "Pause"} Background
      </button>
      
      {/* Development controls - hide in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-sm rounded-md text-xs text-white/70 space-y-1">
          <div>GPU: {useGPU ? 'ON' : 'OFF'}</div>
          <div>Resolution: {resolution}</div>
          <div>Complexity: {complexity}</div>
          <div>Speed: {speed}</div>
        </div>
      )}
    </div>
  );
}