"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Code,
  ArrowRight,
  Terminal,
  Database,
  Layers,
  Flame,
  Users,
  CheckCircle2,
  Play
} from 'lucide-react';
import { audioEngine } from './audioEngine';

// Interfaces
interface CodeTab {
  id: string;
  name: string;
  language: string;
  icon: React.ReactNode;
  content: string[];
}

// 1. Custom Hook: Typing Effect for Terminal
function useTypingEffect(
  codeLines: string[],
  onLineChange?: (lineIndex: number) => void,
  onCycleComplete?: () => void
) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentLine = codeLines[currentLineIndex] || '';

    if (!isDeleting) {
      if (charIndex < currentLine.length) {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev + currentLine[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 35);
      } else {
        if (onLineChange) onLineChange(currentLineIndex);

        if (currentLineIndex < codeLines.length - 1) {
          timer = setTimeout(() => {
            setCurrentText((prev) => prev + '\n');
            setCurrentLineIndex((prev) => prev + 1);
            setCharIndex(0);
          }, 800);
        } else {
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 4000);
        }
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -2));
        }, 15);
      } else {
        setIsDeleting(false);
        setCurrentLineIndex(0);
        setCharIndex(0);
        if (onCycleComplete) onCycleComplete();
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, currentLineIndex, isDeleting, codeLines, currentText, onLineChange, onCycleComplete]);

  return {
    text: currentText,
    activeLine: currentLineIndex,
    isComplete: !isDeleting && currentLineIndex === codeLines.length - 1 && charIndex === (codeLines[currentLineIndex] || '').length
  };
}

// 2. Custom Hook: Mouse Parallax Coordinates
function useParallaxPosition() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return coords;
}

// Code Tab definitions — outside component to prevent re-render loops
const codeTabs: Record<'main' | 'css' | 'rust', CodeTab> = {
  main: {
    id: 'main',
    name: 'index.tsx',
    language: 'typescript',
    icon: <Code className="w-3.5 h-3.5 text-[#09090B]" />,
    content: [
      'import { SyntaxKnight } from "learn";',
      'const user = new SyntaxKnight({ name: "Gautam" });',
      'await user.learnSkills(["html", "css", "js"]);',
      'await user.solveQuests();',
      'user.buildApp({ launch: true });'
    ]
  },
  css: {
    id: 'css',
    name: 'style.css',
    language: 'css',
    icon: <Layers className="w-3.5 h-3.5 text-[#09090B]" />,
    content: [
      '.my-awesome-site {',
      '  display: flex;',
      '  justify-content: center;',
      '  box-shadow: 6px 6px 0px #09090B;',
      '  filter: drop-shadow(0 0 12px #D2E823);',
      '}'
    ]
  },
  rust: {
    id: 'rust',
    name: 'main.rs',
    language: 'rust',
    icon: <Database className="w-3.5 h-3.5 text-[#09090B]" />,
    content: [
      'fn main() {',
      '    let course = Course::new("Learn Rust");',
      '    let developer = course.register_student();',
      '    assert!(developer.is_memory_safe());',
      '    println!("Everything compiles!");',
      '}'
    ]
  }
};

// Stagger animation variants for clean entrance
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
} as const;

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 18 }
  }
} as const;

// HeroSection Props Definition
interface HeroSectionProps {
  onEnterMatrix: () => void;
  onViewArchitecture: () => void;
}

export default function HeroSection({ onEnterMatrix, onViewArchitecture }: HeroSectionProps) {
  const parallax = useParallaxPosition();
  const [activeTab, setActiveTab] = useState<'main' | 'css' | 'rust'>('main');

  // Interactive compilation states
  const [compilingState, setCompilingState] = useState<'idle' | 'compiling' | 'success'>('idle');
  const [compilerLogs, setCompilerLogs] = useState<{ id: string; text: string }[]>([
    { id: '1', text: '[INIT] Ready to check your code...' },
    { id: '2', text: '[INFO] Ready for your code check.' }
  ]);

  const activeTabDetails = codeTabs[activeTab];

  // Callback when a line is typed out to log compilation updates
  const handleLineChange = useCallback((lineIndex: number) => {
    const lines = activeTabDetails.content;
    const lineText = lines[lineIndex];
    if (lineText) {
      setCompilerLogs((prev) => [
        ...prev.slice(-3),
        { id: String(Date.now() + lineIndex), text: `[SCAN] ${lineText.trim().substring(0, 32)}...` }
      ]);
    }
  }, [activeTabDetails.content]);

  // Callback when typing cycle finishes
  const handleCycleComplete = useCallback(() => {
    setCompilingState('idle');
    setCompilerLogs([
      { id: String(Date.now() + 1), text: '[INIT] Sandbox workspace ready...' },
      { id: String(Date.now() + 2), text: `[INFO] Reset complete for ${activeTabDetails.name}` }
    ]);
  }, [activeTabDetails.name]);

  const { text, isComplete } = useTypingEffect(
    activeTabDetails.content,
    handleLineChange,
    handleCycleComplete
  );

  // Trigger compiler run emulation
  useEffect(() => {
    if (isComplete) {
      setCompilingState('compiling');
      setCompilerLogs((prev) => [
        ...prev.slice(-2),
        { id: String(Date.now() + 10), text: '[COMPILE] Compiling your code...' }
      ]);

      const compileTimer = setTimeout(() => {
        setCompilingState('success');
        setCompilerLogs((prev) => [
          ...prev.slice(-2),
          { id: String(Date.now() + 20), text: `[SUCCESS] Compiled ${activeTabDetails.name} successfully!` },
          { id: String(Date.now() + 30), text: `[OUTPUT] Gained +120 XP!` }
        ]);
      }, 1200);

      return () => clearTimeout(compileTimer);
    }
  }, [isComplete, activeTab]);

  return (
    <div className="w-full flex flex-col items-center bg-transparent text-[#09090B]">

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: THE ONBOARDING HERO
          Standard flow, centered, full-height landing viewport
          ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full min-h-[85vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="flex flex-col items-center text-center max-w-4xl space-y-5 sm:space-y-6 z-10">
          {/* Dynamic Interactive Heading */}
          <motion.div variants={staggerChild} className="relative select-text">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-none text-[#09090B] glitch-hover select-none">
              CRUSH THE BUGS.
              <br />
              <span className="relative text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] px-2 sm:px-3 inline-block -rotate-1 brutal-shadow transform translate-y-1 mt-1 sm:mt-2">
                BUILD COOL STUFF
              </span>
            </h1>
            <div className="absolute -top-6 -left-6 w-24 h-24 dot-grid-pattern opacity-10 pointer-events-none" />
          </motion.div>

          {/* Description Subtext */}
          <motion.p
            variants={staggerChild}
            className="text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl text-[#09090B]/80 font-normal font-sans-inter"
          >
            Hey! Welcome to <span className="font-bold text-[#D2E823]">SyntaxKnight</span>. Instead of watching boring, dry video tutorials or copying-and-pasting templates, you'll learn to code by solving interactive puzzles. We've got 20 hands-on paths to level up your skills, from styling web layouts to configuring real database queries.
          </motion.p>

          {/* Action Buttons Suite */}
          <motion.div variants={staggerChild} className="flex flex-wrap gap-3 sm:gap-4 pt-2 justify-center select-none">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => audioEngine.playHoverSound()}
              onClick={() => {
                audioEngine.playClickSound();
                onEnterMatrix();
              }}
              className="group flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#D2E823] text-black border-2 border-[#09090B] rounded-xl text-xs sm:text-sm font-display tracking-wider hover:bg-[#D2E823]/90 transition-all shadow-brutal-glass cursor-pointer uppercase font-black min-h-[48px]"
            >
              GET STARTED
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: THE CURRICULUM MATRIX
          Standard flow, two-column grid, entrance animation on mount
          ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full px-4 sm:px-6 py-12 sm:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center max-w-7xl mx-auto w-full">
          {/* Left Column: Section Title */}
          <div className="lg:col-span-5 text-left space-y-3 sm:space-y-4">
            <span className="text-[9px] font-code font-black text-[#D2E823] bg-black px-2 py-0.5 rounded uppercase tracking-widest block w-max">
              WHAT YOU'LL LEARN
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#09090B] tracking-tighter leading-none uppercase">
              CHOOSE YOUR PATH
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090B]/70 font-sans-inter">
              We split the coding roadmap into 4 straightforward categories. You can start with basic web page layouts and work your way up to writing advanced database logic, safe memory patterns, and automated build tests.
            </p>
          </div>

          {/* Right Column: Curriculum cards grid */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl select-none">
              {/* Card 1: Web Foundation & UI */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/20 backdrop-blur-3xl border border-white/30 p-5 rounded-2xl shadow-brutal-glass-sm flex flex-col justify-between h-44 text-left"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5 text-[#D2E823]" />
                    <h3 className="font-display text-xs text-[#09090B] uppercase">Websites & UI</h3>
                  </div>
                  <p className="text-[11px] text-[#09090B]/60 leading-relaxed font-body">
                    Learn to build responsive web pages that look great and load fast on any screen.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">HTML5</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">CSS3</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">REACT</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">PHP</span>
                </div>
              </motion.div>

              {/* Card 2: Core Programming Logic */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/20 backdrop-blur-3xl border border-white/30 p-5 rounded-2xl shadow-brutal-glass-sm flex flex-col justify-between h-44 text-left"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-[#D2E823]" />
                    <h3 className="font-display text-xs text-[#09090B] uppercase">Pure Logic</h3>
                  </div>
                  <p className="text-[11px] text-[#09090B]/60 leading-relaxed font-body">
                    Get comfortable with writing conditional statement loops, variables, and mapping array transformations.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">JS</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">TS</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">PYTHON</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">SWIFT</span>
                </div>
              </motion.div>

              {/* Card 3: Systems & Data */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/20 backdrop-blur-3xl border border-white/30 p-5 rounded-2xl shadow-brutal-glass-sm flex flex-col justify-between h-44 text-left"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-[#D2E823]" />
                    <h3 className="font-display text-xs text-[#09090B] uppercase">Databases & Systems</h3>
                  </div>
                  <p className="text-[11px] text-[#09090B]/60 leading-relaxed font-body">
                    Learn to write clean SQL database queries, handle pointers, and keep structure models safe.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">C++</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">RUST</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">GO</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">SQL</span>
                </div>
              </motion.div>

              {/* Card 4: Tools & Engineering */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/20 backdrop-blur-3xl border border-white/30 p-5 rounded-2xl shadow-brutal-glass-sm flex flex-col justify-between h-44 text-left"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-5 h-5 text-[#D2E823]" />
                    <h3 className="font-display text-xs text-[#09090B] uppercase">Real-World Dev Tools</h3>
                  </div>
                  <p className="text-[11px] text-[#09090B]/60 leading-relaxed font-body">
                    Get comfortable with Git version control, write automated testing suites, and bundle apps for deployment.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">GIT</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">DEVOPS</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">SECURITY</span>
                  <span className="text-[8px] font-code font-bold bg-[#09090B]/5 px-2 py-0.5 rounded border border-[#09090B]/10 text-[#09090B]/70">TESTING</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: THE COMPILER PLAYGROUND
          Standard flow, two-column grid, entrance animation on viewport
          ═══════════════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full px-4 sm:px-6 py-12 sm:py-20 pb-20 sm:pb-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center max-w-7xl mx-auto w-full">
          {/* Title description Left (5 cols) */}
          <div className="lg:col-span-5 text-left space-y-3 sm:space-y-4">
            <span className="text-[9px] font-code font-black text-[#D2E823] bg-black px-2 py-0.5 rounded uppercase tracking-widest block w-max">
              INTERACTIVE SANDBOX
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#09090B] tracking-tighter leading-none uppercase">
              GIVE IT A SPIN
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090B]/70 font-sans-inter">
              Try playing around with the code tabs on the right. You can watch how typing a line triggers checks and updates in the diagnostics console. Hit compile and watch your errors disappear in real-time.
            </p>
          </div>

          {/* Compiler terminal Right (7 cols) */}
          <div className="lg:col-span-7 flex justify-center relative w-full">
            {/* Parallax Driven Decorative Core Grid Glow Backdrop */}
            <div
              className="absolute w-72 h-72 rounded-full bg-[#D2E823]/10 blur-[90px] pointer-events-none -z-10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${parallax.x * 24}px, ${parallax.y * 24}px, 0)`
              }}
            />

            {/* MAIN TERMINAL FRAME CONTAINER */}
            <div
              className="w-full max-w-md rounded-2xl border-4 border-[#09090B] bg-[#0E0E11] shadow-brutal-glass-xl overflow-hidden flex flex-col transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${parallax.x * 8}px, ${parallax.y * 8}px, 0)`
              }}
            >
              {/* File Folder Tabs Header bar */}
              <div className="bg-[#09090B] border-b-2 border-[#09090B] px-3 pt-2.5 flex items-center justify-between select-none">
                <div className="flex gap-1.5 relative">
                  {(Object.keys(codeTabs) as Array<'main' | 'css' | 'rust'>).map((tabId) => {
                    const tab = codeTabs[tabId];
                    const isActive = activeTab === tabId;
                    return (
                      <button
                        key={tabId}
                        onMouseEnter={() => audioEngine.playHoverSound()}
                        onClick={() => {
                          audioEngine.playClickSound();
                          setActiveTab(tabId);
                          setCompilingState('idle');
                          setCompilerLogs([
                            { id: String(Date.now() + 1), text: '[INIT] Workspace registers active...' },
                            { id: String(Date.now() + 2), text: `[TAB] Switched to schema target: ${tab.name}` }
                          ]);
                        }}
                        className={`relative flex items-center gap-1.5 px-3.5 py-2.5 text-[10px] font-code font-bold rounded-t-lg transition-colors cursor-pointer z-10 ${isActive
                            ? 'text-[#D2E823]'
                            : 'text-white/45 hover:text-white/80'
                          }`}
                      >
                        <span>{tab.name}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeTabUnderline"
                            className="absolute inset-0 bg-[#0E0E11] rounded-t-lg -z-10 border-t border-x border-[#09090B]/40"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Simulated window circles */}
                <div className="flex gap-1.5 pb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              {/* CODE EDITOR TEXTAREA BODY */}
              <div className="p-3 sm:p-4 min-h-[190px] font-code text-[11px] leading-relaxed relative flex flex-col justify-between select-text text-left overflow-x-auto">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="text-white/20 select-none text-right font-code pr-1 shrink-0">
                    {activeTabDetails.content.map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  <div className="flex-grow whitespace-pre font-code text-white overflow-x-auto">
                    {text.split('\n').map((lineText, lineIdx) => {
                      return (
                        <div key={lineIdx} className="font-code min-h-[1.5rem]">
                          {lineText.split(' ').map((word, wordIdx) => {
                            let wordClass = 'text-white/90';
                            if (['const', 'let', 'import', 'from', 'fn', 'await', 'return'].includes(word)) {
                              wordClass = 'text-purple-400 font-bold';
                            } else if (['new', 'function', 'class'].includes(word)) {
                              wordClass = 'text-amber-300';
                            } else if (word.startsWith('"') || word.startsWith("'")) {
                              wordClass = 'text-emerald-400';
                            } else if (['SyntaxKnight', 'Arena'].includes(word)) {
                              wordClass = 'text-[#D2E823] font-black';
                            } else if (word.includes('(') || word.includes(')')) {
                              wordClass = 'text-[#D2E823]';
                            }
                            return (
                              <span key={wordIdx} className={`${wordClass} font-code mr-1.5`}>
                                {word}
                              </span>
                            );
                          })}

                          {lineIdx === text.split('\n').length - 1 && !isComplete && (
                            <span className="animate-blink font-bold text-[#D2E823] ml-0.5">_</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Overlapping badge indicating compiler completion status */}
                <div className="absolute right-3 top-3 select-none pointer-events-none">
                  <AnimatePresence>
                    {compilingState === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                        animate={{ opacity: 1, scale: 1, rotate: -2 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-[#D2E823] border border-[#09090B] text-black px-2.5 py-1 rounded shadow-brutal-glass-sm flex items-center gap-1 text-[9px] font-code font-bold uppercase"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>STABILIZED</span>
                      </motion.div>
                    )}
                    {compilingState === 'compiling' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-amber-400 border border-[#09090B] text-black px-2.5 py-1 rounded shadow-brutal-glass-sm flex items-center gap-1.5 text-[9px] font-code font-bold uppercase animate-pulse"
                      >
                        <Play className="w-2.5 h-2.5 animate-spin" />
                        <span>COMPILING</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* LOWER COMPILER LOG CONSOLE & HUD METRICS */}
              <div className="bg-[#09090B]/60 border-t border-white/5 p-3 flex flex-col gap-2.5 select-none">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#D2E823]" />
                    <span className="text-[9px] font-code font-black text-white/50 uppercase tracking-wider">
                      Diagnostics Output
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${compilingState === 'success'
                        ? 'bg-emerald-500'
                        : compilingState === 'compiling'
                          ? 'bg-amber-400 animate-pulse'
                          : 'bg-white/20'
                      }`} />
                    <span className="text-[8px] font-code font-bold text-white/70 uppercase">
                      {compilingState === 'success' ? 'STANDBY' : compilingState === 'compiling' ? 'RUNNING' : 'AWAITING'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 min-h-[56px] text-left overflow-hidden">
                  <AnimatePresence initial={false}>
                    {compilerLogs.map((log) => {
                      let logColor = 'text-white/40';
                      if (log.text.startsWith('[SUCCESS]')) logColor = 'text-emerald-400 font-semibold';
                      if (log.text.startsWith('[COMPILE]')) logColor = 'text-amber-400';
                      if (log.text.startsWith('[TAB]') || log.text.startsWith('[INIT]')) logColor = 'text-sky-300';
                      if (log.text.startsWith('[OUTPUT]')) logColor = 'text-[#D2E823]';

                      return (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.15 }}
                          className={`font-code text-[9.5px] truncate ${logColor}`}
                        >
                          {log.text}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Interactive Compilation Trigger */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => audioEngine.playHoverSound()}
                  onClick={() => {
                    if (compilingState === 'compiling') return;
                    audioEngine.playClickSound();
                    setCompilingState('compiling');
                    setCompilerLogs((prev) => [
                      ...prev.slice(-2),
                      { id: String(Date.now() + 50), text: '[COMPILE] Running manually triggered check...' }
                    ]);

                    setTimeout(() => {
                      setCompilingState('success');
                      audioEngine.playSuccessChime();
                      setCompilerLogs((prev) => [
                        ...prev.slice(-2),
                        { id: String(Date.now() + 60), text: `[SUCCESS] Compiled ${activeTabDetails.name} successfully!` },
                        { id: String(Date.now() + 70), text: '[OUTPUT] Gained +120 XP!' }
                      ]);
                    }, 1000);
                  }}
                  disabled={compilingState === 'compiling'}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-white/5 border border-white/10 hover:border-[#D2E823] hover:text-[#D2E823] text-white/80 rounded-lg text-[9px] font-code font-bold uppercase transition-all duration-200 cursor-pointer min-h-[40px]"
                >
                  <Cpu className={`w-3 h-3 ${compilingState === 'compiling' ? 'animate-spin' : ''}`} />
                  {compilingState === 'compiling' ? 'Running code...' : 'Run test checks'}
                </motion.button>
              </div>
            </div>

            {/* Badges floating parallax items */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.4 }}
              className="absolute -top-3 -right-2 glass-outer p-2 rounded-lg shadow-brutal-glass-sm rotate-[3deg] select-none pointer-events-none hidden md:block"
              style={{
                transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -12}px, 0) rotate(3deg)`
              }}
            >
              <div className="flex items-center gap-1 text-[8px] font-code font-black text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>CLEAN & READABLE CODE</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.45 }}
              className="absolute -bottom-3 -left-4 bg-[#D2E823] border-2 border-[#09090B] px-3 py-1 rounded-md shadow-brutal-glass-sm -rotate-[4deg] select-none text-[8.5px] font-code font-black text-[#09090B] uppercase pointer-events-none hidden md:block"
              style={{
                transform: `translate3d(${parallax.x * 16}px, ${parallax.y * -16}px, 0) rotate(-4deg)`
              }}
            >
              ⚡ BUGS CRUSHED (OK)
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
