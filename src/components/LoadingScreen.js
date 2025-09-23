import React, { useRef, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

// Magical loading animations
const shimmer = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: rotate(0deg) scale(0); }
  50% { opacity: 1; transform: rotate(180deg) scale(1); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(0, 191, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const LoadingText = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--color-gold);
  text-align: center;
  margin: 1rem 0;
  text-shadow: 
    0 0 20px rgba(255, 215, 0, 0.6),
    0 0 40px rgba(255, 215, 0, 0.3),
    0 0 60px rgba(255, 215, 0, 0.2);
  animation: ${shimmer} 2s ease-in-out infinite, gradientShift 3s ease infinite;
  background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const SubText = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: var(--color-silver);
  text-align: center;
  font-style: italic;
  margin: 0.5rem 0;
  opacity: 0.8;
`;

const MagicalSparkles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
  .sparkle {
    position: absolute;
    color: var(--color-gold);
    font-size: 1.5rem;
    animation: ${sparkle} 3s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 20%;
      left: 15%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 30%;
      right: 20%;
      animation-delay: 1s;
    }
    
    &:nth-child(3) {
      bottom: 30%;
      left: 25%;
      animation-delay: 2s;
    }
    
    &:nth-child(4) {
      bottom: 20%;
      right: 15%;
      animation-delay: 0.5s;
    }
    
    &:nth-child(5) {
      top: 50%;
      left: 10%;
      animation-delay: 1.5s;
    }
    
    &:nth-child(6) {
      top: 60%;
      right: 10%;
      animation-delay: 2.5s;
    }
  }
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 2rem;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.4);
  box-shadow: 
    0 0 10px rgba(212, 175, 55, 0.3),
    inset 0 1px 2px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      var(--color-gold) 0%, 
      #fff 30%,
      var(--color-gold) 60%,
      #ffd700 100%);
    background-size: 200% 100%;
    transform: translateX(-100%);
    animation: progress 3s ease-in-out forwards, progressGlow 1.5s ease-in-out infinite;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
  }
  
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0%); }
  }
  
  @keyframes progressGlow {
    0%, 100% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.6); }
    50% { box-shadow: 0 0 25px rgba(255, 215, 0, 0.9); }
  }
`;

// FBX Hat Component for Loading Screen
function LoadingHat() {
  const hatRef = useRef();
  
  // Load the FBX model
  const fbx = useLoader(FBXLoader, '/models/hat.fbx');
  
  // Set up the model
  React.useEffect(() => {
    if (fbx) {
      // Scale and position the model
      fbx.scale.setScalar(0.02);
      fbx.position.set(0, 0, 0);
      
      // Traverse and set up materials
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [fbx]);
  
  useFrame((state) => {
    if (hatRef.current) {
      // Gentle floating and rotating animation
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
      hatRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={hatRef}>
      <primitive object={fbx} />
    </group>
  );
}

// Sparkling Particles Component for Loading Screen
function LoadingSparkleParticles() {
  const particlesRef = useRef();
  const particleCount = 25;
  
  // Create sparkle particles
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Position particles around the hat in a wider area
      const radius = 1.2 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      
      // Golden sparkle colors
      colors[i * 3] = 1; // red
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // green (golden)
      colors[i * 3 + 2] = 0.3 + Math.random() * 0.2; // blue
      
      scales[i] = Math.random() * 0.3 + 0.1;
    }
    
    return { positions, colors, scales };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const colors = particlesRef.current.geometry.attributes.color.array;
      
      for (let i = 0; i < particleCount; i++) {
        // Gentle floating motion
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        positions[i * 3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.002;
        positions[i * 3 + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
        
        // Twinkling effect by varying opacity through colors
        const twinkle = Math.sin(state.clock.elapsedTime * 4 + i) * 0.5 + 0.5;
        colors[i * 3] = twinkle; // red
        colors[i * 3 + 1] = (0.8 + Math.random() * 0.2) * twinkle; // green
        colors[i * 3 + 2] = (0.3 + Math.random() * 0.2) * twinkle; // blue
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Container for the 3D Hat
const HatContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    margin: 1rem 0;
  }
`;

// Main Loading Screen Component
export default function LoadingScreen({ onLoadingComplete }) {
  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000); // 3 seconds loading time
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <LoadingContainer>
      <MagicalSparkles>
        <div className="sparkle">✨</div>
        <div className="sparkle">⭐</div>
        <div className="sparkle">💫</div>
        <div className="sparkle">🌟</div>
        <div className="sparkle">✦</div>
        <div className="sparkle">✧</div>
      </MagicalSparkles>
      
      <LoadingText>
        Awakening the Sorting Hat
      </LoadingText>
      
      <HatContainer>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          {/* Add extra lights for glowing effect */}
          <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffd700" />
          <pointLight position={[2, 2, 3]} intensity={0.5} color="#ffed4e" />
          <Suspense fallback={null}>
            <LoadingHat />
            <LoadingSparkleParticles />
          </Suspense>
        </Canvas>
      </HatContainer>
      
      <SubText>
        "I'll eat myself if you can find a smarter hat than me..."
      </SubText>
      
      <ProgressBar />
    </LoadingContainer>
  );
}