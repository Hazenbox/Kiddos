import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LearningExample } from '../types';
import ItemFallbackVisual from './ItemFallbackVisual';

interface ImageTileProps {
  example: LearningExample;
  index: number;
  onClick: (example: LearningExample) => void;
}

const ImageTile: React.FC<ImageTileProps> = ({ example, index, onClick }) => {
  const { word, imageUrl } = example;
  const [hasError, setHasError] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 30, rotate: index % 2 === 0 ? -4 : 4 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      exit={{ 
        opacity: 0, 
        scale: 0.5, 
        y: 20, 
        rotate: index % 2 === 0 ? 4 : -4,
        transition: { duration: 0.2, delay: index * 0.03 } 
      }}
      transition={{ 
        delay: 0.05 * index, 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(example);
        }
      }}
      onClick={() => onClick(example)}
      className="bg-white rounded-[3rem] p-3.5 sm:p-4 shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.14)] transition-all duration-300 overflow-hidden border-4 sm:border-8 border-[#F8FAFF] focus:border-[#00AEEF] focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/30 cursor-pointer group flex flex-col"
    >
      {/* Maximum image area filling the card cleanly with zero awkward letterboxing */}
      <div className="relative aspect-square w-full rounded-[2.2rem] overflow-hidden mb-3.5 bg-slate-100 flex items-center justify-center shadow-inner">
        {!hasError && imageUrl ? (
          <img 
            src={imageUrl} 
            alt={word} 
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out select-none"
          />
        ) : (
          <ItemFallbackVisual word={word} />
        )}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300 pointer-events-none rounded-[2.2rem]" />
      </div>
      
      <p className="text-center text-slate-800 font-black text-2xl md:text-3xl capitalize tracking-tight group-hover:text-[#00AEEF] transition-colors duration-200 mt-auto pb-1">
        {word}
      </p>
    </motion.div>
  );
};

export default ImageTile;
