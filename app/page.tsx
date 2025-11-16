'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const ORingRenderer = dynamic(() => import('@/components/o-ring-renderer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <p className="text-gray-500">Loading 3D render...</p>
    </div>
  ),
});

const PumpFootRenderer = dynamic(() => import('@/components/pump-foot-renderer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <p className="text-gray-500">Loading 3D render...</p>
    </div>
  ),
});

const ReturnCasingRenderer = dynamic(() => import('@/components/pump-return-casing-renderer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <p className="text-gray-500">Loading 3D render...</p>
    </div>
  ),
});

const PumpCasingRenderer = dynamic(() => import('@/components/pump-casing-renderer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <p className="text-gray-500">Loading 3D render...</p>
    </div>
  ),
});

export default function Home() {
  const [activeView, setActiveView] = useState<'oRing' | 'pumpFoot' | 'returnCasing' | 'pumpCasing'>('oRing');

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navigation bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg shadow-md">
        <button
          onClick={() => setActiveView('oRing')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeView === 'oRing'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          O-Ring
        </button>
        <button
          onClick={() => setActiveView('pumpFoot')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeView === 'pumpFoot'
              ? 'bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pump Foot
        </button>
        <button
          onClick={() => setActiveView('returnCasing')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeView === 'returnCasing'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Return Casing
        </button>
        <button
          onClick={() => setActiveView('pumpCasing')}
          className={`px-6 py-2 rounded-md font-medium transition-all ${
            activeView === 'pumpCasing'
              ? 'bg-indigo-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pump Casing N32-125
        </button>
      </div>

      {/* Content */}
      <div className="w-full h-full">
        {activeView === 'oRing' ? (
          <ORingRenderer />
        ) : activeView === 'pumpFoot' ? (
          <PumpFootRenderer />
        ) : activeView === 'returnCasing' ? (
          <ReturnCasingRenderer />
        ) : (
          <PumpCasingRenderer />
        )}
      </div>
    </div>
  );
}
