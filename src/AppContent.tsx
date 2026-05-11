import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Download, 
  Flame, 
  AlertCircle,
  Menu,
  X,
  RefreshCw
} from 'lucide-react';
import { useChaos } from './components/ChaosProvider';
import { ProgressionLevel } from './types';
import { RunningButton } from './components/RunningButton';
import { PopupChaos } from './components/PopupChaos';
import { InfiniteLoader } from './components/InfiniteLoader';
import { SkillSabotage } from './components/SkillSabotage';
import { ContactSabotage } from './components/ContactSabotage';
import { CookieConsent } from './components/CookieConsent';
import { GhostCursor } from './components/GhostCursor';
import { ScrollCorruption } from './components/ScrollCorruption';
import { BehavioralOverlay } from './components/BehavioralOverlay';
import { PersonalityErrorManager } from './components/PersonalityErrorManager';
import { PerformanceSaboteur } from './components/PerformanceSaboteur';

const AppContent: React.FC = () => {
  const { interactions, level, addInteraction, resetInteractions } = useChaos();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Progressive styles based on levels
  const levelText = {
    [ProgressionLevel.STABLE]: 'იდეალური (თითქოს)',
    [ProgressionLevel.SUSPICIOUS]: 'ოდნავ საეჭვო...',
    [ProgressionLevel.UNSTABLE]: 'არა, რაღაც ხდება',
    [ProgressionLevel.DANGEROUS]: 'საშიში პორტფოლიო',
    [ProgressionLevel.COLLAPSE]: 'გაიქეცით!!!'
  }[level];

  const levelColor = {
    [ProgressionLevel.STABLE]: 'text-green-600',
    [ProgressionLevel.SUSPICIOUS]: 'text-yellow-600',
    [ProgressionLevel.UNSTABLE]: 'text-orange-600',
    [ProgressionLevel.DANGEROUS]: 'text-red-600',
    [ProgressionLevel.COLLAPSE]: 'text-purple-600 animate-pulse'
  }[level];

  const handleHostileNav = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    addInteraction('nav');

    if (level === ProgressionLevel.STABLE) {
      // Normal behavior (mostly)
      return;
    }

    const chaosActions = [
      () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      () => setIsLoaderOpen(true),
      () => alert('ნავიგაცია დაბლოკილია თქვენივე უსაფრთხოებისთვის.'),
      () => {
        const body = document.body;
        body.style.transform = `rotate(${Math.random() * 2 - 1}deg)`;
      },
      () => console.log('You clicked ' + target + ' but I decided to do nothing.'),
    ];

    // Probability of sabotage increases with level
    const sabotageChance = 
      level === ProgressionLevel.SUSPICIOUS ? 0.2 :
      level === ProgressionLevel.UNSTABLE ? 0.5 :
      level === ProgressionLevel.DANGEROUS ? 0.8 : 1;

    if (Math.random() < sabotageChance) {
      const action = chaosActions[Math.floor(Math.random() * chaosActions.length)];
      action();
    }
  };

  return (
    <div className={`selection:bg-yellow-400 selection:text-black ${level === ProgressionLevel.COLLAPSE ? 'invert grayscale' : ''}`}>
      <ScrollCorruption />
      <PerformanceSaboteur />
      <PersonalityErrorManager />
      <GhostCursor />
      <BehavioralOverlay />
      <PopupChaos />
      <CookieConsent />
      <InfiniteLoader isOpen={isLoaderOpen} onClose={() => setIsLoaderOpen(false)} />

      <div className="bento-container p-4 md:p-12">
        {/* Hostile Header */}
        <header className="absolute top-0 left-4 md:left-20 bg-black text-white p-6 rotate-[-2deg] z-50 border-4 border-yellow-400 max-w-xs md:max-w-none">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-yellow-300">
                {level === ProgressionLevel.COLLAPSE ? '⚠️ Error_404' : 'ყველაზე ცუდი პორტფოლიო'}
              </h1>
              <p className="text-xs mt-2 uppercase font-mono">
                UX ბიუჯეტი: -12$ | {levelText}
              </p>
            </div>
            <nav className="flex gap-4 text-[10px] font-bold uppercase underline">
              <a href="#" onClick={(e) => handleHostileNav(e, 'Home')}>მთავარი</a>
              <a href="#" onClick={(e) => handleHostileNav(e, 'Skills')}>უნარები</a>
              <a href="#" onClick={(e) => handleHostileNav(e, 'Projects')}>პროექტები</a>
            </nav>
            <button 
              className="md:hidden text-yellow-300" 
              onClick={() => { addInteraction('nav'); setIsMobileMenuOpen(!isMobileMenuOpen); }}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-white pt-20 p-8 flex flex-col gap-8 text-3xl font-black uppercase italic border-[20px] border-double border-red-600">
            <a href="#" onClick={(e) => { setIsMobileMenuOpen(false); handleHostileNav(e, 'Mobile-Nav-1'); }}>სად მიდიხარ?</a>
            <a href="#" onClick={(e) => { setIsMobileMenuOpen(false); handleHostileNav(e, 'Mobile-Nav-2'); }}>აქ არაფერია</a>
            <a href="#" onClick={(e) => { setIsMobileMenuOpen(false); handleHostileNav(e, 'Mobile-Nav-3'); }}>უკან დაბრუნდი</a>
            <button 
              onClick={() => { addInteraction(); setIsMobileMenuOpen(false); }}
              className="text-left text-red-500 underline"
            >
              დახურვა
            </button>
          </div>
        )}

        {/* Bento Grid Layout */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-48 md:pt-40">
          
          {/* Profile Card */}
          <div className="md:col-span-4 bento-card rotate-[1deg]">
            <div className="w-32 h-32 bg-gray-300 border-4 border-dashed border-red-500 mb-4 flex items-center justify-center text-red-500 text-center text-xs rotate-[-15deg] overflow-hidden">
               {level === ProgressionLevel.STABLE ? (
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=chaos" alt="Profile" className="w-full h-full object-cover" />
               ) : (
                <>სურათი<br/>დაიკარგა</>
               )}
            </div>
            <h2 className="text-2xl font-bold underline decoration-wavy decoration-blue-500">
              {level === ProgressionLevel.STABLE ? 'გიორგი - "დეველოპერი"' : 
               level === ProgressionLevel.SUSPICIOUS ? 'გიორგი - "დეველოპერი?"' :
               level === ProgressionLevel.UNSTABLE ? 'ვიღაც - "დეველოპერი (ალბათ)"' :
               level === ProgressionLevel.DANGEROUS ? 'შეცდომა - "უფრო დიზაინერი"' :
               'კოლაფსი - "არავინ"'}
            </h2>
            <div className="mt-2 flex flex-wrap gap-1">
               <span className={`text-[8px] border border-black px-1 ${interactions > 50 ? 'line-through opacity-30 text-red-500' : ''}`}>🥇 საუკეთესო კოდერი</span>
               {interactions > 30 && <span className="text-[8px] border border-black px-1 bg-yellow-400">🏅 პროფესიონალი გამტეხი</span>}
               {interactions > 70 && <span className="text-[8px] border border-black px-1 bg-red-500 text-white animate-pulse">💀 სისტემის მტერი</span>}
               {level === ProgressionLevel.COLLAPSE && <span className="text-[8px] border border-black px-1 italic">"თქვენ გააფუჭეთ ყველაფერი"</span>}
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-tight italic">
              "მე ვქმნი საიტებს, რომლებიც გაიძულებენ ტირილს. ჩემი კოდი არ მუშაობს, მაგრამ ლამაზად იწვის."
            </p>
            <div className="absolute bottom-2 right-2 bg-pink-500 text-white px-2 py-1 text-[10px] animate-pulse">ცოცხალია?</div>
            
            <div className="mt-6 flex flex-col gap-2">
              <RunningButton 
                intensity={80}
                className="bg-black text-white py-3 font-bold border-2 border-black"
                onClick={() => { setIsLoaderOpen(true); addInteraction('cv'); }}
              >
                <Download size={16} className="inline mr-2" /> CV (99%)
              </RunningButton>
            </div>
          </div>

          {/* Skills Sabotage Card */}
          <div className="md:col-span-5 bento-card bg-[#ff00ff] text-white rotate-[-1deg]">
            <h3 className="text-xl font-mono uppercase bg-black px-2 inline-block mb-4">უნარები (არასტაბილური)</h3>
            <SkillSabotage />
          </div>

          {/* Stats / Random Card */}
          <div className="md:col-span-3 bento-card bg-blue-600 text-white rotate-[3deg] flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mb-4 animate-spin"></div>
             <div className="text-4xl font-black mb-2">{interactions}</div>
             <div className="text-xs uppercase font-bold tracking-widest">ინტერაქცია</div>
             <p className="mt-4 text-[10px] opacity-70">სისტემა ცდილობს გადარჩენას...</p>
          </div>

          {/* Projects Card */}
          <div className="md:col-span-7 bento-card rotate-[-0.5deg]">
            <h3 className="text-2xl font-black italic mb-6 border-b-4 border-black inline-block">პროექტები (შეცდომებით)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`border-2 border-black p-4 bg-gray-50 flex flex-col gap-2 ${i === 1 ? '-rotate-2' : i === 2 ? 'rotate-3 bg-yellow-100' : '-rotate-1 transition-transform translate-y-2'}`}
                  onMouseEnter={addInteraction}
                >
                  <div className="font-bold flex justify-between items-center text-xs">
                    პროექტი #{i}
                    <AlertCircle size={14} className="text-red-500" />
                  </div>
                  <div className="text-[10px] italic">"ეს პროექტი მხოლოდ ჩემს თავში არსებობს."</div>
                  <button 
                    className="mt-2 text-[10px] font-bold text-blue-600 underline text-left"
                    onClick={() => {
                        addInteraction();
                        const MESSAGES = [
                          'ბმული გატეხილია (ისე როგორც ჩემი იმედები).',
                          'ეს პროექტი მხოლოდ ჩემს თავში არსებობს. რატომ გინდათ ნახვა?',
                          '404: დეველოპერი წავიდა დასაძინებლად და არ დაბრუნებულა.',
                          'ეს ბმული დაწყევლილია.',
                        ];
                        alert(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
                    }}
                  >
                    LIVE_DEMO.exe
                  </button>
                </div>
              ))}
            </div>

            {/* Overlapping Error Element */}
            {level !== ProgressionLevel.STABLE && (
              <div className="absolute -bottom-10 -right-4 md:-right-10 w-48 h-48 bg-red-600 border-4 border-black p-4 text-white rotate-12 z-20 shadow-2xl">
                <p className="text-4xl font-black opacity-30">ERROR</p>
                <p className="text-[10px] leading-none mt-2 uppercase font-mono">
                  სისტემური ხარვეზი. გთხოვთ შეწყვიტოთ დაწკაპუნება. ჩვენ დავკარგეთ დიზაინის ფაილი სადღაც...
                </p>
              </div>
            )}
          </div>

          {/* GitHub / Logs Card */}
          <div className="md:col-span-5 bento-card bg-black text-lime-400 font-mono text-[10px] h-[300px] overflow-hidden">
            <div className="mb-2 border-b border-lime-900 pb-1">root@worst-portfolio:~$ stats --chaos</div>
            <div>Commits: -{interactions * 12}</div>
            <div>Issues: 9,999,999+</div>
            <div>Stress Level: <span className={levelColor}>{levelText}</span></div>
            <div className="mt-4 opacity-50 space-y-1">
              <div>######################</div>
              <div className="font-bold text-red-500"># CRITICAL UI ERROR #</div>
              <div>######################</div>
              <div>[FAILED] layout.render()</div>
              <div>[FAILED] user.experience()</div>
              <div>[FAILED] developer.sanity()</div>
              <div>[SYSTEM] Reverting to 1995 UI...</div>
              <div>[ERROR] Rollback failed. Good luck.</div>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>0x{Math.random().toString(16).slice(2, 10).toUpperCase()} ERROR_STACK_OVERFLOW</div>
              ))}
            </div>
          </div>

          {/* Contact Card */}
          <div className="md:col-span-12 bento-card bg-orange-500 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
               <div className="text-white">
                  <h3 className="text-4xl font-black italic uppercase underline decoration-4 decoration-black">კონტაქტი</h3>
                  <p className="mt-4 font-bold text-black uppercase text-xs">გამომიჭირე თუ შეგიძლია!</p>
                  <div className="mt-8 flex gap-4">
                    <RunningButton intensity={40} className="p-3 bg-black text-white"><Github /></RunningButton>
                    <RunningButton intensity={40} className="p-3 bg-black text-white"><Linkedin /></RunningButton>
                    <RunningButton intensity={40} className="p-3 bg-black text-white"><Twitter /></RunningButton>
                  </div>
               </div>
               <div className="relative">
                  <ContactSabotage />
                  {level === ProgressionLevel.COLLAPSE && (
                    <div className="absolute inset-0 bg-red-600 text-white flex items-center justify-center p-8 text-center font-black rotate-[-5deg] z-10 border-4 border-black">
                      კონტაქტი შეუძლებელია. სერვერმა თავი მოიკლა.
                    </div>
                  )}
               </div>
            </div>
          </div>

        </main>

        <footer className="mt-auto p-12 text-center relative z-10">
          <p className="font-bold mb-4 font-mono text-black">© 2026 ყოფილი დეველოპერი.</p>
          <button 
            onClick={resetInteractions}
            className="text-xs underline hover:text-red-500 uppercase font-bold text-black"
          >
            UI-ის გადატვირთვა (თუ გაბედავ)
          </button>
          
          {level === ProgressionLevel.COLLAPSE && (
            <div className="mt-8 p-6 border-4 border-red-500 bg-red-50 text-red-500 font-black animate-pulse flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-4 text-xl">
                <AlertCircle size={32} /> სისტემა კოლაფსირდა. <AlertCircle size={32} />
              </div>
              <div className="text-xs border-t-2 border-red-500 pt-4 italic max-w-md">
                "ეს პორტფოლიო განზრახ არის გაფუჭებული. თქვენ გამოცადეთ UX ისე, როგორც ჩაფიქრებული იყო. ყველაზე ცუდი ისაა, რომ ყველაფერი გეგმის მიხედვით მუშაობს. გმადლობთ წამებისთვის."
              </div>
            </div>
          )}
        </footer>

        {/* Decorative Random Text */}
        <div className="absolute top-[70%] left-[20%] text-9xl font-black text-black opacity-5 -z-10 select-none pointer-events-none">
          UX ERROR
        </div>
      </div>
    </div>
  );
};

export default AppContent;
