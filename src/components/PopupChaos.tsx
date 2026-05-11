import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

const FAKE_ADS = [
  { id: 1, title: "მოიგეთ iPhone 99!", content: "თქვენ ხართ მე-1,000,000 მნახველი!", icon: <Zap className="text-yellow-400" /> },
  { id: 2, title: "თქვენი კომპიუტერი დავირუსებულია!", content: "სასწრაფოდ ჩამოტვირთეთ ანტივირუსი!", icon: <AlertTriangle className="text-red-500" /> },
  { id: 3, title: "გსურთ 1000 ლარი დღეში?", content: "დააჭირეთ აქ და დაიწყეთ ფულის შოვნა!", icon: <ShieldCheck className="text-green-500" /> },
  { id: 4, title: "უფასო ვებინარი", content: "როგორ გავხდეთ მილიონერი ძილში?", icon: <Zap className="text-blue-400" /> },
];

export const PopupChaos: React.FC = () => {
  const { level, addInteraction } = useChaos();
  const [popups, setPopups] = useState<any[]>([]);

  useEffect(() => {
    if (level === ProgressionLevel.STABLE) return;

    const intervalTime = 
      level === ProgressionLevel.SUSPICIOUS ? 8000 :
      level === ProgressionLevel.UNSTABLE ? 4000 :
      level === ProgressionLevel.DANGEROUS ? 1500 : 800;

    const interval = setInterval(() => {
      const randomAd = FAKE_ADS[Math.floor(Math.random() * FAKE_ADS.length)];
      const instanceId = Date.now();
      const lifetime = 3000 + Math.random() * 27000; // 3-30 seconds

      setPopups(prev => [...prev, { 
        ...randomAd, 
        instanceId,
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 200)
      }]);

      // Auto-disappear
      setTimeout(() => {
        setPopups(prev => prev.filter(p => p.instanceId !== instanceId));
      }, lifetime);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [level]);

  const closePopup = (id: number) => {
    addInteraction();
    // Sometimes don't close perfectly
    if (level !== ProgressionLevel.COLLAPSE && Math.random() > 0.3) {
      setPopups(prev => prev.filter(p => p.instanceId !== id));
    } else {
      // Spawn fresh ones on close!
      const randomAd = FAKE_ADS[Math.floor(Math.random() * FAKE_ADS.length)];
      setPopups(prev => [...prev, { 
        ...randomAd, 
        instanceId: Date.now() + 1,
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 200)
      }]);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.instanceId}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ 
              position: 'absolute', 
              left: popup.x, 
              top: popup.y,
              width: 280,
            }}
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 pointer-events-auto cursor-pointer select-none overflow-hidden"
          >
            <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-2 bg-blue-100 -mx-4 -mt-4 px-4 py-1">
              <span className="font-bold flex items-center gap-2 text-xs truncate">
                {popup.icon} {popup.title}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closePopup(popup.instanceId);
                }}
                className="hover:bg-red-500 hover:text-white transition-colors p-0.5"
              >
                <X size={16} />
              </button>
            </div>
            <div className="text-sm font-medium">
              {popup.content}
            </div>
            <button className="mt-4 w-full py-2 bg-yellow-400 border-2 border-black font-bold uppercase text-xs hover:bg-yellow-300">
              დააჭირე აქ!
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
