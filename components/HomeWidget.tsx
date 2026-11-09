
import React from 'react';
import { motion } from 'framer-motion';

interface HomeWidgetProps {
  title: string;
  subTitle?: string;
  onClick: () => void;
  color: string; // Tailwind bg class for the decorative blob
  children: React.ReactNode;
  className?: string;
}

const widgetVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: { scale: 0.98 }
};

const HomeWidget: React.FC<HomeWidgetProps> = ({ title, subTitle, onClick, color, children, className = "" }) => {
  return (
    <motion.button
      variants={widgetVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      tabIndex={0}
      className={`relative bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden text-left flex flex-col border-4 border-transparent hover:border-slate-100 focus:border-[#00AEEF] focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/30 transition-all cursor-pointer group ${className}`}
    >
      {/* Title Section */}
      <div className="z-10 relative">
        <h3 className="text-2xl font-black text-slate-800 leading-none tracking-tight">{title}</h3>
        {subTitle && (
          <p className="text-slate-400 font-bold text-xs mt-1.5 uppercase tracking-wider">{subTitle}</p>
        )}
      </div>

      {/* Content Area for Collage */}
      <div className="flex-1 relative w-full mt-2">
        {children}
      </div>

      {/* Decorative Blur Blob */}
      <div className={`absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${color}`} />
    </motion.button>
  );
};

export default HomeWidget;
