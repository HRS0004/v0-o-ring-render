'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ReturnChannelCasing() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate annular channel geometry using lathe
  const createChannelGeometry = () => {
    const points = [
      // Outer casing profile (outer diameter ~4 units)
      new THREE.Vector2(2.0, -0.5),   // outer bottom
      new THREE.Vector2(2.0, 0.2),    // outer top
      new THREE.Vector2(1.95, 0.25),  // rounded outer edge
      new THREE.Vector2(1.9, 0.27),   // outer curve
      new THREE.Vector2(1.8, 0.28),   // transitioning inward
      new THREE.Vector2(1.7, 0.27),   // crescent channel start
      new THREE.Vector2(1.65, 0.2),   // channel depth (30mm simulated)
      new THREE.Vector2(1.60, 0.0),   // channel middle
      new THREE.Vector2(1.65, -0.2),  // channel bottom
      new THREE.Vector2(1.7, -0.27),  // return elbow start
      new THREE.Vector2(1.8, -0.28),  // inner curve
      new THREE.Vector2(1.9, -0.27),  // inner transition
      new THREE.Vector2(1.95, -0.25), // rounded inner edge
      new THREE.Vector2(2.0, -0.2),   // inner top
      new THREE.Vector2(2.0, -0.5),   // close profile
    ];

    const latheGeometry = new THREE.LatheGeometry(points, 64, 0, Math.PI * 1.8);
    return latheGeometry;
  };

  return (
    <>
      <group ref={groupRef}>
        {/* Main annular return channel casing */}
        <mesh castShadow receiveShadow>
          <bufferGeometry {...createChannelGeometry()} />
          <meshStandardMaterial
            color="#4a7ba7"
            metalness={0.08}
            roughness={0.52}
            side={THREE.DoubleSide}
            castShadow
            receiveShadow
          />
        </mesh>

        {/* Outer casing shell - machined metal surface */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.05, 2.05, 0.6, 64]} />
          <meshStandardMaterial
            color="#5a8bb7"
            metalness={0.1}
            roughness={0.48}
          />
        </mesh>

        {/* Flow turning inlet - angled entry for 15° offset */}
        <mesh
          position={[1.6, 0, 0]}
          rotation={[0, 0, THREE.MathUtils.degToRad(15)]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.4, 0.25, 0.5]} />
          <meshStandardMaterial
            color="#4a7ba7"
            metalness={0.08}
            roughness={0.52}
          />
        </mesh>

        {/* Return elbow - guides flow back toward next stage */}
        <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.5, 0.15, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#4a7ba7"
            metalness={0.08}
            roughness={0.52}
          />
        </mesh>

        {/* Mounting flange - top interface for pump casing */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.15, 2.15, 0.15, 64]} />
          <meshStandardMaterial
            color="#5a8bb7"
            metalness={0.12}
            roughness={0.45}
          />
        </mesh>

        {/* Mounting bolt pad 1 */}
        <mesh position={[1.6, 0.35, 0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
          <meshStandardMaterial
            color="#3a5b87"
            metalness={0.15}
            roughness={0.6}
          />
        </mesh>

        {/* Mounting bolt pad 2 */}
        <mesh position={[-1.6, 0.35, 0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
          <meshStandardMaterial
            color="#3a5b87"
            metalness={0.15}
            roughness={0.6}
          />
        </mesh>

        {/* Mounting bolt pad 3 */}
        <mesh position={[1.6, 0.35, -0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
          <meshStandardMaterial
            color="#3a5b87"
            metalness={0.15}
            roughness={0.6}
          />
        </mesh>

        {/* Mounting bolt pad 4 */}
        <mesh position={[-1.6, 0.35, -0.9]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.2, 16]} />
          <meshStandardMaterial
            color="#3a5b87"
            metalness={0.15}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial
          color="#f5f5f5"
          metalness={0}
          roughness={0.95}
        />
      </mesh>

      {/* Shadow overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.79, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.15} />
      </mesh>

      {/* Key light - from upper front-left */}
      <directionalLight
        position={[4, 5.5, 3.5]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light - soft secondary */}
      <directionalLight position={[-3, 2.5, -2.5]} intensity={0.5} />

      {/* Rim light - back edge definition */}
      <directionalLight position={[0, 1.5, 5]} intensity={0.4} />

      {/* Ambient light */}
      <ambientLight intensity={0.7} />
    </>
  );
}

export default function ReturnCasingRenderer() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-8 text-center text-gray-600 text-sm pointer-events-none">
        <p>Return Channel Casing - Drag to rotate • Scroll to zoom • Right-click to pan</p>
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
          position={[4, 3.5, 4.5]}
          fov={38}
          near={0.1}
          far={100}
        />

        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={18}
        />

        <color attach="background" args={['#fafafa']} />

        <ReturnChannelCasing />
      </Canvas>
    </div>
  );
}
