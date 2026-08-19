"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getChallengeById, getNextChallenge, getPrevChallenge, ChallengeItem } from '@/data/challenges';
import { evaluateCode } from '@/lib/evaluator';
import { audioEngine } from '@/audioEngine';
import { useGame } from '@/GameContext';
import { motion } from 'framer-motion';
import {
  Code,
  ArrowLeft,
  ChevronRight,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Bot
} from 'lucide-react';

export default function DynamicChallengePage() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || '';

  const { completeMission, addXP, completedMissions } = useGame();

  const [challenge, setChallenge] = useState<ChallengeItem | undefined>(undefined);
  const [nextChallenge, setNextChallenge] = useState<ChallengeItem | undefined>(undefined);
  const [prevChallenge, setPrevChallenge] = useState<ChallengeItem | undefined>(undefined);

  const [userCode, setUserCode] = useState<string>('');
  const [codexTab, setCodexTab] = useState<'analogy' | 'blueprint' | 'deep'>('analogy');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [diagnosticsStatus, setDiagnosticsStatus] = useState<'idle' | 'compiling' | 'success' | 'failed'>('idle');
  const [diagnosticsMsg, setDiagnosticsMsg] = useState<string>('Workspace ready. Enter your code incantation.');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!rawId) return;
    const found = getChallengeById(rawId);
    setChallenge(found);
    if (found) {
      setUserCode(found.initialCode);
      setNextChallenge(getNextChallenge(found.id));
      setPrevChallenge(getPrevChallenge(found.id));
      setDiagnosticsStatus('idle');
      setDiagnosticsMsg('Workspace initialized. Ready for code verification.');
      setIsSuccess(completedMissions.includes(found.id));
      setShowHint(false);
    }
  }, [rawId, completedMissions]);

  // ── Clean 404 / Fallback State ──
  if (!challenge) {
    return (
      <div className="min-h-screen bg-[#F8F4E8] flex flex-col items-center justify-center p-6 text-[#09090B]">
        <div className="glass-outer max-w-md w-full p-8 rounded-2xl shadow-brutal-glass-lg text-center space-y-6">
          <div className="w-16 h-16 bg-[#DC2626]/10 border-2 border-[#DC2626] rounded-full flex items-center justify-center mx-auto text-[#DC2626]">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-display text-xl uppercase tracking-tight">Challenge Not Found</h1>
            <p className="text-xs font-body text-slate-600 mt-2">
              No code mission matching ID <code className="bg-black/10 px-1 py-0.5 rounded font-code">{rawId}</code> exists in the SyntaxKnight archives.
            </p>
          </div>
          <button
            onClick={() => {
              audioEngine.playClickSound();
              router.push('/');
            }}
            className="w-full py-3 bg-[#D2E823] border-2 border-[#09090B] rounded-lg font-display text-xs text-[#09090B] shadow-brutal-glass-sm btn-press uppercase font-bold"
          >
            [ RETURN TO ROADMAP HUB ]
          </button>
        </div>
      </div>
    );
  }

  // ── Compile & Verify Handler ──
  const handleCompile = async () => {
    if (diagnosticsStatus === 'compiling') return;
    audioEngine.playClickSound();
    setDiagnosticsStatus('compiling');
    setDiagnosticsMsg('Running AST syntax check & structure validation...');

    setTimeout(() => {
      const evalResult = evaluateCode(userCode, challenge.validationRegex, challenge.worldName);

      if (evalResult.isCorrect) {
        audioEngine.playSuccessChime();
        setDiagnosticsStatus('success');
        setDiagnosticsMsg('✔ ALL CONSTRAINTS SATISFIED — Syntax & Structure Validated!');
        setIsSuccess(true);
        if (!completedMissions.includes(challenge.id)) {
          addXP(100);
          completeMission(challenge.id, false, 0);
        }
      } else {
        audioEngine.playErrorBuzzer();
        setDiagnosticsStatus('failed');
        setDiagnosticsMsg(evalResult.errorMsg || 'Syntax validation failed. Check your code structure.');
      }
    }, 600);
  };

  const lineCount = userCode.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 12) }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#F8F4E8] p-3 sm:p-4 lg:p-6 text-[#09090B] flex flex-col gap-4 sm:gap-6">
      {/* Top Header Strip */}
      <div className="glass-outer rounded-xl p-3 sm:p-4 shadow-brutal-glass flex flex-wrap justify-between items-center gap-3 sm:gap-4 select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              router.push('/');
            }}
            className="p-2.5 glass-inner rounded-lg border border-[#09090B]/20 hover:bg-[#D2E823]/20 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-[#09090B]" />
          </button>
          <div>
            <span className="text-[10px] font-code font-bold text-[#09090B]/50 block uppercase">
              WORLD: {challenge.worldName.toUpperCase()}
            </span>
            <h1 className="font-display text-xs sm:text-sm tracking-tight text-[#09090B] uppercase">
              LEVEL {challenge.levelNumber}: {challenge.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {prevChallenge && (
            <button
              onClick={() => {
                audioEngine.playClickSound();
                router.push(`/challenge/${prevChallenge.id}`);
              }}
              className="px-3 py-2 glass-inner border border-[#09090B]/20 rounded text-[10px] font-code font-bold text-[#09090B] btn-press uppercase min-h-[44px]"
            >
              ‹ PREV
            </button>
          )}
          {nextChallenge && (
            <button
              onClick={() => {
                audioEngine.playClickSound();
                router.push(`/challenge/${nextChallenge.id}`);
              }}
              className="px-3.5 py-2 bg-[#D2E823] border border-[#09090B] rounded text-[10px] font-display font-bold text-[#09090B] btn-press uppercase min-h-[44px]"
            >
              NEXT ›
            </button>
          )}
        </div>
      </div>

      {/* Main 3-Column Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-grow">

        {/* Left Column: Codex Instructions & Study Tabs */}
        <aside className="lg:col-span-4 glass-outer rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-brutal-glass text-[#09090B]">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-[#09090B]/10 pb-3 select-none">
              <span className="text-[10px] font-code font-bold bg-[#D2E823]/80 border border-[#09090B] px-2 py-0.5 rounded uppercase">
                {challenge.tier.toUpperCase()} TIER
              </span>
              {isSuccess && (
                <span className="text-[10px] font-code font-bold px-2 py-0.5 bg-emerald-100 border border-emerald-500 text-emerald-800 rounded uppercase">
                  ✔ COMPLETED
                </span>
              )}
            </div>

            {/* Instruction Card */}
            <div className="p-3.5 sm:p-4 bg-[#D2E823]/10 border border-[#D2E823]/30 rounded-xl shadow-sm select-text">
              <span className="text-[10px] font-code font-bold text-[#88a000] tracking-widest block mb-1.5 uppercase flex items-center gap-1">
                ⚡ EXERCISE INSTRUCTION
              </span>
              <p className="text-xs sm:text-sm font-body font-semibold leading-relaxed text-slate-900">
                {challenge.instructions}
              </p>
            </div>

            {/* Codex Tabs */}
            <div className="flex gap-0.5 select-none pt-2 flex-wrap">
              {[
                { key: 'analogy', label: 'ANALOGY' },
                { key: 'blueprint', label: 'BLUEPRINT' },
                { key: 'deep', label: 'DEEP DIVE' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    audioEngine.playClickSound();
                    setCodexTab(tab.key as any);
                  }}
                  className={`folder-tab text-[10px] sm:text-[11px] font-code font-bold py-2 px-3 cursor-pointer min-h-[38px] ${
                    codexTab === tab.key ? 'folder-tab-active' : 'folder-tab-inactive'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="glass-inner p-4 rounded-b-lg rounded-tr-lg min-h-[140px] text-xs sm:text-sm font-body leading-relaxed select-text">
              {codexTab === 'analogy' && <p>{challenge.codex.analogy}</p>}
              {codexTab === 'blueprint' && (
                <pre className="bg-[#09090B] text-[#D2E823] p-3 rounded font-code text-[11px] sm:text-xs overflow-x-auto border border-[#09090B] whitespace-pre">
                  {challenge.codex.blueprint.replace(/```[a-z]*/g, '').replace(/\\n/g, '\n')}
                </pre>
              )}
              {codexTab === 'deep' && <p>{challenge.codex.deepDive}</p>}
            </div>

            {/* Hint Toggle */}
            <div className="pt-2">
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setShowHint(!showHint);
                }}
                className="text-[11px] sm:text-xs font-code font-bold text-[#09090B] flex items-center gap-1.5 cursor-pointer hover:underline min-h-[36px]"
              >
                <Lightbulb className="w-3.5 h-3.5 text-yellow-600" />
                {showHint ? 'Hide Oracle Clue' : 'Reveal Oracle Clue'}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-300 rounded text-xs font-code text-yellow-900 select-text leading-relaxed">
                  {challenge.hint}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Center Column: Live Code Editor */}
        <main className="lg:col-span-5 glass-outer rounded-2xl p-0 flex flex-col justify-between overflow-hidden shadow-brutal-glass-lg bg-[#09090B] text-[#D2E823] min-h-[340px] lg:min-h-0">
          {/* Top Bar */}
          <div className="p-3 bg-black/60 border-b border-white/10 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-[#D2E823]" />
              <span className="text-[10px] sm:text-[11px] font-code font-bold uppercase text-white/80">
                SOLUTION_EDITOR.TS
              </span>
            </div>
            <button
              onClick={() => {
                audioEngine.playClickSound();
                setUserCode(challenge.initialCode);
                setDiagnosticsStatus('idle');
              }}
              className="text-[10px] font-code text-white/60 hover:text-white flex items-center gap-1 cursor-pointer min-h-[36px] px-2"
            >
              <RotateCcw className="w-3 h-3" /> RESET CODE
            </button>
          </div>

          {/* Textarea Code Block */}
          <div className="flex-grow flex min-h-[220px] overflow-hidden">
            {/* Gutter */}
            <div className="w-9 sm:w-10 bg-black/40 border-r border-white/10 py-3 select-none flex flex-col items-end pr-2 gap-[2px] shrink-0">
              {lineNumbers.map((num) => (
                <span key={num} className="text-[11px] font-code text-[#F8F4E8]/25">{num}</span>
              ))}
            </div>
            {/* Input with overflow-x-auto */}
            <textarea
              value={userCode}
              onChange={(e) => {
                setUserCode(e.target.value);
                if (diagnosticsStatus === 'failed') setDiagnosticsStatus('idle');
              }}
              spellCheck={false}
              className="flex-grow bg-transparent text-[#D2E823] p-3 focus:outline-none font-mono text-[13px] sm:text-[14px] leading-relaxed resize-none caret-[#D2E823] overflow-x-auto whitespace-pre"
              placeholder="// Write your code incantation here..."
            />
          </div>

          {/* Submit Action Bar */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-black/30">
            <button
              onClick={handleCompile}
              disabled={diagnosticsStatus === 'compiling'}
              className="w-full py-3 bg-[#D2E823] border-2 border-[#D2E823] rounded-lg text-xs sm:text-sm font-display text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer flex items-center justify-center gap-2 select-none font-bold min-h-[48px]"
            >
              {diagnosticsStatus === 'compiling' ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" /> Verifying Code AST...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> COMPILE & VERIFY CODE ⚡
                </>
              )}
            </button>
          </div>
        </main>

        {/* Right Column: Diagnostics & Next Navigation */}
        <section className="lg:col-span-3 glass-outer rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-brutal-glass text-[#09090B] min-h-[220px] lg:min-h-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-[#09090B]/10 pb-3 select-none">
              <Sparkles className="w-4 h-4 text-[#09090B]" />
              <h3 className="text-xs font-bold text-[#09090B] tracking-wider uppercase font-display">Diagnostics</h3>
            </div>

            <div className="select-none">
              <span className="text-[10px] font-code text-[#09090B]/50 block mb-1">COMPILATION STATE:</span>
              <span className={`text-[10px] font-code font-bold px-2 py-0.5 border-2 rounded uppercase tracking-wider ${
                diagnosticsStatus === 'success' ? 'bg-emerald-100 border-emerald-600 text-emerald-800' :
                diagnosticsStatus === 'failed' ? 'bg-red-100 border-red-600 text-red-800' :
                diagnosticsStatus === 'compiling' ? 'bg-yellow-100 border-yellow-500 text-yellow-800' :
                'bg-white/40 border-[#09090B]/20 text-[#09090B]/60'
              }`}>
                {diagnosticsStatus}
              </span>
            </div>

            <div className="p-3 glass-inner rounded-lg text-xs font-code select-text leading-relaxed">
              {diagnosticsMsg}
            </div>

            {isSuccess && nextChallenge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 sm:p-4 bg-emerald-50 border-2 border-emerald-600 rounded-xl space-y-3 select-none"
              >
                <div className="flex items-center gap-2 text-emerald-800 font-display text-xs uppercase">
                  <Trophy className="w-4 h-4 text-emerald-600" /> MISSION CLEARED! +100 XP
                </div>
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    router.push(`/challenge/${nextChallenge.id}`);
                  }}
                  className="w-full py-2.5 bg-emerald-600 border border-emerald-800 text-white rounded text-xs font-display font-bold btn-press cursor-pointer uppercase flex items-center justify-center gap-1 min-h-[44px]"
                >
                  CONTINUE TO NEXT LEVEL <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
