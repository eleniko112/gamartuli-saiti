import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProgressionLevel, SiteState } from '../types';

interface ChaosContextType extends SiteState {
  addInteraction: (type?: 'cv' | 'nav' | 'general') => void;
  resetInteractions: () => void;
  applyPatch: () => void;
}

const ChaosContext = createContext<ChaosContextType | undefined>(undefined);

export const ChaosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SiteState>({
    interactions: 0,
    level: ProgressionLevel.STABLE,
    cvDownloads: 0,
    navAttempts: 0,
    lastActionTime: Date.now(),
    patchesApplied: 0
  });

  useEffect(() => {
    let newLevel = ProgressionLevel.STABLE;
    const totalWeight = state.interactions + (state.cvDownloads * 5) + (state.navAttempts * 2) + (state.patchesApplied * 10);

    if (totalWeight < 10) newLevel = ProgressionLevel.STABLE;
    else if (totalWeight < 30) newLevel = ProgressionLevel.SUSPICIOUS;
    else if (totalWeight < 60) newLevel = ProgressionLevel.UNSTABLE;
    else if (totalWeight < 120) newLevel = ProgressionLevel.DANGEROUS;
    else newLevel = ProgressionLevel.COLLAPSE;

    if (newLevel !== state.level) {
      setState(prev => ({ ...prev, level: newLevel }));
    }
  }, [state.interactions, state.cvDownloads, state.navAttempts, state.patchesApplied]);

  const addInteraction = useCallback((type: 'cv' | 'nav' | 'general' = 'general') => {
    setState(prev => ({
      ...prev,
      interactions: prev.interactions + 1,
      cvDownloads: type === 'cv' ? prev.cvDownloads + 1 : prev.cvDownloads,
      navAttempts: type === 'nav' ? prev.navAttempts + 1 : prev.navAttempts,
      lastActionTime: Date.now()
    }));
  }, []);

  const applyPatch = useCallback(() => {
    setState(prev => ({ ...prev, patchesApplied: prev.patchesApplied + 1 }));
  }, []);

  const resetInteractions = useCallback(() => {
    setState({
      interactions: 0,
      level: ProgressionLevel.STABLE,
      cvDownloads: 0,
      navAttempts: 0,
      lastActionTime: Date.now(),
      patchesApplied: 0
    });
  }, []);

  return (
    <ChaosContext.Provider value={{ ...state, addInteraction, resetInteractions, applyPatch }}>
      <div className={`min-h-screen ${state.level === ProgressionLevel.COLLAPSE ? 'jitter-medium' : ''}`}>
        {children}
      </div>
    </ChaosContext.Provider>
  );
};

export const useChaos = () => {
  const context = useContext(ChaosContext);
  if (!context) throw new Error('useChaos must be used within ChaosProvider');
  return context;
};
