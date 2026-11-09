
import React from 'react';
import { LearningExample } from '../types';
import ImageTile from './ImageTile';

interface ImageGridProps {
  examples: LearningExample[];
  onImageClick: (example: LearningExample) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ examples, onImageClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 px-4 max-w-6xl w-full">
      {examples.map((example, index) => (
        <ImageTile 
          key={example.word + index} 
          example={example}
          index={index}
          onClick={onImageClick}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
