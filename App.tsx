import React, { useState, useCallback, useEffect, useRef } from 'react';
import SceneViewer from './components/SceneViewer';
import ThumbnailStrip from './components/ThumbnailStrip';
import { SCENES } from './constants';

const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  const handleNextScene = useCallback(() => {
    setCurrentSceneIndex((prevIndex) => (prevIndex + 1) % SCENES.length);
  }, []);

  const handlePrevScene = useCallback(() => {
    setCurrentSceneIndex(
      (prevIndex) => (prevIndex - 1 + SCENES.length) % SCENES.length
    );
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentSceneIndex(index);
  }, []);

  const handleNavigateToScene = useCallback((sceneId: number) => {
    const sceneIndex = SCENES.findIndex((scene) => scene.id === sceneId);
    if (sceneIndex !== -1) {
      setCurrentSceneIndex(sceneIndex);
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      appRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevScene();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNextScene();
          break;
        case 'Escape':
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          if (/^[1-9]$/.test(e.key)) {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (index < SCENES.length) {
              setCurrentSceneIndex(index);
            }
          }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevScene, handleNextScene]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={appRef} className="bg-gray-800 text-white h-screen w-screen overflow-hidden flex flex-col font-sans">
      <header className="text-center p-4 shadow-lg bg-gray-900/50 backdrop-blur-sm z-20 flex items-center justify-center space-x-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-yellow-300">
            Interactive Scene Explorer
          </h1>
          <p className="text-sm text-gray-300">Navigate through the vibrant world</p>
          <p className="text-xs text-gray-400 mt-1">← → arrows, 1-9 keys, F fullscreen</p>
        </div>
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="p-2 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg ml-auto"
        >
          {isFullscreen ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6a2 2 0 01.586 2.828L12 12.414A2 2 0 0111.414 13H8a2 2 0 01-2-2V4zM4 10a2 2 0 012-2h4.414A2 2 0 0112 8.586L15.414 12a2 2 0 01-.586 2.828L12 17.414A2 2 0 0111.414 18H8a2 2 0 01-2-2v-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a2 2 0 012-2h4a2 2 0 012 2v2h2a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 01-2-2H5zm8 0v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V7a1 1 0 011-1h4a1 1 0 011 1z"/>
            </svg>
          )}
        </button>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-2 md:p-4 relative min-h-0">
        <SceneViewer
          scene={SCENES[currentSceneIndex]}
          onPrev={handlePrevScene}
          onNext={handleNextScene}
          onNavigateToScene={handleNavigateToScene}
        />
      </main>
      
      <footer className="w-full z-20 bg-gray-900/50 backdrop-blur-sm">
        <ThumbnailStrip
          scenes={SCENES}
          currentIndex={currentSceneIndex}
          onThumbnailClick={handleThumbnailClick}
        />
      </footer>
    </div>
  );
};

export default App;
