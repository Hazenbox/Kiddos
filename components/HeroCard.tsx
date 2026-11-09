import React from 'react';
import { motion } from 'framer-motion';

interface HeroCardProps {
  content: string;
  color: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ content, color }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0, opacity: 0, rotate: 10 }}
      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0], transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      tabIndex={0}
      className={`relative w-64 h-64 md:w-80 md:h-80 rounded-[3.5rem] ${color} shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center select-none border-[10px] border-white/20 overflow-hidden focus:outline-none focus:ring-4 focus:ring-white`}
    >
      {/* Main Content (Letter / Number) - Perfectly Centered */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-full h-full flex items-center justify-center text-center z-10 p-2"
      >
        <span className="text-white text-[9rem] sm:text-[10rem] md:text-[12rem] font-black leading-none drop-shadow-lg select-none text-center">
          {content}
        </span>
      </motion.div>

      {/* Shiny Reflection for 'plastic' toy look */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />
    </motion.div>
  );
};

export default HeroCard;
