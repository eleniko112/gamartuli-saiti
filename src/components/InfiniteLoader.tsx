import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

export const InfiniteLoader: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0);
  const { level, addInteraction } = useChaos();

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          // Reset slightly at high progress
          return prev - Math.random() * 2;
        }
        // Progress slows down exponentially
        const increment = (100 - prev) / 50;
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  const MESSAGES = [
    "ფაილების მომზადება... იმედია ვინმეს აინტერესებს.",
    "გთხოვთ მოითმენთ, ხდება პორტფოლიოს მონაცემების გენერირება. მეც დავიღალე.",
    "HR-ის ინფორმირება... ის მაინც არ დაგირეკავთ.",
    "რატომ გინდათ ჩემი ჩამოტვირთვა? ისედაც ბევრი მაქვს საქმე.",
    "მონაცემები გაიჭედა. ალბათ თქვენი ბრალია.",
  ];

  const [message, setMessage] = useState(MESSAGES[0]);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black p-8 max-w-md w-full shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
        <h2 className="text-2xl font-bold mb-4 font-serif">
          {level === ProgressionLevel.COLLAPSE ? '🗑️ გთხოვთ წადით' : 'ფაილების მომზადება...'}
        </h2>
        <p className="mb-6 text-sm italic">{message}</p>
        
        <div className="w-full bg-gray-200 h-8 border-2 border-black overflow-hidden relative">
          <motion.div 
            className="h-full bg-green-500 border-r-2 border-black"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold mix-blend-difference text-white">
            {progress.toFixed(1)}%
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={() => {
              addInteraction();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white border-2 border-black font-bold uppercase text-xs hover:bg-red-600"
          >
            გაუქმება
          </button>
        </div>
      </div>
    </div>
  );
};
