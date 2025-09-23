import React, { useRef, Suspense } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 2rem 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      var(--gryffindor-secondary), 
      var(--hufflepuff-primary),
      var(--ravenclaw-secondary),
      var(--slytherin-secondary),
      transparent
    );
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(212,175,55,0.4);
  }
`;

const MainTitle = styled.h1`
  font-family: 'MedievalSharp', cursive;
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin-bottom: 1rem;
  background: linear-gradient(
    45deg,
    var(--gryffindor-secondary),
    var(--hufflepuff-primary),
    var(--ravenclaw-secondary),
    var(--slytherin-secondary),
    var(--gryffindor-tertiary)
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmerText 4s ease-in-out infinite;
  text-shadow: 
    0 0 30px rgba(212,175,55,0.4),
    0 0 60px rgba(212,175,55,0.2);
  position: relative;
  z-index: 3;
  
  &::before {
    content: '✨';
    position: absolute;
    left: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    animation: gentleFloat 4s ease-in-out infinite;
    animation-delay: 0.5s;
  }
  
  &::after {
    content: '✨';
    position: absolute;
    right: -60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    animation: gentleFloat 4s ease-in-out infinite;
    animation-delay: 1.5s;
  }
`;

const Subtitle = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: var(--text-silver);
  margin-bottom: 1rem;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0.9;
`;

const Quote = styled.p`
  font-family: 'Crimson Text', serif;
  font-size: clamp(1rem, 2vw, 1.4rem);
  color: var(--text-muted);
  font-style: italic;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    left: -20px;
    top: -10px;
    font-size: 3rem;
    color: var(--gryffindor-secondary);
    opacity: 0.6;
  }
  
  &::after {
    content: '"';
    position: absolute;
    right: -20px;
    bottom: -20px;
    font-size: 3rem;
    color: var(--gryffindor-secondary);
    opacity: 0.6;
  }
`;

const MagicalElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  .star {
    position: absolute;
    color: var(--text-gold);
    animation: magicalPulse 3s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 30%;
      right: 15%;
      animation-delay: 1s;
    }
    
    &:nth-child(3) {
      bottom: 20%;
      left: 20%;
      animation-delay: 2s;
    }
    
    &:nth-child(4) {
      bottom: 30%;
      right: 10%;
      animation-delay: 0.5s;
    }
  }
`;

// FBX Hat Component for Header
function HeaderHat({ isSorting }) {
  const hatRef = useRef();
  
  // Load the FBX model
  const fbx = useLoader(FBXLoader, '/models/hat.fbx');
  
  // Set up the model
  React.useEffect(() => {
    if (fbx) {
      // Scale and position the model for header
      fbx.scale.setScalar(0.03); // Smaller hat scale
      fbx.position.set(0, -0.2, 0); // Centered position
      
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
      // Gentle floating animation
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
      
      // Continuous smooth rotation
      hatRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Faster spinning during sorting
      if (isSorting) {
        hatRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      }
    }
  });

  return (
    <group ref={hatRef}>
      <primitive object={fbx} />
    </group>
  );
}

// Sparkling Particles Component
function SparkleParticles() {
  const particlesRef = useRef();
  const particleCount = 30;
  
  // Create sparkle particles
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      // Position particles around the hat in a wider area
      const radius = 1.5 + Math.random() * 1;
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
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i * 3 + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001;
        positions[i * 3 + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
        
        // Twinkling effect by varying opacity through colors
        const twinkle = Math.sin(state.clock.elapsedTime * 3 + i) * 0.5 + 0.5;
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
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Container for the 3D Hat in Header
const HatContainer = styled.div`
  width: 800px;
  height: 600px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 600px;
    height: 500px;
    margin: 1.5rem auto;
  }
`;

const Header = ({ isHatActive, isSorting, currentStudent }) => {
  return (
    <HeaderContainer>
      <MagicalElements>
        <div className="star">⭐</div>
        <div className="star">🌟</div>
        <div className="star">✨</div>
        <div className="star">💫</div>
      </MagicalElements>
      
      <MainTitle className="magical-text">
        Hogwarts Sorting Ceremony
      </MainTitle>
      
      <HatContainer>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 40 }}
          style={{ 
            width: '100%', 
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1}
            castShadow
          />
          <pointLight position={[-5, -5, -5]} intensity={0.4} />
          {/* Add extra lights for glowing effect */}
          <pointLight position={[0, 0, 2]} intensity={0.8} color="#ffd700" />
          <pointLight position={[2, 2, 2]} intensity={0.5} color="#ffed4e" />
          <Suspense fallback={null}>
            <HeaderHat isSorting={isSorting} />
            <SparkleParticles />
          </Suspense>
        </Canvas>
      </HatContainer>
      
      <Subtitle>
        School of Witchcraft and Wizardry
      </Subtitle>
      
      <Quote>
        Oh, you may not think I'm pretty, but don't judge on what you see,
        I'll eat myself if you can find a smarter hat than me.
      </Quote>
    </HeaderContainer>
  );
};

export default Header;