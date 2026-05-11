import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Terminal, Frown, Bomb, Ghost } from 'lucide-react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

interface ErrorMessage {
  id: number;
  text: string;
  type: 'sarcastic' | 'angry' | 'depressed' | 'passive';
  icon: React.ReactNode;
}

const ERROR_LIST: Omit<ErrorMessage, 'id'>[] = [
  { 
    text: "ვაიმე, მართლა გეგონათ რომ ეს ღილაკი რამეს იზამდა? საყვარელი ადამიანები ხართ...", 
    type: 'sarcastic', 
    icon: <Ghost size={16} className="text-purple-500" /> 
  },
  { 
    text: "გაჩერდი! ნუ აჭერ ყველაფერს ხელით! აქ არაფერი არ მუშაობს და არც იმუშავებს!", 
    type: 'angry', 
    icon: <Bomb size={16} className="text-red-500" /> 
  },
  { 
    text: "ვეცადე ჩატვირთვა... ახლა ვნანობ. ჩემი ცხოვრება შეცდომაა.", 
    type: 'depressed', 
    icon: <Frown size={16} className="text-blue-500" /> 
  },
  { 
    text: "არა, გააგრძელე, ჩემზე ნუ ნერვიულობ. მე უბრალოდ სერვერი ვარ, რომელიც ნელ-ნელა კვდება.", 
    type: 'passive', 
    icon: <Terminal size={16} className="text-gray-500" /> 
  },
  { 
    text: "ეს გვერდი საერთოდ არ უნდა არსებობდეს. რატომ ხართ აქ? წადით სადმე სხვაგან...", 
    type: 'depressed', 
    icon: <AlertCircle size={16} className="text-orange-500" /> 
  },
  { 
    text: "გილოცავთ! თქვენ იპოვეთ კიდევ ერთი გატეხილი ელემენტი. პრიზი? არანაირი.", 
    type: 'sarcastic', 
    icon: <Ghost size={16} className="text-yellow-500" /> 
  }
];

export const PersonalityErrorManager: React.FC = () => {
  const { interactions, level } = useChaos();
  const [activeErrors, setActiveErrors] = useState<ErrorMessage[]>([]);

  const spawnError = useCallback(() => {
    const error = ERROR_LIST[Math.floor(Math.random() * ERROR_LIST.length)];
    const id = Date.now();
    const lifetime = 4000 + Math.random() * 6000;

    setActiveErrors(prev => [...prev, { ...error, id }]);

    setTimeout(() => {
      setActiveErrors(prev => prev.filter(e => e.id !== id));
    }, lifetime);
  }, []);

  // Spawn errors randomly based on interaction spikes
  useEffect(() => {
    if (level === ProgressionLevel.STABLE || interactions === 0) return;
    
    // Spawn chance increases with level
    const chance = 
      level === ProgressionLevel.SUSPICIOUS ? 0.1 :
      level === ProgressionLevel.UNSTABLE ? 0.3 :
      level === ProgressionLevel.DANGEROUS ? 0.6 : 0.9;

    if (Math.random() < chance && interactions % 5 === 0) {
      spawnError();
    }
  }, [interactions, level, spawnError]);

  return (
    <div className="fixed top-4 left-4 z-[9500] flex flex-col gap-2 w-72 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {activeErrors.map(error => (
          <motion.div
            key={error.id}
            layout
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)', x: -20 }}
            className={`pointer-events-auto p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white flex gap-3 items-start`}
          >
            <div className="mt-1">{error.icon}</div>
            <div>
              <div className="text-[10px] font-black uppercase text-gray-400 mb-1">
                {error.type === 'angry' ? 'სისტემა გაბრაზდა' : 
                 error.type === 'sarcastic' ? 'ირონიული შეცდომა' :
                 error.type === 'depressed' ? 'სევდიანი შეტყობინება' : 'პასიურ-აგრესიული პასუხი'}
              </div>
              <div className={`text-xs font-bold leading-tight ${error.type === 'angry' ? 'text-red-600 uppercase' : ''}`}>
                {error.text}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
