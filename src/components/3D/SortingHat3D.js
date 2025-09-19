import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Custom FBX Hat Component
function FBXHat({ modelPath, isSorting, onHatClick }) {
  const hatRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Load the FBX model
  const fbx = useLoader(FBXLoader, modelPath);
  
  // Set up the model
  React.useEffect(() => {
    if (fbx) {
      // Scale and position the model appropriately - BIGGER SIZE
      fbx.scale.setScalar(0.03); // Increased from 0.01 to 0.03 for bigger hat
      fbx.position.set(0, 0, 0);
      
      // Traverse and set up materials
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Make sure materials work with our lighting
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
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      hatRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      // Spinning effect during sorting
      if (isSorting) {
        hatRef.current.rotation.y += 0.05;
      }
    }
  });

  return (
    <group
      ref={hatRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onHatClick}
      scale={hovered ? 1.1 : 1}
    >
      <primitive object={fbx} />
      
      {/* Magical glow effect during sorting */}
      {isSorting && (
        <pointLight
          position={[0, 0, 0]}
          color="#ffd700"
          intensity={2}
          distance={3}
        />
      )}
    </group>
  );
}

// Fallback simple hat (if FBX fails to load)
function SimpleHat({ isSorting, onHatClick }) {
  const hatRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (hatRef.current) {
      hatRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      hatRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      if (isSorting) {
        hatRef.current.rotation.y += 0.05;
      }
    }
  });

  return (
    <group
      ref={hatRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onHatClick}
      scale={hovered ? 1.3 : 1.2} // Made bigger: 1.2 base scale, 1.3 on hover
    >
      {/* Fallback simple hat shape */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.12, 32]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[1.0, 1.8, 32]} />
        <meshStandardMaterial color="#1a0f08" />
      </mesh>
      
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.18, 32]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {isSorting && (
        <pointLight
          position={[0, 0, 0]}
          color="#ffd700"
          intensity={2}
          distance={3}
        />
      )}
    </group>
  );
}

// Magical particles around the hat
function MagicalParticles() {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create floating sparkles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 2 + Math.sin(i) * 0.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(i * 0.5) * 1.5;
    
    return (
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffaa00"
          emissiveIntensity={0.5}
        />
      </mesh>
    );
  });

  return <group ref={particlesRef}>{particles}</group>;
}

// Simple orbit controls without drei
function CameraControls() {
  useFrame(({ camera, mouse }) => {
    // Simple mouse-based camera rotation
    camera.position.x = Math.sin(mouse.x * 0.5) * 5;
    camera.position.z = Math.cos(mouse.x * 0.5) * 5;
    camera.position.y = 1 + mouse.y * 2;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

// Main 3D Scene Component
export default function SortingHat3D({ isSorting, onHatClick, modelPath = null }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 50 }}
      style={{
        width: '100%',
        height: '300px',
        background: 'transparent'
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4169e1" />
      
      {/* Conditionally render FBX or Simple Hat */}
      <Suspense fallback={<SimpleHat isSorting={isSorting} onHatClick={onHatClick} />}>
        {modelPath ? (
          <FBXHat 
            modelPath={modelPath} 
            isSorting={isSorting} 
            onHatClick={onHatClick} 
          />
        ) : (
          <SimpleHat isSorting={isSorting} onHatClick={onHatClick} />
        )}
      </Suspense>
      
      {/* Magical Particles */}
      <MagicalParticles />
      
      {/* Simple camera controls */}
      <CameraControls />
    </Canvas>
  );
}