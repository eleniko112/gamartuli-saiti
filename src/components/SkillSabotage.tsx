import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useChaos } from './ChaosProvider';
import { ProgressionLevel } from '../types';

const INITIAL_SKILLS = [
  { name: 'React', value: 95 },
  { name: 'TypeScript', value: 90 },
  { name: 'Node.js', value: 85 },
  { name: 'Tailwind CSS', value: 100 },
  { name: 'Python', value: 80 },
];

const WEIRD_NAMES = [
  'React (ემოციური დამოკიდებულება)',
  'CSS (გატეხილი მაგრამ ლამაზი)',
  'JavaScript (ჯადოქრობა)',
  'Node.js (სერვერის ტირილი)',
  'TypeScript (შეცდომების კოლექცია)',
  'HTML (ალბათ)',
  'UI/UX (წამება)',
];

export const SkillSabotage: React.FC = () => {
  const { level, addInteraction } = useChaos();
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  useEffect(() => {
    if (level === ProgressionLevel.STABLE) return;

    const interval = setInterval(() => {
      setSkills(prev => prev.map(skill => {
        const valueChange = (Math.random() - 0.5) * 10;
        let newName = skill.name;
        
        if (level !== ProgressionLevel.SUSPICIOUS && Math.random() > 0.8) {
          newName = WEIRD_NAMES[Math.floor(Math.random() * WEIRD_NAMES.length)];
        }

        return {
          ...skill,
          name: newName,
          value: Math.max(0, Math.min(100, skill.value + valueChange))
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [level]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="border-2 border-black p-3 bg-black/10 hover:bg-black/20 transition-colors"
          onMouseEnter={addInteraction}
        >
          <div className="flex justify-between mb-1">
            <span className="font-bold text-xs uppercase">{skill.name}</span>
            <span className="font-mono text-[10px]">{Math.round(skill.value)}%</span>
          </div>
          <div className="w-full bg-black/20 h-3 border border-black overflow-hidden relative">
            <motion.div 
              className={`h-full border-r border-black ${skill.value > 80 ? 'bg-yellow-400' : skill.value > 50 ? 'bg-blue-400' : 'bg-red-400'}`}
              animate={{ width: `${skill.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
