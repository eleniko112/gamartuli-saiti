import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

interface RunningButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  intensity?: number;
}

export const RunningButton: React.FC<RunningButtonProps> = ({ children, onClick, className, intensity = 150 }) => {
  const { level, addInteraction } = useChaos();
  const controls = useAnimationControls();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (level === ProgressionLevel.STABLE) return;

    const multiplier = 
      level === ProgressionLevel.SUSPICIOUS ? 0.5 :
      level === ProgressionLevel.UNSTABLE ? 1 :
      level === ProgressionLevel.DANGEROUS ? 2 : 4;

    const newX = (Math.random() - 0.5) * intensity * multiplier;
    const newY = (Math.random() - 0.5) * intensity * multiplier;

    controls.start({
      x: newX,
      y: newY,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
    
    addInteraction();
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={controls}
      onMouseEnter={handleMouseEnter}
      onClick={() => {
        addInteraction();
        onClick?.();
      }}
      className={`px-4 py-2 bg-blue-600 text-white border-2 border-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${className}`}
    >
      {children}
    </motion.button>
  );
};
