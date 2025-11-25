
import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // Zoom and pan state
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  const resetZoom = () => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = clamp(scale * delta, 0.5, 3);
    setScale(newScale);

    // Zoom towards mouse
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const scaleDiff = (newScale - scale) / scale;
      setTranslateX(translateX - mouseX * scaleDiff);
      setTranslateY(translateY - mouseY * scaleDiff);
    }
  }, [scale, translateX, translateY]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX - translateX);
    setDragStartY(e.clientY - translateY);
    document.addEventListener('pointermove', handlePointerMove as any);
    document.addEventListener('pointerup', handlePointerUp as any);
  }, [scale, translateX, translateY]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    setTranslateX(e.clientX - dragStartX);
    setTranslateY(e.clientY - dragStartY);
  }, [isDragging, dragStartX, dragStartY]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('pointermove', handlePointerMove as any);
    document.removeEventListener('pointerup', handlePointerUp as any);
  }, []);

  // Constrain pan bounds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const maxX = (scale - 1) * rect.width / 2;
        const maxY = (scale - 1) * rect.height / 2;
        setTranslateX(clamp(translateX, -maxX, maxX));
        setTranslateY(clamp(translateY, -maxY, maxY));
      }
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [scale, translateX, translateY]);

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
      <div 
        ref={imageContainerRef}
        className="relative max-w-full max-h-full inline-flex justify-center items-center shadow-2xl rounded-lg overflow-hidden bg-black transition-all duration-500 cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: 'center center'
        }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
      >
        
        {/* Active Scene (The one transitioning IN or staying) */}
        {/* We use a key to ensure React treats it as a fresh image, preventing artifacting from src swaps */}
        <img
          key={activeScene.id}
          src={activeScene.imageUrl}
          alt={activeScene.alt}
          className="max-w-full h-full w-auto object-cover block relative z-0"
        />

        {/* Previous Scene (The one transitioning OUT) */}
        {prevScene && (
          <img
            key={prevScene.id}
            src={prevScene.imageUrl}
            alt={prevScene.alt}
            className="absolute inset-0 w-full h-full object-cover z-10 animate-dissolve-out pointer-events-none"
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

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 bg-gray-900/70 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20 z-30">
        <button
          onClick={() => setScale(clamp(scale * 1.2, 0.5, 3))}
          aria-label="Zoom in"
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 100-2 1 1 0 000 2h-4a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V7z"/>
          </svg>
        </button>
        <button
          onClick={resetZoom}
          aria-label="Reset zoom"
          className="w-10 h-10 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 rounded p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold"
        >
          1x
        </button>
        <button
          onClick={() => setScale(clamp(scale / 1.2, 0.5, 3))}
          aria-label="Zoom out"
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.707 9.293a1 1 0 010 1.414L9.414 12l-2.707 2.707a1 1 0 11-1.414-1.414L7.586 12 5.293 9.707a1 1 0 010-1.414 1 1 0 011.414 0z"/>
          </svg>
        </button>
      </div>

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
