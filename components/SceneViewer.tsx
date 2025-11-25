
import React, { useState, useEffect } from 'react';
import type { Scene } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface SceneViewerProps {
  scene: Scene;
  onPrev: () => void;
  onNext: () => void;
  onNavigateToScene: (sceneId: number) => void;
}

const SceneViewer: React.FC<SceneViewerProps> = ({ scene, onPrev, onNext, onNavigateToScene }) => {
  const [activeScene, setActiveScene] = useState<Scene>(scene);
  const [prevScene, setPrevScene] = useState<Scene | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync state with props and handle transition
  useEffect(() => {
    // Only trigger if the scene ID actually changes
    if (scene.id !== activeScene.id) {
      setPrevScene(activeScene);
      setActiveScene(scene);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setPrevScene(null);
        setIsTransitioning(false);
      }, 500); // 500ms matches the CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [scene, activeScene]);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative group">
      {/* 
        Container for images. 
        Inline-flex ensures it wraps the 'relative' image tightly.
      */}
      <div className="relative max-w-full max-h-full inline-flex justify-center items-center shadow-2xl rounded-lg overflow-hidden bg-black transition-all duration-500">
        
        {/* Active Scene (The one transitioning IN or staying) */}
        {/* We use a key to ensure React treats it as a fresh image, preventing artifacting from src swaps */}
        <img
          key={activeScene.id}
          src={activeScene.imageUrl}
          alt={activeScene.alt}
          className="max-w-full max-h-[75vh] md:max-h-[80vh] w-auto h-auto object-contain block relative z-0"
        />

        {/* Previous Scene (The one transitioning OUT) */}
        {prevScene && (
          <img
            key={prevScene.id}
            src={prevScene.imageUrl}
            alt={prevScene.alt}
            className="absolute inset-0 w-full h-full object-contain z-10 animate-dissolve-out pointer-events-none"
          />
        )}
        
        {/* Hotspots Overlay */}
        {/* We attach hotspots to the active scene. They fade in after transition to avoid clutter. */}
        <div className={`absolute inset-0 z-20 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
            {activeScene.hotspots?.map((hotspot) => (
            <button
                key={hotspot.id}
                onClick={() => onNavigateToScene(hotspot.targetSceneId)}
                className="group/hotspot absolute cursor-pointer focus:outline-none"
                style={{ ...hotspot.position }}
                aria-label={`Go to ${hotspot.label}`}
            >
                {/* Visual Indicator */}
                <div className="w-full h-full border-2 border-yellow-400/50 bg-white/10 rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.3)] animate-pulse-slow transition-all duration-300 group-hover/hotspot:bg-white/20 group-hover/hotspot:border-yellow-300 group-hover/hotspot:shadow-[0_0_20px_rgba(250,204,21,0.6)]"></div>

                {/* Label Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-yellow-300 text-sm font-bold px-3 py-1.5 rounded-md shadow-lg opacity-0 transition-all duration-300 transform translate-y-2 group-hover/hotspot:opacity-100 group-hover/hotspot:translate-y-0 pointer-events-none whitespace-nowrap z-20 border border-yellow-500/30">
                {hotspot.label}
                <svg className="absolute text-gray-900/90 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </span>
            </button>
            ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={onPrev}
        aria-label="Previous scene"
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 z-30 shadow-lg border border-white/10"
      >
        <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <button
        onClick={onNext}
        aria-label="Next scene"
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-gray-900/80 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 z-30 shadow-lg border border-white/10"
      >
        <ChevronRightIcon className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <style>
        {`
        @keyframes dissolve-out {
          from { opacity: 1; filter: blur(0px); }
          to { opacity: 0; filter: blur(2px); }
        }
        .animate-dissolve-out {
          animation: dissolve-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; box-shadow: inset 0 0 10px rgba(255,255,255,0.1); }
          50% { opacity: 1; box-shadow: inset 0 0 20px rgba(255,255,255,0.3); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        `}
      </style>
    </div>
  );
};

export default SceneViewer;
