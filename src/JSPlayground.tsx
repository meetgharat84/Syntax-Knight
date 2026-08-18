"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { useGame } from './GameContext';
import { audioEngine } from './audioEngine';
import { evaluateCode } from './lib/evaluator';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Swords,
  Droplets,
  Shield,
  Heart,
  Zap,
  Star,
  Scroll,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Trophy,
  Sparkles,
  Play,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

// ─── Battle Rounds ───
interface BattleRound {
  id: number;
  title: string;
  storyText: string;
  enemyName: string;
  enemyEmoji: string;
  enemyHp: number;
  enemyMaxHp: number;
  playerMp: number;
  playerMaxMp: number;
  codeTemplate: string[];
  inputLineIndex: number;       // which line has the input
  inputPrefix: string;          // text before the input on that line
  inputSuffix: string;          // text after the input on that line
  answer: string;
  answerAlt?: string[];         // alternative accepted answers
  spellName: string;
  spellDescription: string;
  hint: string;
}

const ROUNDS: BattleRound[] = [
  {
    id: 1,
    title: 'E-Commerce Tax Calculator',
    storyText: 'An e-commerce order has a subtotal of 75. Since the subtotal is over 50, you must return "StandardTax" to apply standard tax rates.',
    enemyName: 'Order Service',
    enemyEmoji: '🛒',
    enemyHp: 75,
    enemyMaxHp: 100,
    playerMp: 100,
    playerMaxMp: 100,
    codeTemplate: [
      'function calculateOrderTax(order) {',
      '  // If order subtotal is over 50, return StandardTax!',
      '  if (order.subtotal > 50) {',
      '    return "___";',
      '  } else {',
      '    return "ZeroTax";',
      '  }',
      '}',
    ],
    inputLineIndex: 3,
    inputPrefix: '    return "',
    inputSuffix: '";',
    answer: 'StandardTax',
    answerAlt: ['standardtax', 'Standard Tax', 'standardTax'],
    spellName: 'StandardTax',
    spellDescription: 'Standard 10% tax rate calculated successfully!',
    hint: 'Return the string "StandardTax" when subtotal exceeds 50.',
  },
  {
    id: 2,
    title: 'Inventory Stock Check',
    storyText: 'A product stock quantity is 30 — low enough for reorder alert. Check if stock quantity is less than or equal to 40.',
    enemyName: 'Inventory Service',
    enemyEmoji: '📦',
    enemyHp: 30,
    enemyMaxHp: 80,
    playerMp: 80,
    playerMaxMp: 100,
    codeTemplate: [
      'function checkInventoryStock(item) {',
      '  // If item quantity is 40 or less, send ReorderAlert',
      '  if (item.quantity ___ 40) {',
      '    return "ReorderAlert";',
      '  } else {',
      '    return "InStock";',
      '  }',
      '}',
    ],
    inputLineIndex: 2,
    inputPrefix: '  if (item.quantity ',
    inputSuffix: ' 40) {',
    answer: '<=',
    answerAlt: ['< ='],
    spellName: 'ReorderAlert',
    spellDescription: 'Reorder alert sent for low inventory stock!',
    hint: 'Which comparison operator means "less than or equal to"?',
  },
  {
    id: 3,
    title: 'User Discount Qualifier',
    storyText: 'A user account has accumulated 90 total points. Write the condition to check if user points exceed 60.',
    enemyName: 'User Service',
    enemyEmoji: '👤',
    enemyHp: 90,
    enemyMaxHp: 120,
    playerMp: 60,
    playerMaxMp: 100,
    codeTemplate: [
      'function checkUserDiscount(user) {',
      '  // Complete the condition to grant VIPDiscount',
      '  if (___) {',
      '    return "VIPDiscount";',
      '  } else {',
      '    return "StandardRate";',
      '  }',
      '}',
    ],
    inputLineIndex: 2,
    inputPrefix: '  if (',
    inputSuffix: ') {',
    answer: 'user.points > 60',
    answerAlt: ['user.points>60', 'user.points >= 61'],
    spellName: 'VIPDiscount',
    spellDescription: 'VIP Discount applied to user profile!',
    hint: 'Access the points property on the user object and compare with > 60.',
  },
  {
    id: 4,
    title: 'API Access Gateway',
    storyText: 'An API Gateway checks access rights! Grant access if user role is Admin OR session active is true.',
    enemyName: 'API Gateway',
    enemyEmoji: '⚡',
    enemyHp: 45,
    enemyMaxHp: 100,
    playerMp: 100,
    playerMaxMp: 100,
    codeTemplate: [
      'function authorizeAccess(user, session) {',
      '  // Grant access if user.role is Admin OR session.active is true',
      '  if (user.role === "Admin" ___ session.active === true) {',
      '    return "AccessGranted";',
      '  } else {',
      '    return "AccessDenied";',
      '  }',
      '}',
    ],
    inputLineIndex: 2,
    inputPrefix: '  if (user.role === "Admin" ',
    inputSuffix: ' session.active === true) {',
    answer: '||',
    answerAlt: ['or', 'OR'],
    spellName: 'AccessGranted',
    spellDescription: 'Access granted by API Gateway!',
    hint: 'The logical OR operator in JavaScript is written with two pipe characters.',
  },
];

const JS_HINTS: Record<number, { hint1: string; hint2: string }> = {
  1: {
    hint1: "Look at the condition: `if (enemy.health > 50)`. The Slime currently has 75 HP, so this block runs! What string does the function expect you to return to execute the counter spell?",
    hint2: "Type exactly \"WaterSpell\" (with quotes) inside the return statement field."
  },
  2: {
    hint1: "A Shadow Bat has 30 HP. The condition check asks if enemy.health is less than or equal to 40. What comparison operator in JavaScript does this?",
    hint2: "Type exactly `<=` inside the comparison block."
  },
  3: {
    hint1: "You need to check if the enemy's health is greater than 60. Access the health property of the `enemy` object.",
    hint2: "Type exactly `enemy.health > 60` inside the conditional expression."
  },
  4: {
    hint1: "The logic requires check if health is low OR mana is full. What symbol is used for logical OR in JavaScript?",
    hint2: "Type exactly `||` inside the logical comparison field."
  }
};



function JSPlayground() {
  const navigate = useNavigate();
  const { completedMissions, completeMission, addXP, playerLevel, playerName, playerTokens, spendTokens } = useGame();
  const [currentRound, setCurrentRound] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [roundXp, setRoundXp] = useState<Record<number, number>>({});
  const [hintCount, setHintCount] = useState<number>(0);
  const [completedRounds, setCompletedRounds] = useState<number[]>([]);
  const [showRoundWin, setShowRoundWin] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [validationMsg, setValidationMsg] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [battleAnimation, setBattleAnimation] = useState<'idle' | 'casting' | 'hit' | 'defeated'>('idle');
  const [displayedEnemyHp, setDisplayedEnemyHp] = useState(ROUNDS[0].enemyHp);
  const [displayedPlayerMp, setDisplayedPlayerMp] = useState(ROUNDS[0].playerMp);
  const [combatLog, setCombatLog] = useState<string[]>(['[SYSTEM] Battle arena initialized. Awaiting spell input...']);

  const logEndRef = useRef<HTMLDivElement>(null);
  const round = ROUNDS[currentRound];
  const totalXp = ROUNDS.length * 100;
  const missionXp = Object.values(roundXp).reduce((a, b) => a + b, 0);


  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [combatLog]);

  // Reset displayed stats on round change
  useEffect(() => {
    setDisplayedEnemyHp(round.enemyHp);
    setDisplayedPlayerMp(round.playerMp);
    setBattleAnimation('idle');
  }, [currentRound, round.enemyHp, round.playerMp]);

  const checkAnswer = useCallback(() => {
    const trimmed = userInput.trim();
    if (!trimmed) {
      audioEngine.playErrorBuzzer();
      setValidationStatus('error');
      setValidationMsg('Empty input — write your spell incantation, Knight!');
      setCombatLog(prev => [...prev, '[ERROR] No spell cast. The enemy attacks!']);
      return;
    }

    const isExactMatch = trimmed === round.answer ||
      (round.answerAlt?.some(alt => trimmed.toLowerCase() === alt.toLowerCase()));

    const evalResult = evaluateCode(trimmed, round.answer, 'javascript');
    const isCorrect = isExactMatch || (evalResult.syntaxValid && trimmed.length > 0);

    if (isCorrect) {
      audioEngine.playSuccessChime();
      setValidationStatus('success');
      setValidationMsg(`SPELL RESOLVED — "${round.spellName}" cast successfully!`);

      // Battle animation sequence
      setBattleAnimation('casting');
      setCombatLog(prev => [...prev, `[CAST] ${round.spellName}! ${round.spellDescription}`]);

      const earned = hintCount === 0 ? 100 : hintCount === 1 ? 85 : 70;

      setTimeout(() => {
        setBattleAnimation('hit');
        setDisplayedEnemyHp(0);
        setDisplayedPlayerMp(prev => Math.max(prev - 20, 0));
        setCombatLog(prev => [...prev, `[HIT] ${round.enemyName} takes critical damage!`]);
      }, 800);

      setTimeout(() => {
        setBattleAnimation('defeated');
        setCombatLog(prev => [...prev, `[VICTORY] ${round.enemyName} has been vanquished! +${earned} XP`]);
      }, 1600);

      if (!completedRounds.includes(currentRound)) {
        addXP(earned);
        setCompletedRounds(prev => [...prev, currentRound]);
        setRoundXp(prev => ({ ...prev, [currentRound]: earned }));
      }

      const allDone = completedRounds.length + 1 >= ROUNDS.length && !completedRounds.includes(currentRound);
      setTimeout(() => {
        if (allDone) {
          completeMission('js', false, 0);
          setShowVictory(true);
        } else {
          setShowRoundWin(true);
        }
      }, 2200);
    } else {
      audioEngine.playErrorBuzzer();
      setValidationStatus('error');
      setValidationMsg(`"${trimmed}" failed to compile — the spell fizzles out!`);
      setCombatLog(prev => [...prev, `[FAIL] Spell "${trimmed}" is not recognized. The enemy attacks!`]);
      setDisplayedPlayerMp(prev => Math.max(prev - 10, 0));
    }
  }, [userInput, round, currentRound, completedRounds, hintCount, addXP, completeMission]);

  const advanceRound = () => {
    audioEngine.playClickSound();
    const next = currentRound + 1;
    if (next < ROUNDS.length) {
      setCurrentRound(next);
      setUserInput('');
      setValidationMsg('');
      setValidationStatus('idle');
      setShowRoundWin(false);
      setHintCount(0);
      setCombatLog(prev => [...prev, `[SYSTEM] --- ROUND ${next + 1}: ${ROUNDS[next].title.toUpperCase()} ---`]);
    }
  };

  const resetRound = () => {
    audioEngine.playClickSound();
    setUserInput('');
    setValidationMsg('');
    setValidationStatus('idle');
    setShowRoundWin(false);
    setHintCount(0);
    setBattleAnimation('idle');
    setDisplayedEnemyHp(round.enemyHp);
    setDisplayedPlayerMp(round.playerMp);
  };

  // Enter key shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        checkAnswer();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [checkAnswer]);

  // Sync completion state if already conquered globally
  useEffect(() => {
    if (completedMissions.includes('js')) {
      setCompletedRounds(ROUNDS.map((_, i) => i));
      const xpMap: Record<number, number> = {};
      ROUNDS.forEach((_, i) => {
        xpMap[i] = 100;
      });
      setRoundXp(xpMap);
      setDisplayedEnemyHp(0);
    }
  }, [completedMissions]);

  // Render code lines with the input field embedded
  const renderCodeLines = () => {
    return round.codeTemplate.map((line, idx) => {
      const lineNum = idx + 1;
      if (idx === round.inputLineIndex) {
        // This line has the input field
        return (
          <div key={idx} className="flex items-center">
            <span className="w-8 text-right text-[#F8F4E8]/20 text-[11px] select-none shrink-0 pr-3">{lineNum}</span>
            <span className="text-[#F8F4E8]/60 whitespace-pre">{round.inputPrefix}</span>
            <motion.input
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                setValidationMsg('');
                setValidationStatus('idle');
              }}
              placeholder="___"
              animate={validationStatus === 'error' ? {
                x: [-10, 10, -10, 10, 0],
                borderColor: "#DC2626"
              } : {
                x: 0,
                borderColor: validationStatus === 'success' ? "#D2E823" : "rgba(248, 244, 232, 0.15)"
              }}
              transition={{ duration: 0.4 }}
              className={`bg-[#141418] border-b-2 px-1 py-0 text-[15px] font-code focus:outline-none transition-colors caret-[#D2E823] ${
                validationStatus === 'success'
                  ? 'text-[#D2E823] font-bold'
                  : 'text-[#F8F4E8]'
              } placeholder-[#F8F4E8]/15`}
              style={{ width: Math.max(60, userInput.length * 9 + 30) }}
              autoFocus
            />
            <span className="text-[#F8F4E8]/60 whitespace-pre">{round.inputSuffix}</span>
          </div>
        );
      }
      return (
        <div key={idx} className="flex">
          <span className="w-8 text-right text-[#F8F4E8]/20 text-[11px] select-none shrink-0 pr-3">{lineNum}</span>
          <span className={`whitespace-pre ${
            line.startsWith('function') ? 'text-[#D2E823]' :
            line.includes('return') ? 'text-[#D2E823]/80' :
            line.includes('//') ? 'text-[#F8F4E8]/30' :
            line.includes('if') || line.includes('else') ? 'text-[#D2E823]' :
            'text-[#F8F4E8]/60'
          }`}>{line}</span>
        </div>
      );
    });
  };

  return (
    <motion.div
      key="js-playground"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring' }}
      className="h-screen overflow-hidden bg-transparent text-[#09090B] flex flex-col lg:flex-row relative noise-overlay"
    >

      {/* ───────── LEFT PANEL — Battle Arena (50%) ───────── */}
      <aside className="w-full lg:w-[50%] flex flex-col border-r-4 border-[#09090B] glass-outer overflow-y-auto shrink-0 text-[#09090B] shadow-brutal-glass-lg">

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
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[10px] font-code font-bold tracking-wider">WORLD 3: JAVASCRIPT</span>
          </div>
        </div>

        {/* Header */}
        <div className="px-5 sm:px-6 pt-5">
          <div className="flex items-center gap-2 text-[10px] font-code text-[#09090B]/50 tracking-[0.2em] uppercase">
            <Swords className="w-3.5 h-3.5 text-[#09090B]" />
            Mission 1 — The Fire Slime Battle
          </div>
          <h1 className="text-2xl sm:text-3xl mt-2 tracking-tight text-[#09090B] font-display">
            THE SORCERER
          </h1>

          {/* Round selector */}
          <div className="flex flex-wrap gap-2 mt-3">
            {ROUNDS.map((r, i) => {
              const done = completedRounds.includes(i);
              const active = i === currentRound;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRound(i);
                    setUserInput('');
                    setValidationMsg('');
                    setValidationStatus('idle');
                    setShowRoundWin(false);
                    setHintCount(0);
                  }}
                  className={`text-[11px] font-code font-bold px-2.5 py-1 rounded-lg border-2 cursor-pointer transition-all ${
                    active
                      ? 'border-[#09090B] bg-[#D2E823] text-[#09090B] shadow-brutal-glass-sm'
                      : done
                        ? 'border-[#09090B]/20 bg-[#E8E4D8] text-[#09090B]/70'
                        : 'border-[#09090B]/20 bg-white/10 text-[#09090B]/50 hover:border-[#09090B] hover:text-[#09090B]'
                  }`}
                >
                  {done ? '✓' : '⚔'} R{r.id}
                </button>
              );
            })}
          </div>

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
                  ⚡ MISSION ROUND {round.id}: {round.title.toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-body font-bold text-[#09090B] leading-relaxed">
                {round.storyText}
              </p>
            </div>
          </div>
        </div>

        {/* ── COMBAT WINDOW ── */}
        <div className="px-5 sm:px-6 mt-4">
          <div className="relative w-full min-h-[280px] glass-outer rounded-xl p-5 overflow-hidden shadow-brutal-glass-lg text-[#09090B]">
            {/* Grid background */}
            <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none rounded-xl" />

            {/* Floating celebration particles */}
            <AnimatePresence>
              {validationStatus === 'success' && (
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

            {/* VS indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="text-2xl font-extrabold text-[#09090B]/10 font-code tracking-wider select-none">VS</span>
            </div>

            <div className="flex items-center justify-around h-full relative z-10">
              {/* PLAYER SIDE */}
              <div className="flex flex-col items-center gap-3 w-[45%] select-none">
                <div className="w-20 h-20 rounded-lg bg-[#D2E823] border-2 border-[#09090B] flex items-center justify-center shadow-brutal-glass-sm">
                  <Shield className="w-10 h-10 text-[#09090B]" />
                </div>
                <span className="text-xs font-code font-bold text-[#09090B] tracking-wider">SYNTAX KNIGHT</span>

                {/* Mana Bar */}
                <div className="w-full">
                  <div className="flex items-center justify-between text-[10px] font-code mb-1">
                    <span className="text-[#09090B] flex items-center gap-1 font-bold"><Droplets className="w-3 h-3" /> MP</span>
                    <span className="text-[#09090B]/60 font-semibold">{displayedPlayerMp}/{round.playerMaxMp}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E8E4D8] border-2 border-[#09090B] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#D2E823] transition-all duration-500"
                      style={{ width: `${(displayedPlayerMp / round.playerMaxMp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* ENEMY SIDE */}
              <div className="flex flex-col items-center gap-3 w-[45%] select-none">
                <div className={`w-20 h-20 rounded-lg border-2 glass-inner border-[#09090B] shadow-brutal-glass-sm flex items-center justify-center transition-all duration-500 ${
                  battleAnimation === 'hit' ? 'scale-90 opacity-60' :
                  battleAnimation === 'defeated' ? 'scale-75 opacity-20 rotate-12' :
                  battleAnimation === 'casting' ? 'animate-pulse' : ''
                }`}>
                  <span className="text-4xl select-none">{round.enemyEmoji}</span>
                </div>
                <span className="text-xs font-code font-bold text-[#09090B] tracking-wider">
                  {round.enemyName.toUpperCase()}
                </span>

                {/* Health Bar */}
                <div className="w-full">
                  <div className="flex items-center justify-between text-[10px] font-code mb-1">
                    <span className="text-[#09090B] flex items-center gap-1 font-bold"><Heart className="w-3 h-3 text-[#DC2626]" /> HP</span>
                    <span className="text-[#09090B]/60 font-semibold">{displayedEnemyHp}/{round.enemyMaxHp}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#E8E4D8] border-2 border-[#09090B] rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#DC2626] transition-all duration-700"
                      style={{ width: `${(displayedEnemyHp / round.enemyMaxHp) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Spell effect overlay */}
            {battleAnimation === 'casting' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-[#D2E823]/20 blur-2xl animate-pulse" />
              </div>
            )}
            {battleAnimation === 'hit' && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-40 h-40 rounded-full bg-[#DC2626]/20 blur-3xl animate-ping" />
              </div>
            )}
          </div>
        </div>

        {/* Hint Drawer */}
        {hintCount > 0 && (
          <div className="px-5 sm:px-6 mt-4">
            <div className="glass-inner p-4 rounded-xl text-sm text-[#09090B] space-y-2 shadow-brutal-glass-sm animate-fade-up">
              <div className="font-bold text-[#09090B] flex items-center justify-between font-display font-bold">
                <span className="flex items-center gap-1 font-bold">🔮 Oracle Clues</span>
                <span className="text-[11px] bg-[#D2E823] border border-[#09090B] px-2 py-0.5 rounded font-code font-bold">
                  -{hintCount * 15}% XP
                </span>
              </div>
              <div className="space-y-2 font-code leading-relaxed text-[#09090B]/75">
                <div>
                  <span className="text-[#09090B] font-bold">Hint 1:</span> {JS_HINTS[round.id]?.hint1}
                </div>
                {hintCount >= 2 && (
                  <div className="pt-2 border-t border-[#09090B]/10">
                    <span className="text-[#09090B] font-bold">Hint 2:</span> {JS_HINTS[round.id]?.hint2}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Combat Log */}
        <div className="px-5 sm:px-6 mt-4 pb-4">
          <div className="glass-inner rounded-xl p-3 h-28 overflow-y-auto text-[10px] font-code text-[#09090B]/80 leading-relaxed space-y-0.5 shadow-brutal-glass-sm">
            {combatLog.map((log, i) => (
              <div key={i} className="flex gap-1.5">
                <span className="text-[#09090B]/40 select-none">{`>`}</span>
                <span className={log.includes('[FAIL]') || log.includes('[ERROR]') ? 'text-[#DC2626] font-bold' : log.includes('[VICTORY]') ? 'text-[#09090B] font-bold bg-[#D2E823] px-1' : ''}>{log}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </aside>

      {/* ───────── RIGHT PANEL — Spell Terminal (50%) ───────── */}
      <main className="flex-1 flex flex-col overflow-hidden min-h-0">

        {/* ── Spell Book (Top) ── */}
        <section className="flex-[40] flex flex-col min-h-0 border-b-4 border-[#09090B] overflow-auto glass-outer shadow-brutal-glass-sm text-[#09090B]">
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b-2 border-[#09090B]/10 shrink-0">
            <div className="flex items-center gap-2 select-none">
              <BookOpen className="w-3.5 h-3.5 text-[#D2E823]" />
              <span className="text-[10px] font-code text-[#09090B]/60 tracking-wider uppercase font-bold">Spell Book: if-else Logic</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 sm:p-6 bg-transparent">
            <div className="glass-inner rounded-xl p-5 font-code text-[12px] leading-relaxed space-y-3 shadow-brutal-glass-sm text-[#09090B]">
              <p className="text-[#09090B]/70 font-body">The <span className="text-[#09090B] font-bold">if-else</span> block is the Knight's decision sword — it evaluates a condition and executes one of two paths:</p>
              <div className="bg-[#09090B] border-2 border-[#09090B] rounded-lg p-3 text-[#F8F4E8]">
                <div><span className="text-[#D2E823]">if</span> (<span className="text-[#F8F4E8]/60">condition</span>) {'{'}</div>
                <div className="pl-4 text-[#D2E823]">// runs when condition is <span className="text-white font-bold">true</span></div>
                <div>{'}'} <span className="text-[#D2E823]">else</span> {'{'}</div>
                <div className="pl-4 text-[#DC2626]">// runs when condition is <span className="text-white font-bold">false</span></div>
                <div>{'}'}</div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[#09090B]/60 text-[11px] font-body font-semibold">
                <p><span className="text-[#09090B] font-code font-bold">{`>`}</span>  — greater than</p>
                <p><span className="text-[#09090B] font-code font-bold">{`<`}</span>  — less than</p>
                <p><span className="text-[#09090B] font-code font-bold">{`>=`}</span> — greater than or equal</p>
                <p><span className="text-[#09090B] font-code font-bold">{`<=`}</span> — less than or equal</p>
                <p><span className="text-[#09090B] font-code font-bold">===</span> — strict equality</p>
                <p><span className="text-[#09090B] font-code font-bold">||</span>  — logical OR</p>
                <p><span className="text-[#09090B] font-code font-bold">&&</span>  — logical AND</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Code Terminal (Bottom) ── */}
        <section className="flex-[60] flex flex-col min-h-0 overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#09090B] border-b border-[#F8F4E8]/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#D2E823]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#F8F4E8]" />
              </div>
              <div className="flex items-center gap-1.5 bg-[#141418] border border-[#F8F4E8]/10 px-3 py-1 rounded-md">
                <Zap className="w-3.5 h-3.5 text-[#D2E823]" />
                <span className="text-[10px] font-code text-[#F8F4E8]/50 tracking-wider">combat_spell.js</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetRound}
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
                onClick={checkAnswer}
                className="flex items-center gap-1.5 text-[10px] font-display text-[#09090B] bg-[#D2E823] border-2 border-[#D2E823] px-4 py-1.5 rounded-lg transition-all cursor-pointer btn-press shadow-brutal-glass-sm"
              >
                <Play className="w-3 h-3 fill-current" /> CAST SPELL ➔
              </button>
            </div>
          </div>

          {/* Code editor body */}
          <div className="flex-grow overflow-auto bg-black/60 backdrop-blur-md p-4 sm:p-5 font-code text-[15px] leading-[1.8] min-h-0 border-t border-[#F8F4E8]/10">
            <div className="space-y-0">
              {renderCodeLines()}
            </div>
          </div>

          {/* Validation bar */}
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

      {/* ───────── ROUND WIN OVERLAY ───────── */}
      <AnimatePresence>
        {showRoundWin && (
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
                ENEMY DEFEATED!
              </h2>
              <p className="text-sm text-[#09090B]/60 mt-2 font-code font-bold">
                +{roundXp[currentRound] || (hintCount === 0 ? 100 : hintCount === 1 ? 85 : 70)} XP — {round.enemyName} vanquished
              </p>
              {hintCount > 0 && (
                <p className="text-[10px] text-[#DC2626] font-code mt-0.5">
                  (Penalty applied: {hintCount} oracle clue{hintCount > 1 ? 's' : ''} used)
                </p>
              )}

              <div className="flex flex-col gap-3 mt-6">
                {currentRound + 1 < ROUNDS.length ? (
                  <button
                    onClick={advanceRound}
                    className="w-full px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-press shadow-brutal-glass-sm"
                  >
                    NEXT BATTLE <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => { setShowRoundWin(false); setShowVictory(true); }}
                    className="w-full px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer shadow-brutal-glass-sm"
                  >
                    CLAIM FINAL VICTORY
                  </button>
                )}
                <button
                  onClick={() => setShowRoundWin(false)}
                  className="w-full px-5 py-2.5 text-xs font-code font-bold text-[#09090B] glass-inner rounded-lg hover:bg-white/20 transition-colors cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  STAY & PRACTICE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ───────── FINAL VICTORY OVERLAY ───────── */}
      <AnimatePresence>
        {showVictory && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative glass-outer rounded-xl p-8 sm:p-10 max-md w-[90%] text-center overflow-hidden shadow-brutal-glass-xl text-[#09090B]"
            >
              <div className="mx-auto w-16 h-16 rounded-xl bg-[#D2E823] border-4 border-[#09090B] flex items-center justify-center mb-5"
                style={{ boxShadow: '4px 4px 0px 0px #09090B' }}>
                <Trophy className="w-8 h-8 text-[#09090B]" />
              </div>

              <h2 className="font-display text-3xl tracking-tight text-[#09090B]">
                WORLD 3 COMPLETE!
              </h2>
              <p className="text-sm text-[#09090B]/60 mt-2 font-code font-bold">
                +{missionXp} XP — The Sorcerer's Trial Conquered
              </p>

              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg shadow-brutal-glass-sm">
                  <span className="text-[10px] font-code text-[#09090B] font-bold tracking-wider">ALL {ROUNDS.length} BATTLES WON</span>
                </div>
              </div>

              <p className="text-xs text-[#09090B]/50 mt-5 leading-relaxed font-body">
                The <span className="text-[#09090B] font-bold">JavaScript Void</span> acknowledges your mastery.
                The <span className="text-[#09090B] font-bold">React Core Engine</span> awaits, Knight.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <button
                  onClick={() => setShowVictory(false)}
                  className="flex-grow px-5 py-3 text-xs font-code font-bold text-[#09090B] glass-inner rounded-lg hover:bg-white/20 transition-colors cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  STAY & REPLAY
                </button>
                <button
                  onClick={() => navigate('/playground/react')}
                  className="flex-grow px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-press shadow-brutal-glass-sm"
                >
                  PROCEED TO WORLD 4 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default JSPlayground;
