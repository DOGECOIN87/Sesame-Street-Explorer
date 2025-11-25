
import React, { useState, useCallback } from 'react';
import SceneViewer from './components/SceneViewer';
import ThumbnailStrip from './components/ThumbnailStrip';
import { SCENES } from './constants';

const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

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

  return (
    <div className="bg-gray-800 text-white h-screen w-screen overflow-hidden flex flex-col font-sans">
      <header className="text-center p-4 shadow-lg bg-gray-900/50 backdrop-blur-sm z-20">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-yellow-300">
          Interactive Scene Explorer
        </h1>
        <p className="text-sm text-gray-300">Navigate through the vibrant world</p>
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
