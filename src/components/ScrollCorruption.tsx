import React, { useEffect } from 'react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

export const ScrollCorruption: React.FC = () => {
  const { patchesApplied, level } = useChaos();

  useEffect(() => {
    if (patchesApplied < 2 || level === ProgressionLevel.STABLE) return;

    let isCorrected = false;

    const handleWheel = (e: WheelEvent) => {
      if (isCorrected) return;
      // Probability of inversion increases with patches
      const threshold = 1 - (patchesApplied * 0.1);
      if (Math.random() > threshold) {
        window.scrollBy(0, -e.deltaY * 1.5);
        e.preventDefault();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isCorrected) return;
      const target = e.target as HTMLElement;
      const isNav = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('nav');

      if (isNav) {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            window.scrollBy({
              top: (Math.random() - 0.5) * 500,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Stuttering Correction Logic
    const correctionInterval = setInterval(() => {
      isCorrected = true;
      setTimeout(() => {
        isCorrected = false;
      }, 2000); // Correct for 2 seconds
    }, 15000); // Every 15 seconds

    const physicsGlitchInterval = setInterval(() => {
        if (!isCorrected && Math.random() > 0.7) {
            window.scrollBy({ 
              top: (Math.random() - 0.5) * 200, 
              behavior: 'smooth' 
            });
        }
    }, 4000);

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mouseover', handleMouseOver);
      clearInterval(correctionInterval);
      clearInterval(physicsGlitchInterval);
    };
  }, [patchesApplied, level]);

  return null;
};
