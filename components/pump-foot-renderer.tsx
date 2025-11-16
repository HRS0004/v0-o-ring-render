'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function PumpFoot() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <>
      <group ref={groupRef} position={[0, 0.5, 0]}>
        {/* Main trapezoidal support block - cast iron body */}
        <mesh castShadow receiveShadow>
          {/* Tapered trapezoid for pump foot - wider at base */}
          <boxGeometry args={[1.8, 1.2, 1.6]} />
          <meshStandardMaterial
            color="#1e3a5f"
            metalness={0.12}
            roughness={0.55}
            castShadow
            receiveShadow
          />
        </mesh>

        {/* Top mounting surface - flat plate where pump casing connects */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.2, 1.4]} />
          <meshStandardMaterial
            color="#2a4a7c"
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>

        {/* Left chamfer/fillet - adds cast detail */}
        <mesh position={[-0.95, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 1.1, 1.5]} />
          <meshStandardMaterial
            color="#1a2f4f"
            metalness={0.12}
            roughness={0.58}
          />
        </mesh>

        {/* Right chamfer/fillet */}
        <mesh position={[0.95, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 1.1, 1.5]} />
          <meshStandardMaterial
            color="#1a2f4f"
            metalness={0.12}
            roughness={0.58}
          />
        </mesh>

        {/* Front fillet curve */}
        <mesh position={[0, 0, -0.85]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 1.0, 0.1]} />
          <meshStandardMaterial
            color="#1a2f4f"
            metalness={0.12}
            roughness={0.58}
          />
        </mesh>

        {/* Back fillet curve */}
        <mesh position={[0, 0, 0.85]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 1.0, 0.1]} />
          <meshStandardMaterial
            color="#1a2f4f"
            metalness={0.12}
            roughness={0.58}
          />
        </mesh>

        {/* Bolt hole 1 - bottom left */}
        <mesh position={[-0.6, -0.5, -0.4]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial
            color="#0f1f3f"
            metalness={0.15}
            roughness={0.65}
          />
        </mesh>

        {/* Bolt hole 2 - bottom right */}
        <mesh position={[0.6, -0.5, -0.4]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial
            color="#0f1f3f"
            metalness={0.15}
            roughness={0.65}
          />
        </mesh>

        {/* Bolt hole 3 - bottom left back */}
        <mesh position={[-0.6, -0.5, 0.4]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial
            color="#0f1f3f"
            metalness={0.15}
            roughness={0.65}
          />
        </mesh>

        {/* Bolt hole 4 - bottom right back */}
        <mesh position={[0.6, -0.5, 0.4]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
          <meshStandardMaterial
            color="#0f1f3f"
            metalness={0.15}
            roughness={0.65}
          />
        </mesh>
      </group>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#f5f5f5"
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* Shadow overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[8, 8]} />
        <shadowMaterial opacity={0.12} />
      </mesh>

      {/* Key light - from upper front-left */}
      <directionalLight
        position={[3.5, 5, 3]}
        intensity={1.0}
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
      <directionalLight position={[-2.5, 2.5, -2]} intensity={0.45} />

      {/* Rim light - back edge definition */}
      <directionalLight position={[0, 1, 4]} intensity={0.35} />

      {/* Ambient light */}
      <ambientLight intensity={0.65} />
    </>
  );
}

export default function PumpFootRenderer() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-8 text-center text-gray-600 text-sm pointer-events-none">
        <p>Pump Foot - Drag to rotate • Scroll to zoom • Right-click to pan</p>
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
          position={[3, 3, 4]}
          fov={40}
          near={0.1}
          far={100}
        />

        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
        />

        <color attach="background" args={['#fafafa']} />

        <PumpFoot />
      </Canvas>
    </div>
  );
}
