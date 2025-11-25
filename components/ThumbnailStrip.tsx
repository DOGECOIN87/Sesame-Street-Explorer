
import React, { useRef, useEffect } from 'react';
import type { Scene } from '../types';

interface ThumbnailStripProps {
  scenes: Scene[];
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}

const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({ scenes, currentIndex, onThumbnailClick }) => {
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full p-4">
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
        {scenes.map((scene, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={scene.id}
              ref={isActive ? activeThumbnailRef : null}
              onClick={() => onThumbnailClick(index)}
              aria-label={`Go to scene ${index + 1}`}
              className={`flex-shrink-0 w-32 h-20 rounded-md overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 ${
                isActive ? 'ring-4 ring-yellow-400 scale-105' : 'ring-2 ring-transparent hover:ring-yellow-500'
              }`}
            >
              <img
                src={scene.imageUrl}
                alt={scene.alt}
                className={`w-full h-full object-cover transition-transform duration-300 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              />
            </button>
          );
        })}
      </div>
       <style>
          {`
            .scrollbar-thin::-webkit-scrollbar {
                height: 8px;
            }
            .scrollbar-thumb-gray-500::-webkit-scrollbar-thumb {
                background-color: #6b7280;
                border-radius: 10px;
            }
            .scrollbar-track-gray-800::-webkit-scrollbar-track {
                background-color: #1f2937;
            }
          `}
        </style>
    </div>
  );
};

export default ThumbnailStrip;
