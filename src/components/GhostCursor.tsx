import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

export const GhostCursor: React.FC = () => {
  const { level } = useChaos();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (level === ProgressionLevel.STABLE || level === ProgressionLevel.SUSPICIOUS) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100000]">
      {/* Laggy Cursor */}
      <motion.div
        animate={{ x: mousePos.x + 20, y: mousePos.y + 20 }}
        transition={{ type: 'spring', damping: 10, stiffness: 50 }}
        className="absolute"
      >
        <div className="w-4 h-4 bg-red-500 rounded-full opacity-50 border border-black" />
        <span className="text-[10px] bg-black text-white px-1">GHOST_USER_666</span>
      </motion.div>

      {/* Dangerous/Collapse Multi-Cursors */}
      {(level === ProgressionLevel.DANGEROUS || level === ProgressionLevel.COLLAPSE) && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: mousePos.x, y: mousePos.y }}
          animate={{ 
            x: [
              mousePos.x, 
              mousePos.x + (Math.random() - 0.5) * 600, 
              mousePos.x + (Math.random() - 0.5) * 600,
              mousePos.x
            ], 
            y: [
              mousePos.y, 
              mousePos.y + (Math.random() - 0.5) * 600, 
              mousePos.y + (Math.random() - 0.5) * 600,
              mousePos.y
            ],
            scale: [1, 1.5, 0.5, 1],
            rotate: [0, 180, -180, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute"
        >
          <div className="w-4 h-4 bg-black opacity-40" style={{ clipPath: 'polygon(0 0, 0% 100%, 100% 70%)' }} />
        </motion.div>
      ))}
    </div>
  );
};
