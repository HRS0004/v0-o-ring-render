'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ORing() {
  const torusRef = useRef<THREE.Mesh>(null);

  return (
    <>
      {/* Main O-ring torus - perfectly centered and tilted for isometric view */}
      <mesh ref={torusRef} rotation={[0.35, 0.25, 0.15]} position={[0, 0.8, 0]} castShadow>
        <torusGeometry args={[2.5, 0.38, 72, 144]} />
        <meshStandardMaterial
          color="#a8a8a8"
          metalness={0.05}
          roughness={0.6}
          castShadow
          receiveShadow
        />
      </mesh>

      {/* Ground plane - visible reference surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#f5f5f5"
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.08} />
      </mesh>

      {/* Key light - primary illumination */}
      <directionalLight
        position={[3.5, 5, 2.5]}
        intensity={0.95}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Fill light - soft secondary */}
      <directionalLight position={[-2.5, 2.5, -1.5]} intensity={0.4} />

      {/* Rim light - edge definition */}
      <directionalLight position={[0, 0.5, 4]} intensity={0.3} />

      {/* Ambient light - studio fill */}
      <ambientLight intensity={0.6} />
    </>
  );
}

export default function ORingRenderer() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-8 text-center text-gray-600 text-sm pointer-events-none">
        <p>O-Ring - Drag to rotate • Scroll to zoom • Right-click to pan</p>
      </div>
      
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 2.2, 5.8]}
          fov={35}
          near={0.1}
          far={100}
        />

        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
        />

        <color attach="background" args={['#fafafa']} />

        <ORing />
      </Canvas>
    </div>
  );
}
