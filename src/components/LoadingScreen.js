import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import styled, { keyframes } from 'styled-components';

// Magical loading animations
const shimmer = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
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

const HatContainer = styled.div`
  width: 500px;
  height: 500px;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
  overflow: visible;
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
  animation: ${shimmer} 2s ease-in-out infinite;
  background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  animation: ${shimmer} 2s ease-in-out infinite, gradientShift 3s ease infinite;
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

// FBX Hat Component
function FBXHat({ modelPath }) {
  const hatRef = useRef();
  const fbx = useLoader(FBXLoader, modelPath);
  
  useFrame((state) => {
    if (hatRef.current) {
      // Continuous spinning
      hatRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      // Gentle floating
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      // Slight wobble
      hatRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <primitive 
      ref={hatRef}
      object={fbx} 
      scale={0.05} 
      position={[0, 0, 0]}
    />
  );
}

// Fallback Simple Hat Component
function SimpleHat() {
  const hatRef = useRef();
  
  useFrame((state) => {
    if (hatRef.current) {
      // Continuous spinning
      hatRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      // Gentle floating
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      // Slight wobble
      hatRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={hatRef} scale={1.5}>
      {/* Hat brim with glow */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.12, 32]} />
        <meshStandardMaterial 
          color="#2d1810" 
          emissive="#4a2c14"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Hat cone with magical glow */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[1.0, 1.8, 32]} />
        <meshStandardMaterial 
          color="#1a0f08" 
          emissive="#3d1e10"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Hat band */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.18, 32]} />
        <meshStandardMaterial 
          color="#8b4513" 
          emissive="#b8601a"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Magical glow effect */}
      <pointLight
        position={[0, 0, 0]}
        color="#ffd700"
        intensity={3}
        distance={5}
      />
    </group>
  );
}

// Main Loading Hat Component with FBX support
function LoadingHat() {
  return (
    <Suspense fallback={<SimpleHat />}>
      <FBXHat modelPath="/models/hat.fbx" />
    </Suspense>
  );
}

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
      
      <HatContainer>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Magical lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ffd700" />
          <pointLight position={[-5, -5, -5]} intensity={0.8} color="#4169e1" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.5}
            penumbra={1}
            intensity={2}
            color="#ffd700"
            target-position={[0, 0, 0]}
          />
          
          <LoadingHat />
        </Canvas>
      </HatContainer>
      
      <LoadingText>
        Awakening the Sorting Hat
      </LoadingText>
      
      <SubText>
        "I'll eat myself if you can find a smarter hat than me..."
      </SubText>
      
      <ProgressBar />
    </LoadingContainer>
  );
}