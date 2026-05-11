import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';
import { Zap, Cpu, Activity, ShieldCheck } from 'lucide-react';

const OPTIMIZATIONS = [
  { name: "ანიმაციების გამორთვა საიმედოობისთვის", effect: "disable-animations" },
  { name: "ფონტების გამარტივება სისწრაფისთვის", effect: "mono-only" },
  { name: "სურათების ამოშლა მეხსიერების დასაზოგად", effect: "no-images" },
  { name: "ინტერაქციის ლიმიტირება CPU-სთვის", effect: "input-lag" },
  { name: "ფერების შემცირება ენერგოეფექტურობისთვის", effect: "grayscale-mode" },
];

export const PerformanceSaboteur: React.FC = () => {
  const { patchesApplied, level } = useChaos();
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  const [currentTip, setCurrentTip] = useState<string | null>(null);

  useEffect(() => {
    if (patchesApplied === 0 || level === ProgressionLevel.STABLE) return;

    // Apply a new "optimization" every few patches or randomly
    const count = Math.min(patchesApplied, OPTIMIZATIONS.length);
    const newEffects = OPTIMIZATIONS.slice(0, count).map(o => o.effect);
    
    if (newEffects.length > activeEffects.length) {
      const latest = OPTIMIZATIONS[newEffects.length - 1];
      setCurrentTip(`ოპტიმიზაცია: ${latest.name}`);
      setTimeout(() => setCurrentTip(null), 5000);
    }
    
    setActiveEffects(newEffects);
  }, [patchesApplied, level]);

  useEffect(() => {
    // Apply global classes to body based on effects
    const body = document.body;
    if (activeEffects.includes('mono-only')) body.classList.add('font-mono-enforced');
    else body.classList.remove('font-mono-enforced');

    if (activeEffects.includes('no-images')) body.classList.add('no-images-enforced');
    else body.classList.remove('no-images-enforced');

    if (activeEffects.includes('grayscale-mode')) body.classList.add('grayscale-enforced');
    else body.classList.remove('grayscale-enforced');

    if (activeEffects.includes('disable-animations')) body.classList.add('no-animations-enforced');
    else body.classList.remove('no-animations-enforced');

    return () => {
      body.classList.remove('font-mono-enforced', 'no-images-enforced', 'grayscale-enforced', 'no-animations-enforced');
    };
  }, [activeEffects]);

  return (
    <>
      <AnimatePresence>
        {currentTip && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[9999] bg-lime-500 text-black px-6 py-3 border-4 border-black font-black flex items-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto"
          >
            <Zap className="animate-pulse" />
            <div className="uppercase italic text-sm">{currentTip}</div>
            <ShieldCheck size={20} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-2 right-2 text-[8px] font-mono text-gray-400 pointer-events-none z-[10000] flex flex-col items-end">
        {activeEffects.map((eff, i) => (
          <div key={i} className="flex items-center gap-1">
            <Activity size={8} /> OPTIMIZED: {eff.toUpperCase()}
          </div>
        ))}
        {activeEffects.length > 0 && (
          <div className="mt-1 text-lime-500 font-bold flex items-center gap-1">
            <Cpu size={8} /> სისტემა ოპტიმიზებულია {activeEffects.length * 20}%-ით
          </div>
        )}
      </div>
    </>
  );
};
