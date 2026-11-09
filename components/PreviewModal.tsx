import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LearningExample } from '../types';
import ItemFallbackVisual from './ItemFallbackVisual';
import { speak } from '../services/audioService';

interface PreviewModalProps {
  example: LearningExample;
  onClose: () => void;
  color?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ 
  example, 
  onClose, 
  color = 'bg-[#00AEEF]',
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  currentIndex,
  totalCount
}) => {
  const [extraImages, setExtraImages] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [activeImage, setActiveImage] = useState(example.imageUrl);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  const isColor = Boolean(example.hex);

  // Update active image if example prop changes
  useEffect(() => {
    setActiveImage(example.imageUrl);
    setExtraImages([]);
  }, [example]);

  // Keyboard navigation for TV remote and keyboard (Arrows + Escape)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
      e.preventDefault();
      onPrev();
    } else if (e.key === 'ArrowRight' && onNext && hasNext) {
      e.preventDefault();
      onNext();
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Load authentic related photos from Wikimedia Commons for non-color items
  useEffect(() => {
    if (isColor) return;
    let isCancelled = false;

    const loadRelatedPhotos = async () => {
      try {
        const cleanWord = example.word.trim();
        const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(cleanWord)}&gsrlimit=6&prop=imageinfo&iiprop=url`;
        const res = await fetch(url);
        const data = await res.json();
        const pages = data?.query?.pages || {};
        const foundUrls: string[] = [];

        Object.values(pages).forEach((p: any) => {
          const imgUrl = p?.imageinfo?.[0]?.url;
          if (
            imgUrl &&
            typeof imgUrl === 'string' &&
            !imgUrl.endsWith('.svg') &&
            !imgUrl.endsWith('.pdf') &&
            !imgUrl.endsWith('.djvu') &&
            !imgUrl.endsWith('.webm') &&
            imgUrl !== example.imageUrl
          ) {
            foundUrls.push(imgUrl);
          }
        });

        if (!isCancelled && foundUrls.length > 0) {
          setExtraImages(foundUrls.slice(0, 5));
        }
      } catch (err) {
        // Silently continue with primary authentic photo
      }
    };

    loadRelatedPhotos();

    return () => {
      isCancelled = true;
    };
  }, [example.word, example.imageUrl, isColor]);

  const handleImageError = (url: string) => {
    setFailedImages(prev => ({ ...prev, [url]: true }));
  };

  const fetchMore = async () => {
    if (extraImages.length >= 8 || isColor) return;
    setIsFetching(true);
    try {
      const cleanWord = example.word.trim();
      const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(cleanWord + ' photo')}&gsroffset=${extraImages.length + 2}&gsrlimit=6&prop=imageinfo&iiprop=url`;
      const res = await fetch(url);
      const data = await res.json();
      const pages = data?.query?.pages || {};
      const newUrls: string[] = [];

      Object.values(pages).forEach((p: any) => {
        const imgUrl = p?.imageinfo?.[0]?.url;
        if (
          imgUrl &&
          typeof imgUrl === 'string' &&
          !imgUrl.endsWith('.svg') &&
          !imgUrl.endsWith('.pdf') &&
          !imgUrl.endsWith('.djvu')
        ) {
          newUrls.push(imgUrl);
        }
      });

      setExtraImages(prev => Array.from(new Set([...prev, ...newUrls])).slice(0, 7));
    } catch (e) {
      // Ignore
    } finally {
      setIsFetching(false);
    }
  };

  const handleThumbClick = (url: string) => {
    setActiveImage(url);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Navigation Arrow Left (Floating outside or on left edge) */}
        {hasPrev && onPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            tabIndex={0}
            aria-label="Previous item"
            className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-2xl flex items-center justify-center transition-all z-[75] hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AEEF] cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Navigation Arrow Right (Floating outside or on right edge) */}
        {hasNext && onNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            tabIndex={0}
            aria-label="Next item"
            className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-2xl flex items-center justify-center transition-all z-[75] hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00AEEF] cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 26, stiffness: 350 }}
          className={`relative ${isColor ? 'max-w-2xl' : 'max-w-5xl'} w-full bg-white rounded-[3.5rem] p-5 sm:p-8 shadow-2xl border-[8px] sm:border-[10px] border-white flex flex-col ${isColor ? 'items-center' : 'md:flex-row'} gap-6 max-h-[92vh] overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Right Close Button - Safe inside modal bounds so it NEVER clips */}
          <button
            onClick={onClose}
            tabIndex={0}
            aria-label="Close Preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-full shadow-md flex items-center justify-center transition-all z-30 border border-slate-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-400 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Position Indicator Badge */}
          {typeof currentIndex === 'number' && typeof totalCount === 'number' && (
            <div className="absolute top-5 left-6 sm:top-7 sm:left-8 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-black text-slate-500 tracking-wider">
              {currentIndex + 1} / {totalCount}
            </div>
          )}

          {/* COLOR SHOWCASE VIEW */}
          {isColor ? (
            <div className="w-full flex flex-col items-center pt-8 sm:pt-6 pb-2">
              {/* Pure Color Swatch Card - Glossy & Vibrant */}
              <div 
                className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[50vh] rounded-[3rem] shadow-2xl border-[6px] border-white relative overflow-hidden flex items-center justify-center mb-6 transition-colors duration-300"
                style={{ backgroundColor: example.hex }}
              >
                {/* Glossy reflection */}
                <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                
                {/* Big Color Display */}
                <span className="text-white text-4xl sm:text-6xl font-black drop-shadow-lg tracking-tight select-none capitalize">
                  {example.word}
                </span>
              </div>

              {/* Pronunciation & Speak Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                onClick={() => speak(example.word)}
                className="px-10 py-4 rounded-[2.5rem] bg-slate-900 hover:bg-slate-800 shadow-xl text-white flex items-center gap-3.5 transition-all focus:outline-none focus:ring-4 focus:ring-slate-500 cursor-pointer"
              >
                <span className="text-3xl font-black capitalize tracking-tight">
                  {example.word}
                </span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </div>
              </motion.button>
            </div>
          ) : (
            /* STANDARD IMAGE / SUBJECT PREVIEW */
            <>
              {/* Main Full Image Area */}
              <div className="flex-1 flex flex-col items-center">
                {/* Full preview canvas with uncropped containment */}
                <div className="w-full flex-1 min-h-[300px] sm:min-h-[420px] max-h-[58vh] rounded-[2.5rem] overflow-hidden mb-5 shadow-inner border-4 border-slate-100 bg-slate-50 flex items-center justify-center p-3 relative group">
                  <AnimatePresence mode="wait">
                    {!failedImages[activeImage] && activeImage ? (
                      <motion.img
                        key={activeImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        src={activeImage}
                        alt={example.word}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(activeImage)}
                        className="w-full h-full max-h-[54vh] object-contain drop-shadow-md select-none"
                      />
                    ) : (
                      <div key="fallback" className="w-full h-full flex items-center justify-center">
                        <ItemFallbackVisual word={example.word} />
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Fullscreen Expand Action Button */}
                  {!failedImages[activeImage] && activeImage && (
                    <button
                      onClick={() => setIsFullScreen(true)}
                      tabIndex={0}
                      title="View Fullscreen High-Res Photo"
                      className="absolute top-4 right-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur shadow-md hover:shadow-lg border border-slate-200/80 text-slate-700 hover:text-[#00AEEF] flex items-center gap-1.5 text-xs font-black tracking-wide transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>Full View</span>
                    </button>
                  )}
                </div>
                
                {/* Big Interactive Pronunciation & Title Badge with Fixed Clean SVG Speaker */}
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  tabIndex={0}
                  onClick={() => speak(example.word)}
                  className={`px-8 sm:px-12 py-3.5 sm:py-4 rounded-[2.2rem] ${color} shadow-lg hover:shadow-xl text-white flex items-center gap-3 transition-all focus:outline-none focus:ring-4 focus:ring-[#00AEEF] cursor-pointer`}
                >
                  <span className="text-3xl sm:text-5xl font-black capitalize tracking-tight">
                    {example.word}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  </div>
                </motion.button>
              </div>

              {/* Sidebar for Gallery Images */}
              <div className="w-full md:w-56 flex flex-col justify-between border-t md:border-t-0 md:border-l md:pl-6 border-slate-100 pt-4 md:pt-0">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest">
                      Photo Gallery
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {1 + extraImages.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 md:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                    {/* Primary Photo Thumb */}
                    <button 
                      onClick={() => handleThumbClick(example.imageUrl)}
                      tabIndex={0}
                      aria-label="Select primary photo"
                      className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all bg-slate-50 p-1 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${
                        activeImage === example.imageUrl ? 'border-[#00AEEF] ring-2 ring-[#00AEEF]/20 scale-95 shadow-sm' : 'border-transparent hover:border-slate-200'
                      }`}
                    >
                      {!failedImages[example.imageUrl] && example.imageUrl ? (
                        <img 
                          src={example.imageUrl} 
                          className="w-full h-full object-cover rounded-xl" 
                          alt={example.word}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(example.imageUrl)} 
                        />
                      ) : (
                        <ItemFallbackVisual word={example.word} className="text-xs" />
                      )}
                    </button>
                    
                    {/* Extra Related Photos */}
                    {extraImages.map((img, idx) => (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        key={idx}
                        onClick={() => handleThumbClick(img)}
                        tabIndex={0}
                        aria-label={`Select photo ${idx + 2}`}
                        className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all bg-slate-50 p-1 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${
                          activeImage === img ? 'border-[#00AEEF] ring-2 ring-[#00AEEF]/20 scale-95 shadow-sm' : 'border-transparent hover:border-slate-200'
                        }`}
                      >
                        {!failedImages[img] ? (
                          <img 
                            src={img} 
                            className="w-full h-full object-cover rounded-xl" 
                            alt={`${example.word} variation ${idx + 1}`}
                            referrerPolicy="no-referrer"
                            onError={() => handleImageError(img)} 
                          />
                        ) : (
                          <ItemFallbackVisual word={example.word} className="text-xs" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Fetch More Button */}
                {extraImages.length < 7 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={isFetching}
                    onClick={fetchMore}
                    tabIndex={0}
                    className={`mt-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00AEEF] ${
                      isFetching ? 'bg-slate-100 text-slate-300' : 'bg-[#F0F2FF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white'
                    }`}
                  >
                    {isFetching ? (
                      <div className="w-4 h-4 border-2 border-[#00AEEF] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {isFetching ? 'Finding Photos...' : 'More Photos'}
                  </motion.button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Fullscreen Lightbox Overlay for Maximum High-Res Viewing */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullScreen(false)}
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-xl font-bold transition-all cursor-pointer"
            >
              ✕
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage}
              alt={example.word}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="mt-4 text-white text-3xl font-black capitalize tracking-wide drop-shadow">
              {example.word}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PreviewModal;
