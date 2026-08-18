"use client";

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { useGame } from './GameContext';
import { audioEngine } from './audioEngine';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Palette,
  Sword,
  Shield,
  Crown,
  Sparkles,
  CheckCircle2,
  Trophy,
  Scroll,
  ChevronRight,
  Star,
  Zap,
  BookOpen,
  RotateCcw,
  Play,
  Crosshair,
  AlertTriangle,
} from 'lucide-react';

// ─── Level definitions ───
interface Level {
  id: number;
  title: string;
  description: string;
  answer: string;
  targetJustify: string;
}

const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Center Formation',
    description: 'The weapons must converge to the center of the rack. Align all swords to the middle!',
    answer: 'center',
    targetJustify: 'center',
  },
  {
    id: 2,
    title: 'Forward March',
    description: 'Rally the weapons to the start of the rack — the Knight leads from the front.',
    answer: 'flex-start',
    targetJustify: 'flex-start',
  },
  {
    id: 3,
    title: 'Rearguard Position',
    description: 'Pull every weapon to the far end of the shelf. Defend the flank!',
    answer: 'flex-end',
    targetJustify: 'flex-end',
  },
  {
    id: 4,
    title: 'Even Distribution',
    description: 'Space the weapons evenly — equal gaps between each rack slot.',
    answer: 'space-between',
    targetJustify: 'space-between',
  },
  {
    id: 5,
    title: 'Balanced Spacing',
    description: 'Give every weapon equal breathing room on all sides — perfect symmetry.',
    answer: 'space-around',
    targetJustify: 'space-around',
  },
  {
    id: 6,
    title: 'Perfect Equilibrium',
    description: 'Distribute swords so every gap — including edges — is perfectly identical.',
    answer: 'space-evenly',
    targetJustify: 'space-evenly',
  },
];

const WEAPON_ICONS = [Sword, Shield, Crown];
const WEAPON_COLORS = ['text-[#09090B]', 'text-[#09090B]', 'text-[#09090B]'];
const WEAPON_GLOWS = [
  'bg-[#D2E823] border-2 border-[#09090B] shadow-brutal-glass-sm',
  'bg-[#FFFEF9] border-2 border-[#09090B] shadow-brutal-glass-sm',
  'bg-[#E8E4D8] border-2 border-[#09090B] shadow-brutal-glass-sm',
];

function CSSPlayground() {
  const navigate = useNavigate();
  const { completedMissions, completeMission, addXP, playerLevel, playerName, playerTokens, spendTokens } = useGame();
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [justifyValue, setJustifyValue] = useState<string>('');
  const [levelXp, setLevelXp] = useState<Record<number, number>>({});
  const [hintCount, setHintCount] = useState<number>(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCheatsheet, setShowCheatsheet] = useState<boolean>(true);

  const level = LEVELS[currentLevel];
  const totalXp = LEVELS.length * 100;
  const missionXp = Object.values(levelXp).reduce((a, b) => a + b, 0);

  // The justify-content value to apply live — defaults to flex-start if empty
  const appliedJustify = justifyValue.trim() || 'flex-start';

  // Check if user's value matches the target
  const validateAnswer = useCallback(() => {
    const trimmed = justifyValue.trim().toLowerCase();
    if (!trimmed) {
      audioEngine.playErrorBuzzer();
      setValidationStatus('error');
      setValidationMsg('Input is empty — write your alchemy, Knight!');
      return;
    }

    if (trimmed === level.answer) {
      audioEngine.playSuccessChime();
      setValidationStatus('success');
      setValidationMsg(`ALIGNMENT MATCH — "${trimmed}" is the correct incantation!`);

      const earned = hintCount === 0 ? 100 : hintCount === 1 ? 85 : 70;
      if (!completedLevels.includes(currentLevel)) {
        addXP(earned);
        setCompletedLevels(prev => [...prev, currentLevel]);
        setLevelXp(prev => ({ ...prev, [currentLevel]: earned }));
      }

      // If all levels complete — show final victory
      const allDone = completedLevels.length + 1 >= LEVELS.length;
      if (allDone && !completedLevels.includes(currentLevel)) {
        completeMission('css', false, 0);
        setTimeout(() => setShowSuccess(true), 800);
      } else {
        setTimeout(() => setShowLevelUp(true), 500);
      }
    } else {
      audioEngine.playErrorBuzzer();
      setValidationStatus('error');
      setValidationMsg(`"${trimmed}" does not match the target formation. Look at the ghost rack positions.`);
    }
  }, [justifyValue, level, currentLevel, completedLevels, hintCount, addXP, completeMission]);

  const advanceLevel = () => {
    const next = currentLevel + 1;
    if (next < LEVELS.length) {
      setCurrentLevel(next);
      setJustifyValue('');
      setValidationMsg('');
      setValidationStatus('idle');
      setShowLevelUp(false);
      setHintCount(0);
    }
  };

  const goToLevel = (idx: number) => {
    setCurrentLevel(idx);
    setJustifyValue('');
    setValidationMsg('');
    setValidationStatus('idle');
    setShowLevelUp(false);
    setHintCount(0);
  };

  const resetLevel = () => {
    audioEngine.playClickSound();
    setJustifyValue('');
    setValidationMsg('');
    setValidationStatus('idle');
    setShowLevelUp(false);
    setHintCount(0);
  };

  // Keyboard shortcut: Enter to run
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        validateAnswer();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [validateAnswer]);

  // Sync completion state if already conquered globally
  useEffect(() => {
    if (completedMissions.includes('css')) {
      setCompletedLevels(LEVELS.map((_, i) => i));
      const xpMap: Record<number, number> = {};
      LEVELS.forEach((_, i) => {
        xpMap[i] = 100;
      });
      setLevelXp(xpMap);
    }
  }, [completedMissions]);

  return (
    <motion.div
      key="css-playground"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="h-screen overflow-hidden bg-transparent text-[#09090B] flex flex-col md:flex-row relative noise-overlay"
    >

      {/* ───────── LEFT PANEL — The Alchemist Quest Guide (35%) ───────── */}
      <aside className="w-full md:w-[35%] lg:w-[33%] flex flex-col border-r-4 border-[#09090B] glass-outer overflow-y-auto shrink-0 text-[#09090B] shadow-brutal-glass-lg">

        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b-2 border-[#09090B]/10 bg-transparent sticky top-0 z-20 text-[#09090B]">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              navigate('/');
            }}
            className="flex items-center gap-2 text-xs text-[#09090B]/60 hover:text-[#09090B] transition-colors group cursor-pointer font-bold font-body"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="font-code tracking-wider">BACK TO HQ</span>
          </button>

          {/* Compact Player HUD */}
          <div className="hidden lg:flex items-center glass-inner px-3.5 py-1 rounded-lg gap-3 text-[10px] select-none shadow-brutal-glass-sm text-[#09090B]">
            <div className="flex items-center gap-1">
              <span className="text-[#09090B]/50 tracking-wider">KNIGHT:</span>
              <span className="font-bold text-[#09090B] font-code uppercase">{playerName || 'RECRUIT'}</span>
            </div>
            <div className="h-3 w-px bg-[#09090B]/20" />
            <div className="flex items-center gap-1">
              <span className="text-[#09090B]/50 tracking-wider">RANK:</span>
              <span className="font-bold text-[#09090B] font-code">LVL {playerLevel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#D2E823] border-2 border-[#09090B] text-[#09090B] shadow-brutal-glass-sm">
            <Palette className="w-3.5 h-3.5" />
            <span className="text-[10px] font-code font-bold tracking-wider">WORLD 2: CSS</span>
          </div>
        </div>

        {/* World Header */}
        <div className="px-5 sm:px-6 pt-5">
          <div className="flex items-center gap-2 text-[10px] font-code text-[#09090B]/50 tracking-[0.2em] uppercase">
            <Crosshair className="w-3.5 h-3.5 text-[#09090B]" />
            Mission 1 — The Armor Shop
          </div>
          <h1 className="text-2xl sm:text-3xl mt-2 tracking-tight text-[#09090B] font-display">
            THE ALCHEMIST
          </h1>
          <p className="text-xs text-[#09090B]/50 mt-1 font-code">WEAPON ALIGNMENT TRAINING</p>

          {/* XP Bar */}
          <div className="mt-4 glass-inner rounded-lg p-3.5 shadow-brutal-glass-sm text-[#09090B]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#09090B]" />
                <span className="text-[10px] font-code font-bold text-[#09090B] tracking-wider">MISSION XP</span>
              </div>
              <span className="text-xs font-code font-bold text-[#09090B]">{missionXp}/{totalXp}</span>
            </div>
            <div className="w-full h-3 bg-[#E8E4D8] rounded-sm overflow-hidden border-2 border-[#09090B]">
              <div
                className="h-full bg-[#D2E823] transition-all duration-700 ease-out"
                style={{ width: `${(missionXp / totalXp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Story Box (Highlighted Level Description) */}
        <div className="px-5 sm:px-6 mt-4">
          <div className="bg-[#D2E823] border-4 border-[#09090B] p-5 rounded-xl shadow-brutal brutal-shadow relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Scroll className="w-4 h-4 text-[#09090B]" />
                <span className="text-[11px] font-code font-black tracking-widest text-[#09090B] uppercase">
                  ⚡ MISSION LEVEL {level.id}: {level.title.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-body font-bold text-[#09090B] leading-relaxed">
                {level.description}
              </p>
            </div>
          </div>
        </div>

        {/* Level Selector Chips */}
        <div className="px-5 sm:px-6 mt-4">
          <div className="flex flex-wrap gap-2">
            {LEVELS.map((lv, i) => {
              const done = completedLevels.includes(i);
              const active = i === currentLevel;
              return (
                <button
                  key={lv.id}
                  onClick={() => goToLevel(i)}
                  className={`text-[11px] font-code font-bold px-2.5 py-1 rounded-lg border-2 cursor-pointer transition-all ${
                    active
                      ? 'border-[#09090B] bg-[#D2E823] text-[#09090B] shadow-brutal-glass-sm'
                      : done
                        ? 'border-[#09090B]/20 bg-[#E8E4D8] text-[#09090B]/70'
                        : 'border-[#09090B]/20 bg-white/10 text-[#09090B]/50 hover:border-[#09090B] hover:text-[#09090B]'
                  }`}
                >
                  {done ? '✓' : ''} L{lv.id}
                </button>
              );
            })}
          </div>
        </div>

          {/* Hint Drawer */}
          {hintCount > 0 && (
            <div className="px-5 sm:px-6 mt-4">
              <div className="glass-inner p-4 rounded-xl text-xs text-[#09090B] space-y-2 shadow-brutal-glass-sm animate-fade-up">
                <div className="font-bold text-[#09090B] flex items-center justify-between font-display">
                  <span className="flex items-center gap-1 font-bold">🔮 Oracle Clues</span>
                  <span className="text-[10px] bg-[#D2E823] border border-[#09090B] px-2 py-0.5 rounded font-code font-bold">
                    -{hintCount * 15}% XP
                  </span>
                </div>
                <div className="space-y-2 font-code leading-relaxed text-[#09090B]/75">
                  <div>
                    <span className="text-[#09090B] font-bold">Hint 1:</span> Flexbox alignment relies on distribution properties. To align items so that they have equal spacing around them dynamically, check the space-based values of justify-content.
                  </div>
                  {hintCount >= 2 && (
                    <div className="pt-2 border-t border-[#09090B]/10">
                      <span className="text-[#09090B] font-bold">Hint 2:</span> Type exactly <code className="text-[#09090B] bg-[#D2E823] px-1 py-0.5 rounded border border-[#09090B]/20 font-bold">{level.answer}</code> into the input slot.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* Cheatsheet */}
        <div className="px-5 sm:px-6 mt-4 pb-6">
          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="flex items-center gap-1.5 text-[11px] font-code text-[#09090B]/80 hover:text-[#09090B] transition-colors cursor-pointer mb-2 font-bold"
          >
            <BookOpen className="w-3 h-3" />
            {showCheatsheet ? 'HIDE CHEATSHEET' : 'SHOW CHEATSHEET'}
          </button>

          {showCheatsheet && (
            <div className="glass-inner rounded-xl p-4 font-code text-[13px] leading-relaxed space-y-2 shadow-brutal-glass-sm animate-fade-up">
              <p className="text-[#09090B]/40 mb-2">/* Flexbox justify-content values */</p>
              {[
                { val: 'flex-start', desc: 'Items pack to the start' },
                { val: 'flex-end', desc: 'Items pack to the end' },
                { val: 'center', desc: 'Items center in container' },
                { val: 'space-between', desc: 'Equal space between items' },
                { val: 'space-around', desc: 'Equal space around items' },
                { val: 'space-evenly', desc: 'Equal space everywhere' },
              ].map(({ val, desc }) => (
                <div key={val} className="flex items-start gap-2">
                  <span className="text-[#09090B] font-bold bg-[#D2E823]/30 px-1 rounded shrink-0 border border-[#09090B]/10">{val}</span>
                  <span className="text-[#09090B]/60">— {desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ───────── RIGHT PANEL — The Workspace (65%) ───────── */}
      <main className="flex-1 flex flex-col overflow-hidden min-h-0">

        {/* ── THE ARMORY ARENA (Top 65%) ── */}
        <section className="flex-[65] flex flex-col min-h-0 border-b-4 border-[#09090B] p-4 sm:p-6 overflow-auto">
          {/* Arena header */}
          <div className="flex items-center justify-between mb-4 shrink-0 select-none">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-[#09090B]" />
              <span className="text-[10px] font-code text-[#09090B]/60 tracking-wider uppercase font-bold">The Armory Arena</span>
            </div>
          </div>
          {/* The Shelf Container */}
          <div className="relative w-full flex-1 min-h-[260px] glass-outer rounded-xl p-6 overflow-hidden shadow-brutal-glass-lg text-[#09090B]">
            {/* Decorative radial pattern */}
            <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none rounded-xl" />

            {/* Floating celebration particles */}
            <AnimatePresence>
              {validationStatus === 'success' && completedLevels.includes(currentLevel) && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                  {Array.from({ length: 15 }).map((_, idx) => {
                    const size = Math.random() * 6 + 4;
                    const left = Math.random() * 100;
                    const delay = Math.random() * 2;
                    const duration = Math.random() * 3 + 2;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ y: "110%", x: 0, opacity: 0.8, scale: 0.8 }}
                        animate={{
                          y: "-10%",
                          x: [0, (Math.random() - 0.5) * 45, 0],
                          opacity: 0,
                          scale: [0.8, 1.2, 0.5]
                        }}
                        transition={{
                          duration: duration,
                          delay: delay,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        className="absolute bg-[#D2E823] rounded-sm border border-[#09090B]"
                        style={{
                          width: size,
                          height: size,
                          left: `${left}%`,
                          bottom: 0,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </AnimatePresence>

            {/* TARGET LAYER — ghost rack positions */}
            <div
              className="absolute inset-6 flex items-center pointer-events-none"
              style={{ justifyContent: level.targetJustify }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={`target-${i}`}
                  className="border-2 border-dashed border-[#09090B]/30 bg-white/40 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center text-[#09090B]/30 text-[9px] font-code shrink-0 shadow-brutal-glass-sm"
                >
                  SLOT {i + 1}
                </div>
              ))}
            </div>

            {/* MOVING ITEMS LAYER — user-controlled */}
            <div
              id="armory-shelf"
              className="absolute inset-6 flex items-center transition-all duration-500 ease-out"
              style={{ justifyContent: appliedJustify }}
            >
              {WEAPON_ICONS.map((Icon, i) => (
                <div
                  key={`weapon-${i}`}
                  className={`w-16 h-16 rounded-lg border ${WEAPON_GLOWS[i]} flex items-center justify-center shrink-0 transition-all duration-500`}
                >
                  <Icon className={`w-7 h-7 ${WEAPON_COLORS[i]}`} />
                </div>
              ))}
            </div>

            {/* Match indicator */}
            {validationStatus === 'success' && completedLevels.includes(currentLevel) && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#D2E823] border-2 border-[#09090B] px-3 py-1 rounded-lg shadow-brutal-glass-sm select-none">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#09090B]" />
                <span className="text-[10px] font-code font-bold text-[#09090B]">ALIGNED</span>
              </div>
            )}
          </div>
        </section>

        {/* ── THE ALCHEMIST TERMINAL (Bottom 35%) ── */}
        <section className="flex-[35] flex flex-col min-h-0 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#09090B] border-b border-[#F8F4E8]/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#D2E823]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#F8F4E8]" />
              </div>
              <div className="flex items-center gap-1.5 bg-[#141418] border border-[#F8F4E8]/10 px-3 py-1 rounded-md">
                <Palette className="w-3.5 h-3.5 text-[#D2E823]" />
                <span className="text-[10px] font-code text-[#F8F4E8]/50 tracking-wider">armory.css</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetLevel}
                className="flex items-center gap-1.5 text-[10px] font-code text-[#F8F4E8]/50 hover:text-[#F8F4E8] transition-colors px-2.5 py-1 rounded-md cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> RESET
              </button>
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setHintCount(prev => Math.min(prev + 1, 2));
                }}
                disabled={hintCount >= 2}
                className="flex items-center gap-1.5 text-[10px] font-code font-bold text-[#09090B] bg-[#D2E823] border-2 border-[#D2E823] disabled:opacity-50 disabled:pointer-events-none px-3.5 py-1.5 rounded-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer btn-press-sm shadow-brutal-glass-sm"
              >
                📜 Oracle Hints {hintCount > 0 && `(${hintCount}/2)`}
              </button>
              <button
                onClick={validateAnswer}
                className="flex items-center gap-1.5 text-[10px] font-display text-[#09090B] bg-[#D2E823] border-2 border-[#D2E823] px-4 py-1.5 rounded-lg transition-all cursor-pointer btn-press shadow-brutal-glass-sm"
              >
                <Play className="w-3 h-3 fill-current" /> CAST ALCHEMY ➔
              </button>
            </div>
          </div>

          {/* Code input area */}
          <div className="flex-1 overflow-auto bg-black/60 backdrop-blur-md p-4 sm:p-6 font-code text-[15px] leading-relaxed min-h-0">
            <div className="space-y-1">
              {/* Static context lines */}
              <div className="text-[#F8F4E8]/55">
                <span className="text-[#D2E823]">#armory-shelf</span> {'{'}
              </div>
              <div className="pl-6 text-[#F8F4E8]/40">
                display: <span className="text-[#D2E823]">flex</span>;
              </div>
              <div className="pl-6 text-[#F8F4E8]/40">
                align-items: <span className="text-[#D2E823]">center</span>;
              </div>

              {/* The editable line */}
              <div className="pl-6 flex items-center gap-0">
                <span className="text-[#F8F4E8]/40">justify-content: </span>
                <motion.input
                  type="text"
                  value={justifyValue}
                  onChange={(e) => {
                    setJustifyValue(e.target.value);
                    setValidationMsg('');
                    setValidationStatus('idle');
                  }}
                  placeholder="/* YOUR ALCHEMY HERE */"
                  animate={validationStatus === 'error' ? {
                    x: [-10, 10, -10, 10, 0],
                    borderColor: "#DC2626"
                  } : {
                    x: 0,
                    borderColor: justifyValue ? "#D2E823" : "rgba(248, 244, 232, 0.15)"
                  }}
                  transition={{ duration: 0.4 }}
                  className={`bg-[#141418] border-b-2 px-1.5 py-0.5 text-[15px] font-code focus:outline-none transition-colors w-52 placeholder-[#F8F4E8]/15 caret-[#D2E823] ${
                    validationStatus === 'success' ? 'text-[#D2E823]' : 'text-[#F8F4E8]'
                  }`}
                  autoFocus
                />
                <span className="text-[#F8F4E8]/40">;</span>
              </div>

              <div className="text-[#F8F4E8]/55">{'}'}</div>
            </div>

            {/* Live value feedback */}
            <div className="mt-4 pt-3 border-t border-[#F8F4E8]/10">
              <div className="flex items-center gap-2 text-[10px] font-code text-[#F8F4E8]/30">
                <Zap className="w-3 h-3 text-[#D2E823]" />
                <span>LIVE VALUE:</span>
                <span className="text-[#D2E823] font-bold">{appliedJustify}</span>
              </div>
            </div>
          </div>

          {/* Validation message bar */}
          {validationMsg && (
            <div className={`px-4 sm:px-6 py-2 text-[11px] font-code flex items-center gap-2 border-t-2 shrink-0 ${
              validationStatus === 'success'
                ? 'bg-[#D2E823]/10 border-[#D2E823]/40 text-[#D2E823]'
                : 'bg-[#DC2626]/10 border-[#DC2626]/40 text-[#DC2626]'
            }`}>
              {validationStatus === 'success'
                ? <CheckCircle2 className="w-3.5 h-3.5" />
                : <AlertTriangle className="w-3.5 h-3.5" />
              }
              {validationMsg}
            </div>
          )}
        </section>
      </main>

      {/* ───────── LEVEL UP OVERLAY ───────── */}
      <AnimatePresence>
        {showLevelUp && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative glass-outer rounded-xl p-8 sm:p-10 max-w-sm w-[90%] text-center overflow-hidden shadow-brutal-glass-xl text-[#09090B]"
            >
              <div className="mx-auto w-14 h-14 rounded-xl bg-[#D2E823] border-4 border-[#09090B] flex items-center justify-center mb-4 shadow-brutal-glass-sm"
                >
                <Sparkles className="w-7 h-7 text-[#09090B]" />
              </div>

              <h2 className="font-display text-2xl tracking-tight text-[#09090B]">
                SPELL CAST!
              </h2>
              <p className="text-sm text-[#09090B]/60 mt-2 font-code font-bold">
                +{levelXp[currentLevel] || (hintCount === 0 ? 100 : hintCount === 1 ? 85 : 70)} XP — Level {level.id} Complete
              </p>
              {hintCount > 0 && (
                <p className="text-[10px] text-[#DC2626] font-code mt-0.5">
                  (Penalty applied: {hintCount} oracle clue{hintCount > 1 ? 's' : ''} used)
                </p>
              )}

              <div className="flex flex-col gap-3 mt-6">
                {currentLevel + 1 < LEVELS.length ? (
                  <button
                    onClick={advanceLevel}
                    className="w-full px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-press shadow-brutal-glass-sm"
                  >
                    NEXT LEVEL <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLevelUp(false)}
                    className="w-full px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer shadow-brutal-glass-sm"
                  >
                    ALL LEVELS DONE!
                  </button>
                )}
                <button
                  onClick={() => setShowLevelUp(false)}
                  className="w-full px-5 py-2.5 text-xs font-code font-bold text-[#09090B] glass-inner rounded-lg hover:bg-white/20 transition-colors cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  STAY & PRACTICE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ───────── FULL SUCCESS OVERLAY ───────── */}
      <AnimatePresence>
        {showSuccess && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative glass-outer rounded-xl p-8 sm:p-10 max-w-md w-[90%] text-center overflow-hidden shadow-brutal-glass-xl text-[#09090B]"
            >
              <div className="mx-auto w-16 h-16 rounded-xl bg-[#D2E823] border-4 border-[#09090B] flex items-center justify-center mb-5 shadow-brutal-glass-sm"
                >
                <Trophy className="w-8 h-8 text-[#09090B]" />
              </div>

              <h2 className="font-display text-3xl tracking-tight text-[#09090B]">
                WORLD 2 COMPLETE!
              </h2>
              <p className="text-sm text-[#09090B]/60 mt-2 font-code font-bold">
                +{missionXp} XP — The Alchemist's Gauntlet Conquered
              </p>

              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg shadow-brutal-glass-sm">
                  <span className="text-[10px] font-code text-[#09090B] font-bold tracking-wider">ALL {LEVELS.length} LEVELS MASTERED</span>
                </div>
              </div>

              <p className="text-xs text-[#09090B]/50 mt-5 leading-relaxed font-body">
                The <span className="text-[#09090B] font-bold">CSS Armor Shop</span> bows to you.
                The <span className="text-[#09090B] font-bold">JavaScript Sorcery</span> beckons, Knight.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="flex-1 px-5 py-3 text-xs font-code font-bold text-[#09090B] glass-inner rounded-lg hover:bg-white/20 transition-colors cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  STAY & REPLAY
                </button>
                <button
                  onClick={() => navigate('/playground/js')}
                  className="flex-1 px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-press shadow-brutal-glass-sm"
                >
                  PROCEED TO WORLD 3 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CSSPlayground;
