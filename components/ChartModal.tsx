import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ItemFallbackVisual from './ItemFallbackVisual';

interface ChartModalProps {
  title: string;
  type: 'grid' | 'gallery' | 'colors';
  items: any[];
  onClose: () => void;
  onItemClick: (item: any) => void;
  color: string;
}

const GalleryItemImage: React.FC<{ url: string; word: string }> = ({ url, word }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !url) {
    return <ItemFallbackVisual word={word} className="text-sm" />;
  }

  return (
    <img 
      src={url} 
      loading="lazy"
      alt={word} 
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 select-none" 
    />
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  },
  exit: {
    opacity: 0
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  exit: { scale: 0, opacity: 0 }
};

const ChartModal: React.FC<ChartModalProps> = ({ title, type, items, onClose, onItemClick, color }) => {
  const isNumbers = title.toLowerCase() === 'numbers';

  // Handle keyboard Escape to close chart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#E9E6DD] overflow-hidden"
    >
      {/* Header UI - Flexbox row guarantees back arrow never jumps vertically */}
      <div className={`relative ${color} shadow-md shrink-0 z-10 overflow-hidden`}>
        {/* Subtle pattern & lighting */}
        <div className="absolute inset-0 bg-white/10 opacity-30 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-8 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none" />
        
        {/* Centered flex navigation bar */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onClose}
            tabIndex={0}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/25 hover:bg-white/35 active:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-white/50 cursor-pointer"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-md tracking-tight text-center">
            {title}
          </h2>

          {/* Spacer to keep title center-aligned */}
          <div className="w-10 h-10 md:w-12 md:h-12 pointer-events-none" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 custom-scrollbar bg-[#E9E6DD]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={
            isNumbers
              ? "grid grid-cols-5 gap-3.5 sm:gap-5 md:gap-6 max-w-5xl mx-auto"
              : type === 'grid'
                ? "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9 gap-3 md:gap-4 max-w-7xl mx-auto"
                : type === 'colors'
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 md:gap-7 max-w-7xl mx-auto"
                  : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto"
          }
        >
          {items.map((item, idx) => {
            const isGrid = type === 'grid';
            const isColors = type === 'colors';
            
            return (
              <motion.button
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                onClick={() => onItemClick(item)}
                className={`
                  relative group flex flex-col items-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#00AEEF]
                  ${isNumbers
                    ? `aspect-[4/3] sm:aspect-square rounded-[2rem] md:rounded-[2.5rem] ${item.color || 'bg-white'} border-4 border-white shadow-md hover:shadow-2xl text-white font-black text-4xl sm:text-6xl md:text-7xl justify-center transition-all`
                    : isGrid 
                      ? `aspect-square rounded-2xl md:rounded-3xl ${item.color || 'bg-white'} border-3 md:border-4 border-white shadow-md text-white font-black text-3xl md:text-5xl justify-center`
                       : isColors
                        ? 'aspect-video rounded-[1.8rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border-[5px] border-white/80'
                        : 'bg-white rounded-[2rem] p-3 md:p-4 shadow-sm hover:shadow-xl border-4 border-transparent hover:border-[#00AEEF] transition-all'
                  }
                `}
                style={isColors ? { backgroundColor: item.hex } : undefined}
              >
                {isNumbers ? (
                  <div className="w-full h-full flex items-center justify-center text-center">
                    <span className="drop-shadow-md select-none">{item.key}</span>
                  </div>
                ) : isGrid ? (
                  <div className="w-full h-full flex items-center justify-center gap-1.5 leading-none">
                    <span className="drop-shadow-sm select-none">{item.key}</span>
                    {item.type === 'letter' && (
                      <span className="text-[0.6em] font-semibold opacity-90 select-none">{item.key.toLowerCase()}</span>
                    )}
                  </div>
                ) : isColors ? (
                  <>
                    {/* Gloss shine top-left */}
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
                    {/* Extra sparkle top-right */}
                    <div className="absolute top-2 right-4 w-12 h-12 bg-white/15 rounded-full blur-lg pointer-events-none" />
                    {/* White ring outline for the White tile */}
                    {item.word === 'White' && (
                      <div className="absolute inset-0 rounded-[1.4rem] ring-4 ring-inset ring-slate-300/70 pointer-events-none" />
                    )}
                    {/* Color Name */}
                    <span className={`absolute bottom-3 md:bottom-4 inset-x-0 text-center text-xl md:text-2xl lg:text-3xl font-black drop-shadow-lg capitalize select-none px-2 ${item.word === 'White' ? 'text-slate-800 drop-shadow-none' : 'text-white'}`}>
                      {item.word}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-3 bg-slate-100 relative shadow-inner">
                      <GalleryItemImage url={item.imageUrl} word={item.word} />
                    </div>
                    <span className="text-base sm:text-lg md:text-xl font-black text-slate-800 group-hover:text-[#00AEEF] transition-colors text-center capitalize">
                      {item.word}
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </motion.div>
        
        <div className="h-16" />
      </div>
    </motion.div>
  );
};

export default ChartModal;
