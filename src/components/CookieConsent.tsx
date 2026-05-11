import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

export const CookieConsent: React.FC = () => {
  const { level, addInteraction } = useChaos();
  const [show, setShow] = useState(true);
  const [position, setPosition] = useState({ bottom: 20, left: 20 });

  const handleDecline = () => {
    addInteraction();
    // Jumping around logic
    if (level !== ProgressionLevel.STABLE) {
      setPosition({
        bottom: Math.random() * (window.innerHeight - 200),
        left: Math.random() * (window.innerWidth - 300)
      });
    }
  };

  const handleAccept = () => {
    addInteraction();
    if (level === ProgressionLevel.STABLE) {
      setShow(false);
    } else {
      // Fake accept that just spawns more or changes text
      alert('მადლობა! ახლა ჩვენ გვაქვს წვდომა თქვენს მაცივარზეც.');
      if (level === ProgressionLevel.DANGEROUS || level === ProgressionLevel.COLLAPSE) {
         // spawn a new one later?
      } else {
        setShow(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          layout
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, ...position, position: 'fixed' }}
          className="z-[99999] bg-white border-4 border-black p-6 w-80 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🍪</span>
            <h3 className="font-bold text-lg">ქუქი-ფაილები!</h3>
          </div>
          <p className="text-xs mb-6">
            ჩვენ ვიყენებთ ქუქიებს, რომ თვალყური ვადევნოთ თქვენს თვალის დახამხამებას და გავყიდოთ თქვენი მონაცემები ეგვიპტელ ფარაონებს.
          </p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={handleAccept}
              className="bg-green-500 border-2 border-black py-2 font-bold hover:bg-green-400"
            >
              ვეთანხმები ყველაფერს!
            </button>
            <button 
              onMouseEnter={handleDecline}
              onClick={handleDecline}
              className="border-2 border-black py-2 font-bold hover:bg-gray-100"
            >
              უარყოფა (არ იმუშავებს)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
