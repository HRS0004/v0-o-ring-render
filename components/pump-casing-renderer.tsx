'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function VoluteCasingGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  const volumeGeometry = useMemo(() => {
    const points = [];
    const radius = 1.6;
    const segments = 32;
    
    // Create profile for lathe geometry
    for (let i = 0; i <= segments; i++) {
      const y = (i / segments) * 2.2 - 1.1;
      const r = radius * (0.95 + 0.05 * Math.sin(i / segments * Math.PI));
      points.push(new THREE.Vector2(r, y));
    }
    
    const geom = new THREE.LatheGeometry(points, 64);
    return geom;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main cylindrical volute body - solid cast steel */}
      <mesh geometry={volumeGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Top flange with 4 bolt holes */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 0.4, 64]} />
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
        />
      </mesh>

      {/* Top flange center bore - suction connection */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.5, 48]} />
        <meshStandardMaterial
          color="#0a1a2a"
          metalness={0.25}
          roughness={0.4}
        />
      </mesh>

      {/* Top flange bolts - 4 on Ø3.0 circle */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 1.5;
        const z = Math.sin(rad) * 1.5;
        return (
          <mesh key={`top-bolt-${angle}`} position={[x, 1.05, z]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.6, 32]} />
            <meshStandardMaterial
              color="#1a3a5a"
              metalness={0.15}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* Bottom flange with 4 bolt holes */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 0.4, 64]} />
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
        />
      </mesh>

      {/* Bottom flange center bore - discharge connection */}
      <mesh position={[0, -1.25, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.5, 48]} />
        <meshStandardMaterial
          color="#0a1a2a"
          metalness={0.25}
          roughness={0.4}
        />
      </mesh>

      {/* Bottom flange bolts - 4 on Ø3.0 circle */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 1.5;
        const z = Math.sin(rad) * 1.5;
        return (
          <mesh key={`bottom-bolt-${angle}`} position={[x, -1.05, z]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.6, 32]} />
            <meshStandardMaterial
              color="#1a3a5a"
              metalness={0.15}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* Split casing bolts - 8 around perimeter */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 360) / 8;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 1.75;
        const z = Math.sin(rad) * 1.75;
        return (
          <mesh key={`split-bolt-${i}`} position={[x, 0.3, z]} castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.7, 32]} />
            <meshStandardMaterial
              color="#1a3a5a"
              metalness={0.15}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      <mesh position={[1.7, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.85, 1.8, 48]} />
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
        />
      </mesh>

      {/* Suction inlet flange - top cap */}
      <mesh position={[2.8, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.45, 48]} />
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
        />
      </mesh>

      {/* Suction inlet flange bolts - 4 on top flange */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const z = Math.sin(rad) * 0.7;
        const y = Math.cos(rad) * 0.7;
        return (
          <mesh key={`inlet-bolt-${angle}`} position={[2.8, 0.2 + y, z]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.5, 28]} />
            <meshStandardMaterial
              color="#1a3a5a"
              metalness={0.15}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* Top discharge outlet - extending upward */}
      <mesh position={[0, 2.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.75, 1.2, 48]} />
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
        />
      </mesh>

      {/* Top discharge outlet flange */}
      <mesh position={[0, 3.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.45, 48]} />
        <meshStandardMaterial
          color="#2a5a9a"
          metalness={0.1}
          roughness={0.55}
        />
      </mesh>

      {/* Discharge outlet flange bolts - 4 on top flange */}
      {[0, 90, 180, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.65;
        const z = Math.sin(rad) * 0.65;
        return (
          <mesh key={`outlet-bolt-${angle}`} position={[x, 2.95, z]} castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.5, 28]} />
            <meshStandardMaterial
              color="#1a3a5a"
              metalness={0.15}
              roughness={0.5}
            />
          </mesh>
        );
      })}

      {/* Left mounting foot */}
      <mesh position={[-1.6, -1.85, 0.8]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshStandardMaterial
          color="#1a3a5a"
          metalness={0.08}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[-1.6, -1.85, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.8, 28]} />
        <meshStandardMaterial
          color="#050a0f"
          metalness={0.3}
          roughness={0.3}
        />
      </mesh>

      {/* Right mounting foot */}
      <mesh position={[-1.6, -1.85, -0.8]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshStandardMaterial
          color="#1a3a5a"
          metalness={0.08}
          roughness={0.6}
        />
      </mesh>

      <mesh position={[-1.6, -1.85, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.8, 28]} />
        <meshStandardMaterial
          color="#050a0f"
          metalness={0.3}
          roughness={0.3}
        />
      </mesh>

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial
          color="#f0f0f5"
          metalness={0}
          roughness={0.98}
        />
      </mesh>

      {/* Shadow overlay on ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.48, 0]}>
        <planeGeometry args={[14, 12]} />
        <shadowMaterial opacity={0.18} />
      </mesh>
    </group>
  );
}

function LightingSetup() {
  return (
    <>
      {/* Key light - studio 3/4 angle */}
      <directionalLight
        position={[5.5, 6.5, 4.5]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={40}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />

      {/* Fill light - left side softening */}
      <directionalLight position={[-4.5, 4, -3.5]} intensity={0.6} />

      {/* Rim light - back edge definition */}
      <directionalLight position={[0, 3, 7]} intensity={0.5} />

      {/* Ambient - soft overall fill */}
      <ambientLight intensity={0.8} />
    </>
  );
}

export default function PumpCasingRenderer() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="absolute top-8 text-center text-gray-600 text-sm pointer-events-none">
        <p>Centrifugal Pump Casing - Solid Cast Iron Construction - Drag to rotate • Scroll to zoom • Right-click to pan</p>
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
          position={[4.5, 3.2, 5.2]}
          fov={40}
          near={0.1}
          far={100}
        />

        <OrbitControls
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={6.5}
          maxDistance={20}
        />

        <color attach="background" args={['#fafafa']} />

        <VoluteCasingGeometry />
        <LightingSetup />
      </Canvas>
    </div>
  );
}
