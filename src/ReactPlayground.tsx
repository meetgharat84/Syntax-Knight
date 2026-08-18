"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { useGame } from './GameContext';
import { audioEngine } from './audioEngine';
import {
  ArrowLeft,
  FolderOpen,
  FolderClosed,
  FileCode2,
  FileText,
  Paintbrush,
  Component,
  X,
  ChevronRight,
  ChevronDown,
  Trophy,
  Cpu,
  Eye,
  Settings,
  Sparkles,
  CheckCircle2,
  Globe,
  Rocket,
  Terminal,
  Lightbulb,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CYBERPUNK_PORTFOLIO_PROJECT,
  generateProjectPreview,
  runStepValidation,
  type GrandProject,
  type MilestoneStep,
} from './projectsData';

/* ══════════════════════════════════════════════════════
   ICON HELPERS
   ══════════════════════════════════════════════════════ */
function FileIcon({ type, size = 14 }: { type: string; size?: number }) {
  switch (type) {
    case 'html':
      return <FileCode2 className="text-[#09090B]" style={{ width: size, height: size }} />;
    case 'css':
      return <Paintbrush className="text-[#09090B]" style={{ width: size, height: size }} />;
    case 'tsx':
      return <FileCode2 className="text-[#09090B]" style={{ width: size, height: size }} />;
    case 'component':
      return <Component className="text-[#09090B]" style={{ width: size, height: size }} />;
    default:
      return <FileText className="text-[#09090B]/50" style={{ width: size, height: size }} />;
  }
}

function langColor(lang: string): string {
  switch (lang) {
    case 'html': return 'text-[#09090B]';
    case 'css': return 'text-[#09090B]';
    case 'tsx': return 'text-[#09090B]';
    default: return 'text-[#09090B]/50';
  }
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT — DATA-DRIVEN MULTI-FILE WORKSPACE
   ══════════════════════════════════════════════════════ */
function ReactPlayground() {
  const navigate = useNavigate();
  const { completedMissions, completeMission, addXP, playerName, playerLevel, currentXP, playerTokens, spendTokens } = useGame();

  /* ── 1. ACTIVE PROJECT STATE ── */
  const [activeProject] = useState<GrandProject>(CYBERPUNK_PORTFOLIO_PROJECT);

  /* ── 2. STEP TRACKER ── */
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  /* ── 3. FILE CONTENTS — maps filename → live editable string ── */
  const [fileContents, setFileContents] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    activeProject.files.forEach((f) => {
      initial[f.id] = f.starterCode;
    });
    return initial;
  });

  /* ── UI State ── */
  const [activeFile, setActiveFile] = useState<string>(activeProject.files[0].id);
  const [openTabs, setOpenTabs] = useState<string[]>([activeProject.files[0].id]);
  const [folderOpen, setFolderOpen] = useState(true);

  /* ── Compile/Validation State ── */
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileStatus, setCompileStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [compileError, setCompileError] = useState('');
  const [isProjectComplete, setIsProjectComplete] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [gutterError, setGutterError] = useState(false);

  /* ── Hint State ── */
  const [revealedHintLevel, setRevealedHintLevel] = useState(0);
  const [totalHintPenalty, setTotalHintPenalty] = useState(0);

  /* ── Step completion animation ── */
  const [stepSuccessFlash, setStepSuccessFlash] = useState(false);

  /* ── Editor refs ── */
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  /* ── Derived state ── */
  const currentStep: MilestoneStep = activeProject.steps[currentStepIndex];
  const activeStepInfo = currentStep;
  const isLastStep = currentStepIndex >= activeProject.steps.length - 1;
  const currentContent = fileContents[activeFile] || '';
  const currentFileObj = activeProject.files.find((f) => f.id === activeFile)!;
  const lineCount = currentContent.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 30) }, (_, i) => i + 1);
  const rootFiles = activeProject.files.filter((f) => !f.parentFolder);
  const componentFiles = activeProject.files.filter((f) => f.parentFolder === 'components');
  const completedStepCount = currentStepIndex;
  const progressPercent = Math.round((completedStepCount / activeProject.steps.length) * 100);

  /* ── Sync scroll ── */
  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  /* ── Open file in editor ── */
  const openFile = useCallback((fileId: string) => {
    setActiveFile(fileId);
    if (!openTabs.includes(fileId)) {
      setOpenTabs((prev) => [...prev, fileId]);
    }
  }, [openTabs]);

  /* ── Close tab ── */
  const closeTab = useCallback((fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== fileId);
      if (next.length === 0) return prev;
      if (activeFile === fileId) {
        setActiveFile(next[next.length - 1]);
      }
      return next;
    });
  }, [activeFile]);

  /* ── Update file content ── */
  const updateFile = useCallback((content: string) => {
    setFileContents((prev) => ({ ...prev, [activeFile]: content }));
    // Clear error state on edit
    if (compileStatus === 'error') {
      setCompileStatus('idle');
      setCompileError('');
      setGutterError(false);
    }
  }, [activeFile, compileStatus]);

  /* ── Auto-navigate to target file on step change ── */
  useEffect(() => {
    if (currentStep) {
      openFile(currentStep.targetFile);
    }
    // Reset hint state when step changes
    setRevealedHintLevel(0);
    setCompileStatus('idle');
    setCompileError('');
    setGutterError(false);
  }, [currentStepIndex]);

  /* ── Sync if already completed globally ── */
  useEffect(() => {
    if (completedMissions.includes(activeProject.missionId)) {
      setCurrentStepIndex(activeProject.steps.length - 1);
      setIsProjectComplete(true);
      setCompileStatus('success');
    }
  }, [completedMissions, activeProject]);

  /* ═══════════════════════════════════════════
     COMPILE — Real Regex Validation Engine
     ═══════════════════════════════════════════ */
  const handleCompile = useCallback(() => {
    setIsCompiling(true);
    setCompileStatus('idle');
    setCompileError('');
    setGutterError(false);

    setTimeout(() => {
      const result = runStepValidation(currentStep, fileContents);
      setIsCompiling(false);
      setPreviewKey((k) => k + 1);

      if (result.passed) {
        /* ── SUCCESS ── */
        audioEngine.playSuccessChime();
        setCompileStatus('success');
        setStepSuccessFlash(true);
        setTimeout(() => setStepSuccessFlash(false), 1500);

        // Award XP for this step (minus hint penalties)
        const netXP = Math.max(currentStep.xpReward - totalHintPenalty, 10);
        addXP(netXP);

        if (isLastStep) {
          // FINAL STEP — Project Complete
          if (!completedMissions.includes(activeProject.missionId)) {
            completeMission(activeProject.missionId, totalHintPenalty > 0, revealedHintLevel);
          }
          setTimeout(() => setIsProjectComplete(true), 800);
        } else {
          // Advance to next step after a short celebration
          setTimeout(() => {
            setCurrentStepIndex((prev) => Math.min(prev + 1, activeProject.steps.length - 1));
            setTotalHintPenalty(0);
          }, 1600);
        }
      } else {
        /* ── FAILURE ── */
        audioEngine.playErrorBuzzer();
        setCompileStatus('error');
        setCompileError(result.errorMessage);
        setGutterError(true);
        setShakeKey((k) => k + 1);

        // Clear gutter error after animation
        setTimeout(() => setGutterError(false), 2000);
      }
    }, 1500);
  }, [currentStep, fileContents, isLastStep, totalHintPenalty, revealedHintLevel, completedMissions, activeProject, addXP, completeMission]);

  /* ── Reveal next hint ── */
  const revealNextHint = useCallback(() => {
    if (currentStep && revealedHintLevel < currentStep.hints.length) {
      if (spendTokens(2)) {
        audioEngine.playClickSound();
        const nextHint = currentStep.hints[revealedHintLevel];
        setRevealedHintLevel((prev) => prev + 1);
        setTotalHintPenalty((prev) => prev + nextHint.xpPenalty);
      } else {
        audioEngine.playErrorBuzzer();
        setCompileStatus('error');
        setCompileError('INSUFFICIENT TOKENS! You need at least 2 tokens to purchase an Oracle Clue.');
        setGutterError(true);
        setShakeKey((k) => k + 1);
        setTimeout(() => setGutterError(false), 2000);
      }
    }
  }, [currentStep, revealedHintLevel, spendTokens]);

  if (!activeStepInfo) {
    return (
      <div className="min-h-screen w-full bg-[#05050a] flex flex-col items-center justify-center p-6 text-gray-100 font-code relative overflow-hidden select-none animate-fade-in">
        <div className="absolute inset-0 vector-grid-backdrop opacity-30 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-md w-full bg-[#08080f]/90 border border-cyan-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center animate-pulse">
            <span className="text-2xl text-cyan-400">🏁</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">QUEST SECTION ARCHIVED</h2>
            <p className="text-xs text-gray-400 font-body">All Quests Cleared! Loading Next Level...</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#D2E823] text-black font-display text-[10px] font-bold py-3 px-4 border-2 border-[#09090B] rounded-xl cursor-pointer uppercase tracking-wider"
          >
            RETURN TO HQ
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key="project-workspace"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="h-screen bg-transparent flex flex-col overflow-hidden text-[#09090B] select-none noise-overlay"
    >

      {/* ═══════════════════════════════════════
         TOP HUD NAVIGATION BAR
         ═══════════════════════════════════════ */}
      <header className="shrink-0 flex items-center justify-between px-4 py-2.5 glass-outer border-b-2 border-[#09090B]/10 z-30 text-[#09090B] shadow-brutal-glass-sm">
        <button
          onClick={() => {
            audioEngine.playClickSound();
            navigate('/');
          }}
          className="flex items-center gap-2 text-[10px] font-code text-[#09090B]/60 hover:text-[#DC2626] transition-colors group cursor-pointer glass-inner hover:border-[#DC2626] px-3 py-1.5 rounded-lg btn-press-sm shadow-brutal-glass-sm text-[#09090B]"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="tracking-widest font-bold">ABANDON PROJECT</span>
        </button>

        <div className="hidden md:flex items-center gap-3">
          <Cpu className="w-4 h-4 text-[#09090B]" />
          <span className="font-display text-[11px] tracking-tight text-[#09090B] uppercase">
            {activeProject.questLabel}
          </span>
          <Rocket className="w-4 h-4 text-[#09090B]" />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-code">
            <div className={`w-2 h-2 rounded-sm border border-[#09090B] ${
              isCompiling ? 'bg-[#D2E823] animate-pulse' :
              compileStatus === 'success' ? 'bg-[#D2E823]' :
              'bg-[#D2E823] animate-acid-pulse'
            }`} />
            <span className={`tracking-wider font-bold ${
              isCompiling ? 'text-[#09090B]/70' :
              compileStatus === 'success' ? 'text-[#09090B]' : 'text-[#09090B]'
            }`}>
              {isCompiling ? 'COMPILING...' : compileStatus === 'success' ? 'BUILD SUCCESSFUL' : 'COMPILING LIVE PREVIEW...'}
            </span>
          </div>
          <div className="hidden lg:flex items-center glass-inner px-3 py-1 rounded-lg gap-3 text-[9px] font-code shadow-brutal-glass-sm text-[#09090B]">
            <span className="text-[#09090B]/50">KNIGHT:</span>
            <span className="font-bold text-[#09090B] uppercase">
              {playerName || 'RECRUIT'}
            </span>
            <div className="h-3 w-px bg-[#09090B]/20" />
            <span className="text-[#09090B]/50">LVL</span>
            <span className="font-bold text-[#09090B]">{playerLevel}</span>
            <div className="h-3 w-px bg-[#09090B]/20" />
            <span className="font-bold text-[#09090B] bg-[#D2E823] px-1.5 py-0.5 rounded border border-[#09090B]">{currentXP} XP</span>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════
         THREE-PANEL IDE SPLIT
         ═══════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden min-h-0">

        {/* ────────────────────────────────────
           PANEL 1: FILE EXPLORER + STEP TRACKER (15%)
           ──────────────────────────────────── */}
        <aside className="w-[15%] min-w-[200px] glass-outer border-r border-black/10 flex flex-col overflow-hidden shrink-0 text-[#09090B] shadow-brutal-glass-lg">
          {/* Explorer header */}
          <div className="px-3 py-2.5 border-b-2 border-[#09090B]/10 flex items-center gap-2 select-none">
            <Globe className="w-3.5 h-3.5 text-[#09090B]" />
            <span className="text-[9px] font-code font-bold tracking-[0.15em] text-[#09090B]/60 uppercase">
              Explorer
            </span>
          </div>

          {/* Project name */}
          <div className="px-3 py-2 border-b-2 border-[#09090B]/10 select-none">
            <span className="text-[9px] font-code font-bold tracking-wider text-[#09090B] uppercase bg-[#D2E823] px-1 rounded border border-[#09090B]/10">
              📁 {activeProject.id.toUpperCase()}
            </span>
          </div>

          {/* File tree */}
          <div className="overflow-y-auto py-1 border-b-2 border-[#09090B]/10">
            {rootFiles.map((file) => (
              <button
                key={file.id}
                onClick={() => {
                  audioEngine.playClickSound();
                  openFile(file.id);
                }}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left transition-all cursor-pointer group ${
                  activeFile === file.id
                    ? 'bg-[#D2E823]/30 border-l-4 border-[#09090B] text-[#09090B] font-bold'
                    : currentStep?.targetFile === file.id
                    ? 'bg-white/20 backdrop-blur-sm border-l-4 border-[#09090B]/50 text-[#09090B]/80'
                    : 'border-l-4 border-transparent text-[#09090B]/60 hover:bg-white/10 hover:text-[#09090B]'
                }`}
              >
                <FileIcon type={file.icon} size={13} />
                <span className="text-[11px] font-code truncate">{file.label}</span>
                {currentStep?.targetFile === file.id && activeFile !== file.id && (
                  <Target className="w-3 h-3 text-[#09090B] ml-auto shrink-0 animate-pulse" />
                )}
              </button>
            ))}

            {/* Components folder */}
            <button
              onClick={() => setFolderOpen((v) => !v)}
              className="w-full flex items-center gap-1.5 px-3 py-1.5 text-left text-[#09090B]/60 hover:bg-white/10 hover:text-[#09090B] transition-all cursor-pointer border-l-4 border-transparent"
            >
              {folderOpen ? (
                <>
                  <ChevronDown className="w-3 h-3 text-[#09090B]/40" />
                  <FolderOpen className="w-3.5 h-3.5 text-[#09090B]/70" />
                </>
              ) : (
                <>
                  <ChevronRight className="w-3 h-3 text-[#09090B]/40" />
                  <FolderClosed className="w-3.5 h-3.5 text-[#09090B]/70" />
                </>
              )}
              <span className="text-[11px] font-code font-bold">components</span>
            </button>
            {folderOpen && componentFiles.map((file) => (
              <button
                key={file.id}
                onClick={() => openFile(file.id)}
                className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-left transition-all cursor-pointer ${
                  activeFile === file.id
                    ? 'bg-[#D2E823]/30 border-l-4 border-[#09090B] text-[#09090B] font-bold'
                    : currentStep?.targetFile === file.id
                    ? 'bg-white/20 backdrop-blur-sm border-l-4 border-[#09090B]/50 text-[#09090B]/80'
                    : 'border-l-4 border-transparent text-[#09090B]/60 hover:bg-white/10 hover:text-[#09090B]'
                }`}
              >
                <FileIcon type={file.icon} size={13} />
                <span className="text-[11px] font-code truncate">{file.label}</span>
                {currentStep?.targetFile === file.id && activeFile !== file.id && (
                  <Target className="w-3 h-3 text-[#09090B] ml-auto shrink-0 animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* ── MILESTONE STEP TRACKER ── */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5 select-none">
                <span className="text-[9px] font-code font-bold text-[#09090B]/50 tracking-wider">PROGRESS</span>
                <span className="text-[9px] font-code font-bold text-[#09090B]">{completedStepCount}/{activeProject.steps.length}</span>
              </div>
              <div className="w-full h-3 bg-white/20 backdrop-blur-sm rounded-sm overflow-hidden border-2 border-[#09090B]">
                <div
                  className="h-full bg-[#D2E823] transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Step list */}
            <div className="space-y-1.5">
              {activeProject.steps.map((step, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const isLocked = idx > currentStepIndex;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all text-[10px] font-code ${
                      isCompleted
                        ? 'glass-inner bg-[#D2E823]/10 border-[#09090B]/30 text-[#09090B] shadow-brutal-glass-sm'
                        : isCurrent
                        ? 'bg-[#D2E823] border-[#09090B] text-[#09090B] shadow-brutal-glass-sm font-bold'
                        : 'bg-transparent border-[#09090B]/10 text-[#09090B]/30'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 text-[9px] font-bold ${
                      isCompleted
                        ? 'bg-[#D2E823] border-[#09090B] text-[#09090B]'
                        : isCurrent
                        ? 'glass-inner border-[#09090B] text-[#09090B]'
                        : 'bg-transparent border-[#09090B]/20 text-[#09090B]/30'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : step.stepNumber}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate ${isLocked ? 'opacity-40' : ''}`}>
                        {step.title}
                      </p>
                      {isCurrent && (
                        <p className="text-[9px] text-[#09090B]/50 truncate mt-0.5">
                          → {activeProject.files.find(f => f.id === step.targetFile)?.label}
                        </p>
                      )}
                    </div>
                    {isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#09090B] animate-pulse shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explorer footer stats */}
          <div className="px-3 py-2 border-t-2 border-[#09090B]/10 space-y-1 select-none">
            <div className="flex items-center justify-between text-[9px] font-code">
              <span className="text-[#09090B]/40">Files</span>
              <span className="text-[#09090B] font-bold">{activeProject.files.length}</span>
            </div>
            <div className="flex items-center justify-between text-[9px] font-code">
              <span className="text-[#09090B]/40">Step XP</span>
              <span className="text-[#09090B] font-bold">
                {currentStep ? `${Math.max(currentStep.xpReward - totalHintPenalty, 10)}/${currentStep.xpReward}` : '—'}
              </span>
            </div>
          </div>
        </aside>

        {/* ────────────────────────────────────
           PANEL 2: MULTI-FILE CODE EDITOR (45%)
           ──────────────────────────────────── */}
        <main className="w-[45%] flex flex-col overflow-hidden bg-black/60 backdrop-blur-md border-r-4 border-[#09090B] shadow-brutal-glass-lg">
          {/* Tab Bar */}
          <div className="shrink-0 flex items-center bg-transparent border-b border-[#F8F4E8]/10 overflow-x-auto select-none">
            {openTabs.map((tabId) => {
              const file = activeProject.files.find((f) => f.id === tabId)!;
              const isActive = activeFile === tabId;
              const isModified = fileContents[tabId] !== file.starterCode;
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveFile(tabId)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-[11px] font-code border-r border-[#F8F4E8]/10 transition-all cursor-pointer shrink-0 group relative ${
                    isActive
                      ? 'bg-[#141418]/80 text-[#F8F4E8] backdrop-blur-md'
                      : 'bg-transparent text-[#F8F4E8]/40 hover:text-[#F8F4E8]/70 hover:bg-[#141418]/30'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#D2E823]" />
                  )}
                  <FileIcon type={file.icon} size={12} />
                  <span className="truncate">{file.label}</span>
                  {isModified && <div className="w-1.5 h-1.5 rounded-full bg-[#D2E823] shrink-0" />}
                  {openTabs.length > 1 && (
                    <span
                      onClick={(e) => closeTab(tabId, e)}
                      className="ml-1 opacity-0 group-hover:opacity-100 hover:text-[#DC2626] transition-all"
                    >
                      <X className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
            <div className="flex-1" />
            <div className="flex items-center gap-2 px-3 shrink-0">
              <span className={`text-[11px] font-code font-bold tracking-wider uppercase ${langColor(currentFileObj.language)}`}>
                {currentFileObj.language}
              </span>
              <div className="h-3 w-px bg-[#F8F4E8]/10" />
              <span className="text-[11px] font-code text-[#F8F4E8]/35">Ln {lineCount}</span>
            </div>
          </div>

          {/* ── Active Step Instruction Bar ── */}
          {currentStep && (
            <div className={`shrink-0 px-5 py-4 border-b-4 transition-all duration-500 bg-[#D2E823] border-[#09090B] text-[#09090B] shadow-brutal brutal-shadow`}>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-6 h-6 rounded bg-black border-2 border-black flex items-center justify-center shrink-0 text-[11px] font-black font-code text-[#D2E823]">
                  {stepSuccessFlash ? <CheckCircle2 className="w-3.5 h-3.5 text-[#D2E823]" /> : currentStep.stepNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 justify-between">
                    <p className="text-[11px] font-code font-black tracking-widest text-[#09090B] uppercase">
                      {stepSuccessFlash ? currentStep.successMessage : `⚡ MISSION STEP ${currentStep.stepNumber}: ${currentStep.title.toUpperCase()}`}
                    </p>
                    {currentStep.targetFile !== activeFile && !stepSuccessFlash && (
                      <button
                        onClick={() => openFile(currentStep.targetFile)}
                        className="text-[11px] font-code text-[#D2E823] bg-[#09090B] border-2 border-[#09090B] px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 btn-press-sm shadow-brutal-glass-sm"
                      >
                        <Target className="w-2.5 h-2.5 text-[#D2E823]" />
                        Go to {currentStep.targetFile}
                      </button>
                    )}
                  </div>
                  {!stepSuccessFlash && (
                    <p className="text-sm font-body font-bold text-[#09090B] mt-1.5 leading-relaxed">
                      {currentStep.instruction}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Editor Top Bar */}
          <div className="shrink-0 flex items-center justify-between px-4 py-2 bg-black/30 backdrop-blur-md border-b border-[#F8F4E8]/10 select-none">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#D2E823]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#F8F4E8]" />
              </div>
              <div className="flex items-center gap-1.5 bg-[#141418] border border-[#F8F4E8]/10 px-2.5 py-0.5 rounded-md">
                <Terminal className="w-3 h-3 text-[#D2E823]" />
                <span className="text-[11px] font-code text-[#F8F4E8]/40 tracking-wider">SYNTAXKNIGHT_IDE v4.0</span>
              </div>
            </div>
            {/* Hint button */}
            {currentStep && currentStep.hints.length > 0 && revealedHintLevel < currentStep.hints.length && (
              <button
                onClick={revealNextHint}
                className="flex items-center gap-1.5 text-[11px] font-code font-bold text-[#09090B] bg-[#D2E823] border-2 border-[#D2E823] px-3 py-1 rounded-lg transition-all cursor-pointer btn-press-sm shadow-brutal-glass-sm"
              >
                <Lightbulb className="w-3 h-3" />
                HINT ({revealedHintLevel}/{currentStep.hints.length})
              </button>
            )}
          </div>

          {/* ── Hint Panel ── */}
          {revealedHintLevel > 0 && currentStep && (
            <div className="shrink-0 max-h-[120px] overflow-y-auto bg-[#141418] border-b-2 border-[#D2E823]/20 px-4 py-2.5 space-y-1.5 animate-fade-up text-[#D2E823]">
              <div className="flex items-center justify-between text-[11px] font-code font-bold tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" />
                  ORACLE CLUES
                </span>
                <span className="text-[11px] bg-[#D2E823]/10 border border-[#D2E823]/30 px-2 py-0.5 rounded">
                  -{totalHintPenalty} XP
                </span>
              </div>
              {currentStep.hints.slice(0, revealedHintLevel).map((hint, i) => (
                <div key={i} className="text-[12px] font-code text-[#F8F4E8]/70 leading-relaxed pl-4 border-l-2 border-[#D2E823]/30">
                  <span className="text-[#D2E823] font-bold">Hint {hint.level}:</span>{' '}
                  <span style={{ whiteSpace: 'pre-wrap' }}>{hint.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Code Editor with Line Numbers ── */}
          <motion.div
            animate={compileStatus === 'error' ? {
              x: [-10, 10, -10, 10, 0],
              borderColor: "#DC2626"
            } : compileStatus === 'success' ? {
              x: 0,
              borderColor: "#D2E823"
            } : {
              x: 0,
              borderColor: "rgba(248, 244, 232, 0.1)"
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex overflow-hidden border-2 border-[#09090B]/20 rounded-lg min-h-0 mx-4 mt-1 mb-3 bg-[#141418]/80 backdrop-blur-md"
          >
            <div
              ref={lineNumberRef}
              className={`w-12 py-3 overflow-hidden shrink-0 select-none border-r transition-all duration-500 bg-[#0d0d10] border-[#F8F4E8]/5`}
            >
              {lines.map((n) => (
                <div
                  key={n}
                  className={`px-2 text-right text-[13px] font-code leading-[1.65] ${
                    gutterError ? 'text-[#DC2626] font-bold' : 'text-[#F8F4E8]/20'
                  }`}
                >
                  {n}
                </div>
              ))}
            </div>
            <textarea
              key={`${activeFile}-${shakeKey}`}
              ref={textareaRef}
              value={currentContent}
              onChange={(e) => updateFile(e.target.value)}
              onScroll={handleScroll}
              spellCheck={false}
              className="flex-1 bg-transparent text-[15px] font-code text-[#D2E823] p-3 leading-[1.65] resize-none focus:outline-none overflow-auto min-h-0 placeholder-[#F8F4E8]/15 caret-[#D2E823]"
              placeholder="// Start coding..."
            />
          </motion.div>

          {/* ── Error Panel ── */}
          {compileStatus === 'error' && compileError && (
            <div className="shrink-0 bg-[#0e0608] border-t border-[#DC2626]/20 px-4 py-2.5 animate-fade-up">
              <div className="flex items-center gap-2 text-[12px] font-code text-[#DC2626]">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span className="font-bold tracking-wider">COMPILATION FAILED</span>
              </div>
              <p className="text-[12px] font-code text-[#DC2626]/80 mt-1 leading-relaxed pl-5">
                {compileError}
              </p>
            </div>
          )}

          {compileStatus === 'success' && (
            <div className="shrink-0 bg-[#D2E823]/10 border-t border-[#D2E823]/20 px-4 py-2 flex items-center gap-2 text-[12px] font-code text-[#D2E823]">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="font-bold tracking-wider">
                {stepSuccessFlash ? currentStep?.successMessage : 'BUILD PASSED — Step validated successfully.'}
              </span>
            </div>
          )}

          {/* ── Compile Button ── */}
          <div className="shrink-0 px-4 py-3 border-t border-[#F8F4E8]/5 bg-[#09090B]">
            <button
              onClick={handleCompile}
              disabled={isCompiling}
              className="w-full flex items-center justify-center gap-2.5 bg-[#D2E823] disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-display text-xs tracking-wider text-[#09090B] border-2 border-[#D2E823] transition-all cursor-pointer btn-press shadow-brutal-glass-sm"
            >
              {isCompiling ? (
                <>
                  <Settings className="w-4 h-4 animate-spin text-[#09090B]" />
                  COMPILING ENGINE FILES...
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 text-[#09090B]" />
                  COMPILE ALL ENGINE FILES ⚙️
                </>
              )}
            </button>
          </div>
        </main>

        {/* ────────────────────────────────────
           PANEL 3: LIVE PREVIEW (40%)
           ──────────────────────────────────── */}
        <section className="flex-1 flex flex-col overflow-hidden glass-outer border-l border-black/10 shadow-brutal-glass-lg text-[#09090B]">
          <div className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-transparent border-b border-[#09090B]/10">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#09090B]" />
              <span className="text-[9px] font-code font-bold text-[#09090B]/60 tracking-[0.15em] uppercase">
                Interactive Preview Canvas
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-code text-[#09090B]/40">
              <div className={`w-1.5 h-1.5 rounded-sm bg-[#D2E823] border border-[#09090B] ${
                isCompiling ? 'animate-pulse' : 'animate-acid-pulse'
              }`} />
              {isCompiling ? 'REBUILDING...' : 'LIVE'}
            </div>
          </div>

          <div className="flex-1 p-3 overflow-hidden min-h-0">
            <div className="h-full bg-white/40 backdrop-blur-sm border-2 border-[#09090B] rounded-xl overflow-hidden flex flex-col shadow-brutal-glass">
              {/* Browser chrome */}
              <div className="shrink-0 flex items-center gap-2 px-3 py-2 bg-transparent border-b border-[#09090B]/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-[#DC2626] border border-[#09090B]" />
                  <div className="w-2 h-2 rounded-sm bg-[#D2E823] border border-[#09090B]" />
                  <div className="w-2 h-2 rounded-sm bg-[#09090B] border border-[#09090B]" />
                </div>
                <div className="flex-1 glass-inner border border-[#09090B]/20 rounded-lg px-3 py-0.5 mx-2 select-all text-[#09090B]">
                  <span className="text-[9px] font-code text-[#09090B]/55">
                    https://cyberpunk-portfolio.syntaxknight.dev
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-auto min-h-0 relative">
                {/* Floating celebration particles */}
                <AnimatePresence>
                  {compileStatus === 'success' && (
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

                {isCompiling ? (
                  <div className="flex-1 flex flex-col items-center justify-center h-full gap-4">
                    <Settings className="w-8 h-8 text-[#09090B] animate-spin" />
                    <div className="space-y-2 text-center">
                      <p className="text-xs font-code font-bold text-[#09090B] tracking-wider">COMPILING MODULES...</p>
                      <div className="w-40 h-2.5 bg-white/20 backdrop-blur-sm border-2 border-[#09090B] rounded-sm overflow-hidden mx-auto">
                        <div className="h-full bg-[#D2E823] animate-pulse" style={{ width: '60%' }} />
                      </div>
                      <p className="text-[10px] font-code text-[#09090B]/50 font-bold">
                        Validating step {currentStep?.stepNumber} of {activeProject.steps.length}...
                      </p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    key={previewKey}
                    srcDoc={generateProjectPreview(activeProject.previewGenerator, fileContents)}
                    title="Full Website Interactive Preview"
                    className="w-full h-full border-0 bg-transparent relative z-20"
                    sandbox="allow-same-origin allow-scripts"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 px-4 py-2 bg-transparent border-t-2 border-[#09090B]/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 text-[9px] font-code text-[#09090B]/40">
              <div className={`w-2 h-2 rounded-sm border border-[#09090B] ${
                isProjectComplete ? 'bg-[#D2E823]' :
                compileStatus === 'success' ? 'bg-[#D2E823]' :
                compileStatus === 'error' ? 'bg-[#DC2626]' :
                'bg-[#E8E4D8]'
              }`} />
              {isProjectComplete ? 'RENDER: DEPLOYED' :
               compileStatus === 'success' ? `STEP ${currentStep?.stepNumber} PASSED` :
               compileStatus === 'error' ? 'RENDER: FAILED' :
               'AWAITING COMPILATION...'}
            </div>
            <div className="flex items-center gap-2 text-[9px] font-code text-[#09090B]/40">
              <span>{activeProject.files.length} modules</span>
              <div className="h-3 w-px bg-[#09090B]/10" />
              <span>step {currentStepIndex + 1}/{activeProject.steps.length}</span>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════
         PROJECT COMPLETION MODAL
         ═══════════════════════════════════════ */}
      <AnimatePresence>
        {isProjectComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative glass-outer rounded-xl p-8 sm:p-10 max-w-lg w-[92%] text-center overflow-hidden shadow-brutal-glass-xl text-[#09090B]"
            >
              <div className="mx-auto w-20 h-20 rounded-xl bg-[#D2E823] border-4 border-[#09090B] flex items-center justify-center mb-6 shadow-brutal-glass-sm"
                >
                <Trophy className="w-10 h-10 text-[#09090B]" />
              </div>

              <h2 className="font-display text-3xl tracking-tight text-[#09090B]">
                PROJECT SUCCESSFULLY COMPILED!
              </h2>

              <p className="text-sm text-[#09090B]/70 mt-3 leading-relaxed max-w-md mx-auto font-body">
                Website is now fully responsive and deployment ready.
                Your <span className="text-[#09090B] font-bold">{activeProject.title}</span> is pixel-perfect.
              </p>

              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="px-5 py-2.5 bg-[#D2E823] border-2 border-[#09090B] rounded-lg shadow-brutal-glass-sm">
                  <span className="text-sm font-code font-bold text-[#09090B] tracking-wider">
                    +{activeProject.totalXP} XP!
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-5 gap-1.5">
                {activeProject.steps.map((step) => (
                  <div key={step.id} className="glass-inner border border-[#09090B]/20 rounded-lg p-1.5 text-center shadow-brutal-glass-sm text-[#09090B]">
                    <p className="text-[8px] font-code font-bold text-[#09090B]">S{step.stepNumber}</p>
                    <p className="text-[7px] font-code text-[#09090B]/60 truncate mt-0.5">✓ Pass</p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-[#09090B]/50 mt-5 leading-relaxed font-body">
                All {activeProject.steps.length} milestones cleared. All {activeProject.files.length} modules compiled.
                The <span className="text-[#09090B] font-bold">Digital Kingdom</span> acknowledges your React dynamic kingdom mastery.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <button
                  onClick={() => setIsProjectComplete(false)}
                  className="flex-grow px-5 py-3 text-xs font-code font-bold text-[#09090B] glass-inner rounded-lg hover:bg-white/20 transition-colors cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  CONTINUE EDITING
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-grow px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-press shadow-brutal-glass-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  RETURN TO HQ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ReactPlayground;
