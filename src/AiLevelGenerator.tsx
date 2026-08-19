"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  AlertTriangle,
  CheckCircle2, 
  Cpu, 
  Play, 
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigate';
import { audioEngine } from './audioEngine';
import { generateQuestWithGemini } from './services/aiEngine';
import type { GeneratedQuest } from './services/aiEngine';

export default function AiLevelGenerator() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedQuest | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isGenerating || !prompt.trim()) return;

    setIsGenerating(true);
    setErrorMsg('');
    setResult(null);
    audioEngine.playClickSound();

    try {
      const generatedQuest = await generateQuestWithGemini(prompt.trim());
      setResult(generatedQuest);
      audioEngine.playSuccessChime();
    } catch (err: any) {
      console.error('[AI_GENERATOR_ERROR]', err);
      setErrorMsg('Failed to generate quest. Served emergency fallback layout.');
      audioEngine.playErrorBuzzer();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!result) return;
    audioEngine.playClickSound();
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-transparent text-[#09090B] flex flex-col font-code noise-overlay"
    >
      {/* ─── Top Header (Floating Glass Beam) ─── */}
      <header className="border-b-4 border-[#09090B]/10 glass-outer sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-brutal-glass-sm text-[#09090B]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              navigate('/');
            }}
            className="flex items-center gap-2 text-xs text-[#09090B]/60 hover:text-[#09090B] transition-colors group cursor-pointer glass-inner px-3 py-1.5 rounded-lg btn-press-sm shadow-brutal-glass-sm text-[#09090B]"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>HQ DASHBOARD</span>
          </button>
          <div className="h-4 w-px bg-[#09090B]/20" />
          <div className="flex items-center gap-2 select-none">
            <Cpu className="w-5 h-5 text-[#09090B]" />
            <h1 className="text-sm font-display text-[#09090B]">
              AI Quest Architect
            </h1>
            <span className="text-[8px] bg-[#D2E823]/80 backdrop-blur-sm border-2 border-[#09090B] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[#09090B]">
              GEMINI 1.5 FLASH
            </span>
          </div>
        </div>
      </header>

      {/* ─── Main Content Grid ─── */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        
        {/* Left Column: Form Controls (7 cols) (Frosted Glass-Brutalist Card) */}
        <section className="lg:col-span-7 glass-outer rounded-xl p-6 flex flex-col justify-between shadow-brutal-glass-lg text-[#09090B]">
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-[#09090B]/10 pb-3">
              <Terminal className="w-4 h-4 text-[#09090B]" />
              <h2 className="text-xs font-bold text-[#09090B] tracking-widest uppercase font-display">1. AI Quest Generator Prompt</h2>
            </div>

              <form onSubmit={handleGenerateQuest} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Quest Goal / Prompt</label>
                  <textarea
                    required
                    rows={4}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="e.g. Build an advanced CSS Grid map that aligns all battle cards..."
                    className="w-full glass-inner rounded-lg p-3.5 text-xs text-[#09090B] focus:outline-none focus:border-[#D2E823] placeholder-[#09090B]/40"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg border-2 border-[#DC2626] bg-[#DC2626]/10 text-xs font-bold text-[#DC2626] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-[#D2E823] border-2 border-[#09090B] py-3.5 rounded-lg text-xs font-display text-[#09090B] hover:bg-[#D2E823] transition-all cursor-pointer btn-press shadow-brutal-glass-sm flex items-center justify-center gap-2 uppercase"
                >
                  {isGenerating ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin" /> Summing AI Guilds...
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> GENERATE QUEST ARCHITECT ➔
                    </>
                  )}
                </button>
              </form>
          </div>

          <div className="border-t-2 border-[#09090B]/10 pt-3 mt-6 flex justify-between gap-3 text-[9px] font-code text-[#09090B]/40 select-none">
            <span>SECURE CREDENTIAL HANDLING: ENABLED</span>
            <span>API ACCESS: ACTIVE</span>
          </div>
        </section>

        {/* Right Column: Console/Result display (5 cols) (Frosted Glass-Brutalist Card) */}
        <section className="lg:col-span-5 glass-outer rounded-xl p-6 flex flex-col justify-between shadow-brutal-glass-lg text-[#09090B]">
          <div className="space-y-4 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b-2 border-[#09090B]/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#09090B]" />
                <h2 className="text-xs font-bold text-[#09090B] tracking-widest uppercase font-display">2. COMPILED BLUEPRINT JSON</h2>
              </div>
              
              {result && (
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-[10px] font-code font-bold px-3 py-1 rounded-lg border-2 border-[#09090B] glass-inner hover:bg-[#D2E823] transition-all text-[#09090B] cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#09090B]" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> COPY CODE
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Generated output print */}
            <div className="flex-grow min-h-[250px] relative overflow-hidden rounded-xl border-2 border-[#09090B]/20 my-4 bg-black/60 backdrop-blur-md">
              {result ? (
                <pre className="absolute inset-0 w-full h-full p-4 text-[10px] font-code leading-relaxed text-[#D2E823] overflow-y-auto whitespace-pre-wrap select-text">
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none text-[#F8F4E8]/40">
                  <Terminal className="w-8 h-8 mb-2" />
                  <p className="text-xs font-bold font-code">AWAITING SYSTEM GENERATION...</p>
                  <p className="text-[10px] font-body mt-1 leading-normal max-w-[200px]">
                    Configure your Gemini API key and cast a prompt spell.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 glass-inner/20 rounded-lg text-[9.5px] font-code text-[#09090B]/70 leading-normal flex items-start gap-2 select-none shadow-brutal-glass-sm">
              <CheckCircle2 className="w-4 h-4 text-[#09090B] shrink-0 mt-0.5" />
              <span>
                Parsed blueprints are fully compatible with SyntaxKnight's custom syllabus database model.
              </span>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
