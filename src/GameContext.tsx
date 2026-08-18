"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, FileCode2, Code2, Trophy } from 'lucide-react';
import { getPlayerFromMongo, savePlayerToMongo } from './lib/playerApi';

export interface GameState {
  playerName: string;
  playerTrack: string;
  currentXP: number;
  playerLevel: number;
  completedMissions: string[];
  currentStreak: number;
  triggerLevelUpModal: boolean;
  unlockedBadges: string[];
  playerTokens: number;
}

interface XpIndicator {
  id: string;
  amount: number;
}

interface ActiveBadgeNotification {
  id: string;
  badgeName: string;
  iconName: string;
  rewardXP: number;
}

interface GameContextProps extends GameState {
  setPlayerProfile: (name: string, track: string) => void;
  addXP: (amount: number) => void;
  completeMission: (missionId: string, penaltyApplied: boolean, hintCount?: number) => void;
  levelUp: () => void;
  dismissLevelUpModal: () => void;
  resetGame: () => void;
  addTokens: (amount: number) => void;
  spendTokens: (amount: number) => boolean;
  syncWithMongoDB: (supabaseId: string) => Promise<void>;
}

export interface SaveData {
  playerName: string;
  playerTrack: string;
  currentXP: number;
  playerLevel: number;
  completedMissions: string[];
  currentStreak: number;
  unlockedBadges: string[];
  playerTokens: number;
}

const SAVE_KEY = 'SYNTAX_KNIGHT_SAVE_V1';

const DEFAULT_SAVE: SaveData = {
  playerName: '',
  playerTrack: '',
  currentXP: 0,
  playerLevel: 1,
  completedMissions: [],
  currentStreak: 3,
  unlockedBadges: [],
  playerTokens: 10,
};

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Map achievement icon names to Lucide icons
const BadgeIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Swords':
      return <Swords className={className} />;
    case 'FileCode2':
      return <FileCode2 className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'Trophy':
      return <Trophy className={className} />;
    default:
      return <Trophy className={className} />;
  }
};

export const ACHIEVEMENTS = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Compile your first successful step in the arena.',
    badgeName: 'First Blood',
    iconName: 'Swords',
    rewardXP: 250,
  },
  {
    id: 'semantic-architect',
    name: 'Semantic Architect',
    description: 'Complete 100% of the HTML5 world.',
    badgeName: 'Semantic Architect',
    iconName: 'FileCode2',
    rewardXP: 250,
  },
  {
    id: 'async-overlord',
    name: 'Async Overlord',
    description: 'Complete the JavaScript Promise/Async tiers.',
    badgeName: 'Async Overlord',
    iconName: 'Code2',
    rewardXP: 250,
  },
  {
    id: 'full-stack-knight',
    name: 'The Full-Stack Knight',
    description: 'Fully compile a multi-file project workspace dungeon.',
    badgeName: 'The Full-Stack Knight',
    iconName: 'Trophy',
    rewardXP: 250,
  },
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load unified save data from LocalStorage
  const [saveData] = useState<SaveData>(() => {
    if (typeof window === 'undefined') return DEFAULT_SAVE;
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_SAVE, ...parsed };
      } catch {
        // Fallback below
      }
    }
    // Fallback load from legacy keys if exists
    const legacyName = localStorage.getItem('sk_player_name') || '';
    const legacyTrack = localStorage.getItem('sk_player_track') || '';
    const legacyXp = localStorage.getItem('sk_current_xp');
    const legacyLvl = localStorage.getItem('sk_player_level');
    const legacyMissions = localStorage.getItem('sk_completed_missions');
    const legacyStreak = localStorage.getItem('sk_current_streak');

    return {
      playerName: legacyName,
      playerTrack: legacyTrack,
      currentXP: legacyXp ? parseInt(legacyXp, 10) : 0,
      playerLevel: legacyLvl ? parseInt(legacyLvl, 10) : 1,
      completedMissions: legacyMissions ? JSON.parse(legacyMissions) : [],
      currentStreak: legacyStreak ? parseInt(legacyStreak, 10) : 3,
      unlockedBadges: [],
      playerTokens: 10,
    };
  });

  const [playerName, setPlayerName] = useState<string>(saveData.playerName);
  const [playerTrack, setPlayerTrack] = useState<string>(saveData.playerTrack);
  const [currentXP, setCurrentXP] = useState<number>(saveData.currentXP);
  const [playerLevel, setPlayerLevel] = useState<number>(saveData.playerLevel);
  const [completedMissions, setCompletedMissions] = useState<string[]>(saveData.completedMissions);
  const [currentStreak, setCurrentStreak] = useState<number>(saveData.currentStreak);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(saveData.unlockedBadges);
  const [playerTokens, setPlayerTokens] = useState<number>(saveData.playerTokens);
  const [triggerLevelUpModal, setTriggerLevelUpModal] = useState<boolean>(false);
  const [xpIndicators, setXpIndicators] = useState<XpIndicator[]>([]);
  const [activeNotification, setActiveNotification] = useState<ActiveBadgeNotification | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('sk_theme', 'light');
  }, []);

  const unlockedRef = useRef<string[]>(unlockedBadges);
  useEffect(() => {
    unlockedRef.current = unlockedBadges;
  }, [unlockedBadges]);

  const currentUserIdRef = useRef<string | null>(null);

  // Sync player profile with MongoDB on initial load or login
  const syncWithMongoDB = useCallback(async (supabaseId: string) => {
    if (!supabaseId) return;
    currentUserIdRef.current = supabaseId;
    const mongoData = await getPlayerFromMongo(supabaseId);
    if (mongoData) {
      if (mongoData.playerName) setPlayerName(mongoData.playerName);
      if (mongoData.playerTrack) setPlayerTrack(mongoData.playerTrack);
      if (typeof mongoData.currentXP === 'number') setCurrentXP(mongoData.currentXP);
      if (typeof mongoData.playerLevel === 'number') setPlayerLevel(mongoData.playerLevel);
      if (Array.isArray(mongoData.completedMissions)) setCompletedMissions(mongoData.completedMissions);
      if (typeof mongoData.currentStreak === 'number') setCurrentStreak(mongoData.currentStreak);
      if (Array.isArray(mongoData.unlockedBadges)) setUnlockedBadges(mongoData.unlockedBadges);
      if (typeof mongoData.playerTokens === 'number') setPlayerTokens(mongoData.playerTokens);
    }
  }, []);

  // Unified non-blocking Auto-save effect for LocalStorage & MongoDB
  useEffect(() => {
    const payload: SaveData = {
      playerName,
      playerTrack,
      currentXP,
      playerLevel,
      completedMissions,
      currentStreak,
      unlockedBadges,
      playerTokens,
    };
    const saveTimer = setTimeout(() => {
      localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
      const targetId = currentUserIdRef.current || playerName;
      if (targetId) {
        savePlayerToMongo(targetId, payload);
      }
    }, 200);
    return () => clearTimeout(saveTimer);
  }, [playerName, playerTrack, currentXP, playerLevel, completedMissions, currentStreak, unlockedBadges, playerTokens]);

  const setPlayerProfile = useCallback((name: string, track: string) => {
    setPlayerName(name);
    setPlayerTrack(track);
  }, []);

  const levelUp = useCallback(() => {
    setPlayerLevel(prev => {
      const nextLevel = prev + 1;
      setTriggerLevelUpModal(true);
      return nextLevel;
    });
    setPlayerTokens(prev => prev + 5);
  }, []);

  const addXP = useCallback((amount: number) => {
    if (amount <= 0) return;

    // Spawn XP animation indicator
    const id = Math.random().toString(36).substring(2, 9);
    setXpIndicators(prev => [...prev, { id, amount }]);
    setTimeout(() => {
      setXpIndicators(prev => prev.filter(ind => ind.id !== id));
    }, 2000);

    setCurrentXP(prev => {
      const nextXP = prev + amount;
      const threshold = playerLevel * 500;
      if (nextXP >= threshold) {
        setTimeout(() => levelUp(), 50);
      }
      return nextXP;
    });
  }, [playerLevel, levelUp]);

  const completeMission = useCallback((missionId: string, penaltyApplied: boolean, hintCount: number = 0) => {
    if (completedMissions.includes(missionId)) return;

    setCompletedMissions(prev => [...prev, missionId]);

    let earnedXp = 100;
    if (penaltyApplied) {
      if (hintCount === 2) {
        earnedXp = 70;
      } else {
        earnedXp = 85;
      }
    }
    addXP(earnedXp);
    setPlayerTokens(prev => prev + 2);
  }, [completedMissions, addXP]);

  // Gamified Achievements Checker Engine
  useEffect(() => {
    if (!playerName) return;

    const checks = [
      {
        id: 'first-blood',
        condition: currentXP > 0 || completedMissions.length > 0,
      },
      {
        id: 'semantic-architect',
        condition: completedMissions.includes('html'),
      },
      {
        id: 'async-overlord',
        condition: completedMissions.includes('js'),
      },
      {
        id: 'full-stack-knight',
        condition: completedMissions.includes('react-project'),
      },
    ];

    checks.forEach((chk) => {
      if (chk.condition && !unlockedRef.current.includes(chk.id)) {
        unlockedRef.current.push(chk.id);
        setUnlockedBadges(prev => [...prev, chk.id]);
        
        // Award bonus reward (+250 XP)
        addXP(250);

        // Dispatch animated pop-up notification
        const ach = ACHIEVEMENTS.find(a => a.id === chk.id);
        if (ach) {
          setActiveNotification({
            id: ach.id,
            badgeName: ach.name,
            iconName: ach.iconName,
            rewardXP: ach.rewardXP,
          });
          setTimeout(() => {
            setActiveNotification(null);
          }, 4000);
        }
      }
    });
  }, [currentXP, completedMissions, unlockedBadges, playerName, addXP]);

  const dismissLevelUpModal = useCallback(() => {
    setTriggerLevelUpModal(false);
  }, []);

  const addTokens = useCallback((amount: number) => {
    if (amount <= 0) return;
    setPlayerTokens(prev => prev + amount);
  }, []);

  const spendTokens = useCallback((amount: number) => {
    return true;
  }, []);

  const resetGame = useCallback(() => {
    setPlayerName('');
    setPlayerTrack('');
    setCurrentXP(0);
    setPlayerLevel(1);
    setCompletedMissions([]);
    setCurrentStreak(3);
    setUnlockedBadges([]);
    setPlayerTokens(10);
    setTriggerLevelUpModal(false);
    setActiveNotification(null);

    // Clear saves
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem('sk_player_name');
    localStorage.removeItem('sk_player_track');
    localStorage.removeItem('sk_current_xp');
    localStorage.removeItem('sk_player_level');
    localStorage.removeItem('sk_completed_missions');
    localStorage.removeItem('sk_current_streak');
  }, []);

  return (
    <GameContext.Provider
      value={{
        playerName,
        playerTrack,
        currentXP,
        playerLevel,
        completedMissions,
        currentStreak,
        triggerLevelUpModal,
        unlockedBadges,
        playerTokens,
        setPlayerProfile,
        addXP,
        completeMission,
        levelUp,
        dismissLevelUpModal,
        resetGame,
        addTokens,
        spendTokens,
        syncWithMongoDB,
      }}
    >
      {children}

      {/* Floating XP Indicator */}
      <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none flex flex-col items-center gap-2">
        <AnimatePresence>
          {xpIndicators.map(ind => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1.1 }}
              exit={{ opacity: 0, y: -85, scale: 0.9 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="px-4 py-2 bg-[#D2E823]/85 backdrop-blur-sm border-2 border-[#09090B] rounded-lg font-code font-bold text-[#09090B] text-xs sm:text-sm flex items-center gap-1.5 select-none shadow-brutal-glass-sm"
            >
              <span>✨</span>
              <span>+{ind.amount} XP</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Global Level Up Modal */}
      <AnimatePresence>
        {triggerLevelUpModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/40 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="glass-outer rounded-xl p-8 sm:p-10 max-w-sm w-[90%] text-center relative overflow-hidden shadow-brutal-glass-xl"
            >
              <h2 className="font-display text-4xl tracking-tight text-[#09090B]">
                LEVEL UP!
              </h2>
              <p className="text-sm text-[#09090B]/60 mt-2 font-body font-semibold">
                You have advanced to Level {playerLevel}!
              </p>
              <div className="mt-2.5">
                <span className="text-[10px] text-[#09090B] font-code font-bold bg-[#D2E823] px-3 py-1.5 border-2 border-[#09090B] rounded-lg inline-flex items-center gap-1 shadow-brutal-glass-sm animate-pulse">
                  🎁 BONUS REWARD: +5 ORACLE TOKENS 🪙
                </span>
              </div>

              <div className="mt-6 flex justify-center">
                <div className="w-20 h-20 rounded-xl bg-[#D2E823]/95 backdrop-blur-sm border-4 border-[#09090B] flex items-center justify-center animate-bounce shadow-brutal-glass"
                >
                  <span className="text-3xl font-display text-[#09090B]">{playerLevel}</span>
                </div>
              </div>

              <p className="text-xs text-[#09090B]/60 mt-6 leading-relaxed font-body">
                Your full-stack prowess grows, Knight. Master more syntax to rule the digital kingdom!
              </p>

              <button
                onClick={dismissLevelUpModal}
                className="mt-8 w-full px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] rounded-lg border-2 border-[#09090B] transition-all cursor-pointer btn-press shadow-brutal-glass-sm"
              >
                CONTINUE QUEST
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Achievement Notification Banner */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 40, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -100, x: '-50%', scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed top-0 left-1/2 z-[99999] w-[90%] max-w-sm glass-outer rounded-xl p-4 flex items-center gap-4 text-left font-code shadow-brutal-glass-lg"
          >
            <div className="w-12 h-12 rounded-lg bg-[#D2E823]/80 backdrop-blur-sm border-2 border-[#09090B] flex items-center justify-center shrink-0 text-[#09090B] shadow-brutal-glass-sm"
            >
              <BadgeIcon name={activeNotification.iconName} className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-[#09090B] tracking-widest block uppercase font-display">ACHIEVEMENT UNLOCKED!</span>
              <h4 className="text-sm font-bold text-[#09090B] mt-0.5 tracking-wide leading-none font-display">{activeNotification.badgeName}</h4>
              <p className="text-[10px] text-[#09090B]/60 mt-1 leading-tight font-body">{
                activeNotification.id === 'first-blood' ? 'Earned upon compiling your first successful step.' :
                activeNotification.id === 'semantic-architect' ? '100% of the HTML5 world completed.' :
                activeNotification.id === 'async-overlord' ? 'JavaScript Promise/Async tiers verified correct.' :
                'Multi-file React project workspace dungeon fully compiled.'
              }</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-[10px] font-bold text-[#09090B] block bg-[#D2E823]/85 backdrop-blur-sm px-2 py-0.5 rounded border border-[#09090B]">+250 XP</span>
              <span className="text-[8px] text-[#09090B]/50 block uppercase mt-1">Bonus</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameContext.Provider>
  );
};
