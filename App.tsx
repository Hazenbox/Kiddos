import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALPHABET_DATA, NUMBER_DATA, CATEGORY_DATA } from './constants';
import { LearningItem, LearningExample } from './types';
import HeroCard from './components/HeroCard';
import ImageGrid from './components/ImageGrid';
import PreviewModal from './components/PreviewModal';
import ChartModal from './components/ChartModal';
import HomeWidget from './components/HomeWidget';
import { speak } from './services/audioService';

const itemVariants = {
  rest: (c: { i: number; r: number }) => ({ 
    y: 0, 
    rotate: c.r,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }),
  hover: (c: { i: number; r: number }) => ({
    y: [0, -12, 0], 
    rotate: [c.r, c.r - 8, c.r + 8, c.r], 
    scale: 1.1,
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: c.i * 0.1,
      },
      rotate: {
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: c.i * 0.1,
        times: [0, 0.25, 0.75, 1]
      },
      scale: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  })
};

const App: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<LearningItem | null>(null);
  const [selectedExample, setSelectedExample] = useState<LearningExample | null>(null);
  const [modalContext, setModalContext] = useState<{
    items: LearningExample[];
    currentIndex: number;
  } | null>(null);
  const [activeChart, setActiveChart] = useState<'alphabets' | 'numbers' | 'animals' | 'fruits' | 'vegetables' | 'colors' | 'shapes' | null>(null);
  const [isCapsLock, setIsCapsLock] = useState(false);

  const getChartConfig = useCallback(() => {
    switch(activeChart) {
      case 'alphabets': return { title: 'Alphabets', type: 'grid' as const, items: Object.values(ALPHABET_DATA), color: 'bg-[#00AEEF]' };
      case 'numbers': return { title: 'Numbers', type: 'grid' as const, items: Object.values(NUMBER_DATA), color: 'bg-[#00A35C]' };
      case 'animals': return { title: 'Animals & Birds', type: 'gallery' as const, items: CATEGORY_DATA.animals, color: 'bg-[#FF8200]' };
      case 'fruits': return { title: 'Fruits', type: 'gallery' as const, items: CATEGORY_DATA.fruits, color: 'bg-[#FF4D4D]' };
      case 'vegetables': return { title: 'Vegetables', type: 'gallery' as const, items: CATEGORY_DATA.vegetables, color: 'bg-[#6B42C1]' };
      case 'colors': return { title: 'Colors', type: 'colors' as const, items: CATEGORY_DATA.colors, color: 'bg-[#F797B3]' };
      case 'shapes': return { title: 'Shapes', type: 'gallery' as const, items: CATEGORY_DATA.shapes, color: 'bg-[#FFD100]' };
      default: return null;
    }
  }, [activeChart]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const capsState = event.getModifierState("CapsLock");
    setIsCapsLock(capsState);

    const key = event.key.toUpperCase();
    
    if (key === 'ESCAPE') {
      if (selectedExample) {
        setSelectedExample(null);
        setModalContext(null);
      } else if (activeChart) {
        setActiveChart(null);
      } else {
        setCurrentItem(null);
      }
      return;
    }

    // Do not trigger letter switching if a modal is open
    if (selectedExample || activeChart) return;

    let foundItem: LearningItem | null = null;
    
    if (ALPHABET_DATA[key]) {
      foundItem = ALPHABET_DATA[key];
    } else if (NUMBER_DATA[key]) {
      foundItem = NUMBER_DATA[key];
    }

    if (foundItem) {
      setCurrentItem(foundItem);
      
      // Pronunciation Logic
      if (foundItem.type === 'letter') {
        const textToSpeak = capsState ? `Capital ${foundItem.key}` : foundItem.key.toLowerCase();
        speak(textToSpeak);
      } else {
        speak(foundItem.key);
      }
    }
  }, [selectedExample, activeChart]);

  useEffect(() => {
    const checkCaps = (e: KeyboardEvent) => setIsCapsLock(e.getModifierState("CapsLock"));
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', checkCaps);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', checkCaps);
    };
  }, [handleKeyPress]);

  const handleImageClick = (example: LearningExample) => {
    if (currentItem?.examples) {
      const idx = currentItem.examples.findIndex(e => e.word === example.word);
      setModalContext({
        items: currentItem.examples,
        currentIndex: idx >= 0 ? idx : 0
      });
    }
    setSelectedExample(example);
    speak(example.word);
  };

  const handleHeroClick = (e: React.MouseEvent) => {
    if (currentItem) {
      const caps = e.getModifierState("CapsLock");
      if (currentItem.type === 'letter') {
         speak(caps ? `Capital ${currentItem.key}` : currentItem.key.toLowerCase());
      } else {
         speak(currentItem.key);
      }
    }
  };

  const openChart = (type: typeof activeChart) => {
    setActiveChart(type);
  };

  const handleChartItemClick = (item: any) => {
    if (activeChart === 'alphabets' || activeChart === 'numbers') {
       // For letters/numbers, navigate to specific learning view
       setCurrentItem(item);
       setActiveChart(null);
       speak(item.key.toLowerCase());
    } else {
       // For categories, open the preview modal directly with category items context for arrow navigation
       const currentConfig = getChartConfig();
       if (currentConfig?.items) {
         const idx = currentConfig.items.findIndex(it => (it.word === item.word || it.key === item.key));
         setModalContext({
           items: currentConfig.items,
           currentIndex: idx >= 0 ? idx : 0
         });
       }
       setSelectedExample(item);
       speak(item.word);
    }
  };

  const handleModalPrev = () => {
    if (!modalContext || modalContext.currentIndex <= 0) return;
    const nextIdx = modalContext.currentIndex - 1;
    const nextItem = modalContext.items[nextIdx];
    setModalContext(prev => prev ? { ...prev, currentIndex: nextIdx } : null);
    setSelectedExample(nextItem);
    speak(nextItem.word);
  };

  const handleModalNext = () => {
    if (!modalContext || modalContext.currentIndex >= modalContext.items.length - 1) return;
    const nextIdx = modalContext.currentIndex + 1;
    const nextItem = modalContext.items[nextIdx];
    setModalContext(prev => prev ? { ...prev, currentIndex: nextIdx } : null);
    setSelectedExample(nextItem);
    speak(nextItem.word);
  };

  const handleCloseModal = () => {
    setSelectedExample(null);
    setModalContext(null);
  };

  const chartConfig = getChartConfig();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-6 px-4 md:p-8 bg-[#E9E6DD] overflow-x-hidden relative">
      
      {!currentItem && (
        <div className="fixed inset-0 pointer-events-none opacity-40">
           <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-[#FFD100] rounded-full blur-3xl" />
           <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-[#00AEEF] rounded-full blur-3xl" />
           <div className="absolute top-[60%] left-[15%] w-24 h-24 bg-[#00A35C] rounded-full blur-3xl" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!currentItem ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center mt-2 md:mt-8"
          >
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-tighter drop-shadow-sm">
                Kiddo<span className="text-[#00AEEF]">.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-extrabold leading-tight">
                Fun learning with photos, colors, and sounds!
              </p>
            </div>

            {/* Widget Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-10 max-w-5xl">
              
              {/* Alphabets Widget */}
              <HomeWidget 
                title="Alphabets" 
                subTitle="A to Z"
                onClick={() => openChart('alphabets')} 
                color="bg-[#00AEEF]"
                className="h-52"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3 pt-6">
                  <motion.div variants={itemVariants} custom={{i: 0, r: -12}} className="w-12 h-12 bg-[#FFD100] rounded-2xl shadow-md flex items-center justify-center text-2xl font-black text-white border-2 border-white/20">A</motion.div>
                  <motion.div variants={itemVariants} custom={{i: 1, r: 5}} className="w-14 h-14 bg-[#FF4D4D] rounded-2xl shadow-lg flex items-center justify-center text-3xl font-black text-white z-10 border-2 border-white/20 -mt-4">B</motion.div>
                  <motion.div variants={itemVariants} custom={{i: 2, r: -6}} className="w-12 h-12 bg-[#00AEEF] rounded-2xl shadow-md flex items-center justify-center text-2xl font-black text-white border-2 border-white/20">C</motion.div>
                </div>
              </HomeWidget>

              {/* Numbers Widget */}
              <HomeWidget 
                title="Numbers" 
                subTitle="1 to 100"
                onClick={() => openChart('numbers')} 
                color="bg-[#00A35C]"
                className="h-52"
              >
                 <div className="absolute inset-0 flex items-center justify-center gap-3 pt-6">
                   <motion.div variants={itemVariants} custom={{i: 0, r: 0}} className="w-12 h-12 bg-[#00A35C] rounded-full shadow-md flex items-center justify-center text-2xl font-black text-white">1</motion.div>
                   <motion.div variants={itemVariants} custom={{i: 1, r: 0}} className="w-14 h-14 bg-[#6B42C1] rounded-full shadow-lg flex items-center justify-center text-3xl font-black text-white z-10 -mt-4">2</motion.div>
                   <motion.div variants={itemVariants} custom={{i: 2, r: 0}} className="w-12 h-12 bg-[#FF8200] rounded-full shadow-md flex items-center justify-center text-2xl font-black text-white">3</motion.div>
                 </div>
              </HomeWidget>

              {/* Colors Widget */}
              <HomeWidget 
                title="Colors" 
                subTitle="Rainbow Palettes"
                onClick={() => openChart('colors')} 
                color="bg-[#F797B3]"
                className="h-52"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-3 pt-6">
                   <motion.div variants={itemVariants} custom={{i: 0, r: -12}} className="w-12 h-12 bg-[#FF4D4D] rounded-full shadow-md border-2 border-white/20" />
                   <motion.div variants={itemVariants} custom={{i: 1, r: 0}} className="w-14 h-14 bg-[#00AEEF] rounded-full shadow-lg z-10 -mt-4 border-2 border-white/20" />
                   <motion.div variants={itemVariants} custom={{i: 2, r: 12}} className="w-12 h-12 bg-[#FFD100] rounded-full shadow-md border-2 border-white/20" />
                </div>
              </HomeWidget>

              {/* Animals & Birds Widget */}
              <HomeWidget 
                title="Animals & Birds" 
                subTitle="Explore Nature"
                onClick={() => openChart('animals')} 
                color="bg-[#FF8200]"
                className="h-52"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-2 pt-6">
                  <motion.div variants={itemVariants} custom={{i: 0, r: -10}} className="text-5xl drop-shadow-md origin-bottom">🦁</motion.div>
                  <motion.div variants={itemVariants} custom={{i: 1, r: 0}} className="text-6xl drop-shadow-md origin-bottom -mt-6 z-10">🦚</motion.div>
                  <motion.div variants={itemVariants} custom={{i: 2, r: 10}} className="text-5xl drop-shadow-md origin-bottom">🦜</motion.div>
                </div>
              </HomeWidget>

              {/* Fruits Widget */}
              <HomeWidget 
                title="Fruits" 
                subTitle="Sweet & Fresh"
                onClick={() => openChart('fruits')} 
                color="bg-[#FF4D4D]"
                className="h-52"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-2 pt-6">
                  <motion.div variants={itemVariants} custom={{i: 0, r: -12}} className="text-5xl drop-shadow-md origin-bottom">🍎</motion.div>
                  <motion.div variants={itemVariants} custom={{i: 1, r: 0}} className="text-6xl drop-shadow-md origin-bottom -mt-6 z-10">🥭</motion.div>
                  <motion.div variants={itemVariants} custom={{i: 2, r: 12}} className="text-5xl drop-shadow-md origin-bottom">🍌</motion.div>
                </div>
              </HomeWidget>

              {/* Vegetables Widget */}
              <HomeWidget 
                title="Vegetables" 
                subTitle="Greens & Veggies"
                onClick={() => openChart('vegetables')} 
                color="bg-[#6B42C1]"
                className="h-52"
              >
                 <div className="absolute inset-0 flex items-center justify-center gap-2 pt-6">
                    <motion.div variants={itemVariants} custom={{i: 0, r: -12}} className="text-5xl drop-shadow-md origin-bottom">🥦</motion.div>
                    <motion.div variants={itemVariants} custom={{i: 1, r: 0}} className="text-6xl drop-shadow-md origin-bottom -mt-6 z-10">🍆</motion.div>
                    <motion.div variants={itemVariants} custom={{i: 2, r: 12}} className="text-5xl drop-shadow-md origin-bottom">🥕</motion.div>
                 </div>
              </HomeWidget>

              {/* Shapes Widget */}
              <HomeWidget 
                title="Shapes" 
                subTitle="Geometry"
                onClick={() => openChart('shapes')} 
                color="bg-[#FFD100]"
                className="h-52 sm:col-span-2 lg:col-span-3"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-6 pt-6">
                   <motion.div variants={itemVariants} custom={{i: 0, r: -10}} className="text-5xl drop-shadow-md origin-bottom">🔺</motion.div>
                   <motion.div variants={itemVariants} custom={{i: 1, r: 0}} className="text-6xl drop-shadow-md origin-bottom -mt-4 z-10">🟧</motion.div>
                   <motion.div variants={itemVariants} custom={{i: 2, r: 10}} className="text-5xl drop-shadow-md origin-bottom">🟣</motion.div>
                   <motion.div variants={itemVariants} custom={{i: 3, r: 0}} className="text-5xl drop-shadow-md origin-bottom">⭐</motion.div>
                </div>
              </HomeWidget>

            </div>
            
            <div className="mt-auto flex flex-col sm:flex-row items-center gap-3 text-slate-600 font-extrabold text-sm bg-white/50 px-6 py-3.5 rounded-2xl backdrop-blur-sm border border-white/60 shadow-sm mb-4">
               <div className="flex items-center gap-2">
                 <span className="font-black text-slate-800">Remote / Keys:</span>
                 <span className="bg-white px-2 py-0.5 rounded border border-slate-300 text-xs font-mono shadow-[0_2px_0_#cbd5e1]">Esc</span>
                 <span>to Back</span>
                 <span className="mx-1">•</span>
                 <span className="bg-white px-2 py-0.5 rounded border border-slate-300 text-xs font-mono shadow-[0_2px_0_#cbd5e1]">←</span>
                 <span className="bg-white px-2 py-0.5 rounded border border-slate-300 text-xs font-mono shadow-[0_2px_0_#cbd5e1]">→</span>
                 <span>to Browse</span>
               </div>
               <div className="hidden sm:block text-slate-300">|</div>
               <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 font-bold">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isCapsLock ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`} />
                  <span>{isCapsLock ? 'Caps Lock: ON' : 'Caps Lock: OFF'}</span>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentItem.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center z-10 w-full py-4 md:py-8 mt-2"
          >
            {/* Top Right Close Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              tabIndex={0}
              onClick={() => setCurrentItem(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white text-slate-400 rounded-full shadow-lg flex items-center justify-center hover:text-red-500 transition-colors border-2 border-[#F8FAFF] focus:outline-none focus:ring-4 focus:ring-red-400 z-50 cursor-pointer"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <div onClick={handleHeroClick} className="cursor-pointer active:scale-95 transition-transform">
              <HeroCard 
                content={currentItem.type === 'letter' && !isCapsLock ? currentItem.key.toLowerCase() : currentItem.key} 
                color={currentItem.color} 
              />
            </div>
            
            <ImageGrid 
              examples={currentItem.examples} 
              onImageClick={handleImageClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeChart && chartConfig && (
           <ChartModal 
             title={chartConfig.title}
             type={chartConfig.type}
             items={chartConfig.items}
             onClose={() => setActiveChart(null)}
             onItemClick={handleChartItemClick}
             color={chartConfig.color}
           />
        )}
        {selectedExample && (
          <PreviewModal 
            example={selectedExample} 
            onClose={handleCloseModal} 
            color={currentItem?.color || chartConfig?.color || 'bg-[#00AEEF]'}
            onPrev={handleModalPrev}
            onNext={handleModalNext}
            hasPrev={modalContext ? modalContext.currentIndex > 0 : false}
            hasNext={modalContext ? modalContext.currentIndex < modalContext.items.length - 1 : false}
            currentIndex={modalContext?.currentIndex}
            totalCount={modalContext?.items.length}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
