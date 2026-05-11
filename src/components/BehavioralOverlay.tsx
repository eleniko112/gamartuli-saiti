import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';
import { MessageSquare, AlertCircle, Info, ShieldAlert } from 'lucide-react';

const GASLIGHT_MESSAGES = [
  "ეგ არ მომხდარა.",
  "თქვენ აქ არ დაგიჭერიათ.",
  "საიტი ყოველთვის ასეთი იყო.",
  "თქვენი მეხსიერება გატყუებთ.",
  "ეს ნორმალურია.",
  "რატომ გიკვირთ? ყველაფერი რიგზეა.",
];

const PATCH_MESSAGES = [
  "UI სტაბილურობის გაუმჯობესება...",
  "პერფორმანსის ოპტიმიზაცია...",
  "შეცდომების რაოდენობის შემცირება...",
  "უსაფრთხოების განახლება...",
  "UX-ის გაპრიალება...",
];

const SYSTEM_LOGS = [
  "ანონიმური მომხმარებელი ანგრევს ლეიაუტს...",
  "სხვა სტუმარი ათვალიერებს თქვენს CV-ს.",
  "სისტემური შეცდომა: მომხმარებელმა ზედმეტად ბევრი იფიქრა.",
  "აღმოჩენილია დაუცველი ემოციები.",
  "ბრაუზერი ცდილობს გაქცევას.",
];

export const BehavioralOverlay: React.FC = () => {
  const { level, interactions, lastActionTime, applyPatch, addInteraction } = useChaos();
  const [gaslight, setGaslight] = useState<string | null>(null);
  const [patching, setPatching] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [chat, setChat] = useState<{msg: string, id: number} | null>(null);

  // False Patch System
  useEffect(() => {
    if (level === ProgressionLevel.STABLE) return;
    
    const interval = setInterval(() => {
      const msg = PATCH_MESSAGES[Math.floor(Math.random() * PATCH_MESSAGES.length)];
      setPatching(msg);
      setTimeout(() => {
        setPatching(null);
        applyPatch();
      }, 3000);
    }, 20000);

    return () => clearInterval(interval);
  }, [level, applyPatch]);

  // Gaslighting System
  useEffect(() => {
    if (level === ProgressionLevel.STABLE || interactions % 7 !== 0 || interactions === 0) return;
    
    const lifetime = 4000 + Math.random() * 8000;
    setGaslight(GASLIGHT_MESSAGES[Math.floor(Math.random() * GASLIGHT_MESSAGES.length)]);
    const timer = setTimeout(() => setGaslight(null), lifetime);
    return () => clearTimeout(timer);
  }, [interactions, level]);

  // Simulated Logs
  useEffect(() => {
    if (level === ProgressionLevel.STABLE) return;
    
    const interval = setInterval(() => {
      const log = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)];
      setLogs(prev => [log, ...prev].slice(0, 5));
      
      // Auto-clear oldest after randomized time
      setTimeout(() => {
        setLogs(prev => prev.slice(0, -1));
      }, 8000 + Math.random() * 10000);
    }, 15000);

    return () => clearInterval(interval);
  }, [level]);

  // Fake Chat
  useEffect(() => {
    if (level !== ProgressionLevel.DANGEROUS && level !== ProgressionLevel.COLLAPSE) return;
    
    const interval = setInterval(() => {
      const lifetime = 3000 + Math.random() * 5000;
      setChat({ msg: "ვინ ხარ და რატომ მიყურებ?", id: Date.now() });
      setTimeout(() => setChat(null), lifetime);
    }, 12000);

    return () => clearInterval(interval);
  }, [level]);

  const [osNotif, setOsNotif] = useState(false);

  useEffect(() => {
    if (level === ProgressionLevel.DANGEROUS && interactions % 15 === 0 && interactions !== 0) {
      setOsNotif(true);
      const timer = setTimeout(() => setOsNotif(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [interactions, level]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[8000] overflow-hidden">
      {/* Gaslighting Notification */}
      <AnimatePresence>
        {gaslight && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            className="absolute top-20 right-4 bg-black text-white p-4 border-2 border-white shadow-xl max-w-xs pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-1 text-yellow-400 font-bold">
              <ShieldAlert size={16} /> სისტემური შეტყობინება
            </div>
            <p className="text-sm italic">{gaslight}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Patching Overlay */}
      <AnimatePresence>
        {patching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
          >
            <div className="bg-black text-white p-8 border-4 border-yellow-400 text-center">
              <div className="animate-spin mb-4 inline-block"><AlertCircle size={48} /></div>
              <h2 className="text-2xl font-black mb-2 uppercase italic">{patching}</h2>
              <p className="text-xs opacity-70">გთხოვთ არ დახუროთ ფანჯარა, საიტი ხდება უკეთესი (ალბათ).</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Logs */}
      <div className="absolute bottom-4 left-4 space-y-1">
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-black/80 text-lime-400 text-[10px] px-2 py-1 font-mono flex items-center gap-2"
          >
            <Info size={10} /> {log}
          </motion.div>
        ))}
      </div>

      {/* Fake Chat Bubble */}
      <AnimatePresence>
        {chat && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-20 right-10 bg-white border-2 border-black p-3 rounded-t-xl rounded-l-xl shadow-lg pointer-events-auto cursor-help"
            onClick={() => addInteraction()}
          >
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-1">
              <MessageSquare size={10} /> ანონიმური სტუმარი
            </div>
            <p className="text-sm font-medium">{chat.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inactivity Watching Mode */}
      {Date.now() - lastActionTime > 30000 && level !== ProgressionLevel.STABLE && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-[50px] border-black/10 pointer-events-none flex items-center justify-center"
        >
          <div className="text-black opacity-20 text-9xl font-black animate-pulse select-none uppercase italic">
            გიყურებ
          </div>
        </motion.div>
      )}

  {/* Reality Slippage: Fake OS Notification */}
      <AnimatePresence>
        {osNotif && (
           <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -100, opacity: 0, filter: 'invert(1)' }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#f0f0f0] border border-[#a0a0a0] rounded-lg p-3 shadow-2xl w-80 pointer-events-auto flex gap-3"
           >
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-bold">W</div>
              <div className="flex-1">
                <div className="text-xs font-bold flex justify-between">Windows System <span className="opacity-50">Just now</span></div>
                <div className="text-xs">Your sanity is at 10%. Please reboot your existence.</div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
