"use client";

import { useState } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Terminal,
  Cpu,
  Copy,
  Check,
  FileCode,
  BookOpen,
  Code2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { audioEngine } from './audioEngine';

interface CodexData {
  analogy: string;
  blueprint: string;
  deepDive: string;
}

interface QuestBlueprint {
  id: string;
  levelNumber: number;
  title: string;
  tier: 'Beginner' | 'Intermediate' | 'Grandmaster';
  targetFile: string;
  codex: CodexData;
  instructions: string;
  initialCode: string;
  validationRegex: string;
  hint: string;
}

const DEFAULT_BLUEPRINT: QuestBlueprint = {
  id: 'html-headers-01',
  levelNumber: 1,
  title: 'Holographic Beacon',
  tier: 'Beginner',
  targetFile: 'index.html',
  codex: {
    analogy: 'Think of heading tags as beacon signals of descending magnitude. An <h1> is the massive mothership homing flare, while <h6> is a tiny pocket tracking beacon.',
    blueprint: '```html\n<h1>Mothership Beacon</h1>\n<h2>Sub-command Center</h2>\n```',
    deepDive: 'Use exactly one <h1> per viewport interface context for optimal search crawler navigation routing. Always close tags to avoid DOM tree leakage.'
  },
  instructions: 'Generate a top-level primary beacon. Construct an <h1> tag containing the exact text "MOTHERSHIP BEACON" and close the tag.',
  initialCode: '<!-- Boot up the main beacon element below -->\n',
  validationRegex: '<h1>MOTHERSHIP BEACON</h1>',
  hint: 'Create a standard heading tag using the number 1 and write the target text in uppercase.'
};

export default function QuestCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState<QuestBlueprint>(DEFAULT_BLUEPRINT);
  
  // Sandbox tester state
  const [sandboxCode, setSandboxCode] = useState<string>('<h1>MOTHERSHIP BEACON</h1>');
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'passed' | 'failed' | 'error'; message: string }>({
    status: 'idle',
    message: 'Enter test code and click TEST REGEX'
  });

  // Output JSON state
  const [generatedJson, setGeneratedJson] = useState<string>('// Click "GENERATE BLUEPRINT JSON 📜" to compile active form inputs...');
  const [copied, setCopied] = useState<boolean>(false);

  // Compile form inputs into JSON
  const handleGenerateJson = () => {
    audioEngine.playClickSound();
    setGeneratedJson(JSON.stringify(form, null, 2));
  };

  const handleInputChange = (field: keyof QuestBlueprint, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCodexChange = (subField: keyof CodexData, value: string) => {
    setForm(prev => ({
      ...prev,
      codex: { ...prev.codex, [subField]: value }
    }));
  };

  // Test Regex against Sandbox code
  const handleTestRegex = () => {
    audioEngine.playClickSound();
    const pattern = form.validationRegex.trim();
    if (!pattern) {
      setTestResult({
        status: 'error',
        message: 'Regex pattern is empty!'
      });
      audioEngine.playErrorBuzzer();
      return;
    }

    try {
      // Safe regex compilation
      const regex = new RegExp(pattern, 'i');
      const passed = regex.test(sandboxCode);

      if (passed) {
        setTestResult({
          status: 'passed',
          message: 'SUCCESS: Sandbox code matches the verification pattern!'
        });
        audioEngine.playSuccessChime();
      } else {
        setTestResult({
          status: 'failed',
          message: 'FAIL: Sandbox code does not match the verification pattern.'
        });
        audioEngine.playErrorBuzzer();
      }
    } catch (err: any) {
      setTestResult({
        status: 'error',
        message: `REGEX COMPILATION ERROR: ${err.message}`
      });
      audioEngine.playErrorBuzzer();
    }
  };

  // Copy blueprint JSON to clipboard
  const handleCopyToClipboard = () => {
    audioEngine.playClickSound();
    navigator.clipboard.writeText(generatedJson)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
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
      {/* ─── Top Header ─── */}
      <header className="border-b-2 border-[#09090B]/10 glass-outer sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-brutal-glass-sm text-[#09090B]">
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
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#09090B]" />
            <h1 className="text-sm font-display text-[#09090B]">
              Visual Quest Creator
            </h1>
            <span className="text-[8px] bg-[#D2E823] border-2 border-[#09090B] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              ADMIN TOOL
            </span>
          </div>
        </div>
      </header>

      {/* ─── Main Content Grid ─── */}
      <div className="flex-grow grid grid-cols-1 xl:grid-cols-12 gap-6 p-6">
        
        {/* ───────── LEFT SECTION: Form Inputs (7 Cols) ───────── */}
        <section className="xl:col-span-7 glass-outer rounded-xl p-6 space-y-6 overflow-y-auto shadow-brutal-glass-lg text-[#09090B]">
          <div className="flex items-center gap-2 border-b-2 border-[#09090B]/10 pb-3">
            <Terminal className="w-4 h-4 text-[#09090B]" />
            <h2 className="text-xs font-bold text-[#09090B] tracking-widest uppercase font-display">1. QUEST CONFIGURATION</h2>
          </div>

          {/* Row 1: Title, ID, Number, Tier */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Quest ID</label>
              <input
                type="text"
                value={form.id}
                onChange={e => handleInputChange('id', e.target.value)}
                className="w-full glass-inner rounded-lg px-3 py-2 text-xs text-[#09090B] font-semibold focus:outline-none focus:border-[#D2E823]"
              />
            </div>
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Level Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => handleInputChange('title', e.target.value)}
                className="w-full glass-inner rounded-lg px-3 py-2 text-xs text-[#09090B] focus:outline-none focus:border-[#D2E823]"
              />
            </div>
            <div className="md:col-span-1 space-y-1.5">
              <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">LVL No.</label>
              <input
                type="number"
                value={form.levelNumber}
                onChange={e => handleInputChange('levelNumber', parseInt(e.target.value) || 1)}
                className="w-full glass-inner rounded-lg px-2 py-2 text-xs text-center focus:outline-none focus:border-[#D2E823]"
              />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Tier</label>
              <select
                value={form.tier}
                onChange={e => handleInputChange('tier', e.target.value)}
                className="w-full glass-inner rounded-lg px-2 py-2 text-xs text-[#09090B] focus:outline-none focus:border-[#D2E823] cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Grandmaster">Grandmaster</option>
              </select>
            </div>
          </div>

          {/* Row 2: Target File */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Target File (IDE context)</label>
            <input
              type="text"
              value={form.targetFile}
              onChange={e => handleInputChange('targetFile', e.target.value)}
              placeholder="e.g. App.tsx, index.html, styles.css"
              className="w-full glass-inner rounded-lg px-3 py-2 text-xs text-[#09090B] focus:outline-none focus:border-[#D2E823]"
            />
          </div>

          {/* Row 3: 3-Layer Codex */}
          <div className="space-y-4 glass-inner p-4 rounded-xl shadow-brutal-glass-sm text-[#09090B]">
            <div className="flex items-center gap-1.5 border-b border-[#09090B]/10 pb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#D2E823]" />
              <h3 className="text-[10px] font-bold text-[#09090B]/60 uppercase tracking-wider">3-Layer Codex Documentation</h3>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] text-[#09090B]/60 uppercase tracking-wider block font-bold">🔮 Analogy (Metaphors & Lore)</label>
              <textarea
                value={form.codex.analogy}
                onChange={e => handleCodexChange('analogy', e.target.value)}
                rows={3}
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-[#09090B] rounded-lg p-3 text-xs leading-relaxed text-[#09090B] focus:outline-none focus:border-[#D2E823] resize-y font-body"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] text-[#09090B]/60 uppercase tracking-wider block font-bold">📜 Blueprint (Syntax Code Block)</label>
              <textarea
                value={form.codex.blueprint}
                onChange={e => handleCodexChange('blueprint', e.target.value)}
                rows={4}
                className="w-full bg-[#141418]/80 backdrop-blur-sm border-2 border-[#09090B] rounded-lg p-3 text-xs font-code leading-relaxed text-[#D2E823] focus:outline-none focus:border-[#D2E823] resize-y"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] text-[#09090B]/60 uppercase tracking-wider block font-bold">🧠 Deep Dive (Interview Hacks & Mechanics)</label>
              <textarea
                value={form.codex.deepDive}
                onChange={e => handleCodexChange('deepDive', e.target.value)}
                rows={3}
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-[#09090B] rounded-lg p-3 text-xs leading-relaxed text-[#09090B] focus:outline-none focus:border-[#D2E823] resize-y font-body"
              />
            </div>
          </div>

          {/* Row 4: Level Instructions */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Quest Objectives / Instructions</label>
            <textarea
              value={form.instructions}
              onChange={e => handleInputChange('instructions', e.target.value)}
              rows={2}
              className="w-full glass-inner rounded-lg p-3 text-xs leading-relaxed text-[#09090B] focus:outline-none focus:border-[#D2E823]"
            />
          </div>

          {/* Row 5: Initial Boilerplate */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Initial Boilerplate Code</label>
            <textarea
              value={form.initialCode}
              onChange={e => handleInputChange('initialCode', e.target.value)}
              rows={4}
              className="w-full glass-inner rounded-lg p-3 text-xs font-code leading-relaxed text-[#09090B] focus:outline-none focus:border-[#D2E823]"
            />
          </div>

          {/* Row 6: Verification Expression (Regex) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Verification RegExp Expression</label>
              <input
                type="text"
                value={form.validationRegex}
                onChange={e => handleInputChange('validationRegex', e.target.value)}
                placeholder="e.g. <h1>.*?</h1>"
                className="w-full glass-inner rounded-lg px-3 py-2 text-xs text-[#09090B] font-semibold focus:outline-none focus:border-[#D2E823]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider font-bold">Helpful Oracle Hint</label>
              <input
                type="text"
                value={form.hint}
                onChange={e => handleInputChange('hint', e.target.value)}
                className="w-full glass-inner rounded-lg px-3 py-2 text-xs text-[#09090B] focus:outline-none focus:border-[#D2E823]"
              />
            </div>
          </div>
        </section>
        
        {/* ───────── RIGHT SECTION: Sandbox Tester & JSON Output (5 Cols) ───────── */}
        <section className="xl:col-span-5 flex flex-col gap-6 overflow-y-auto">
          
          {/* Panel 2: Live Sandbox Tester */}
          <div className="glass-outer rounded-xl p-6 space-y-4 shadow-brutal-glass-lg text-[#09090B]">
            <div className="flex items-center justify-between border-b-2 border-[#09090B]/10 pb-3">
              <div className="flex items-center gap-2 select-none">
                <Code2 className="w-4 h-4 text-[#09090B]" />
                <h2 className="text-xs font-bold text-[#09090B] tracking-widest uppercase font-display">2. LIVE SANDBOX REGEX TESTER</h2>
              </div>
              
              {/* Telemetry Badge */}
              <AnimatePresence mode="wait">
                {testResult.status !== 'idle' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border-2 shrink-0 ${
                      testResult.status === 'passed'
                        ? 'bg-[#D2E823]/20 border-[#09090B] text-[#09090B] shadow-brutal-glass-sm'
                        : testResult.status === 'failed'
                        ? 'bg-[#DC2626]/20 border-[#09090B] text-[#DC2626] shadow-brutal-glass-sm'
                        : 'glass-inner border-[#09090B] text-[#09090B]'
                    }`}
                  >
                    {testResult.status}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#09090B]/60 uppercase tracking-wider block font-bold">Sandbox Code Inputs (Test Answer)</label>
                <textarea
                  value={sandboxCode}
                  onChange={e => setSandboxCode(e.target.value)}
                  rows={4}
                  className="w-full glass-inner rounded-lg p-3 text-xs font-code leading-relaxed text-[#09090B] focus:outline-none focus:border-[#D2E823]"
                  placeholder="Type the testing code answer here..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleTestRegex}
                  className="flex-1 bg-[#D2E823] border-2 border-[#09090B] px-4 py-2.5 rounded-lg text-xs font-display text-[#09090B] transition-all cursor-pointer btn-press shadow-brutal-glass-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> TEST REGEX
                </button>
              </div>

              {/* Status Feedback bar */}
              <div className={`p-3 rounded-lg border-2 text-xs leading-relaxed ${
                testResult.status === 'passed' ? 'bg-[#D2E823]/10 border-[#D2E823] text-[#09090B]' :
                testResult.status === 'failed' ? 'bg-[#DC2626]/10 border-[#DC2626] text-[#DC2626]' :
                testResult.status === 'error' ? 'bg-[#DC2626]/10 border-[#DC2626] text-[#DC2626]' :
                'glass-inner border-[#09090B] text-[#09090B]/60 shadow-brutal-glass-sm'
              }`}>
                {testResult.status === 'passed' && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5 shrink-0" />}
                {testResult.status === 'failed' && <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5 shrink-0" />}
                {testResult.status === 'error' && <AlertTriangle className="w-3.5 h-3.5 inline mr-1.5 shrink-0" />}
                {testResult.message}
              </div>
            </div>
          </div>

          {/* Panel 3: JSON Generation Engine */}
          <div className="glass-outer rounded-xl p-6 flex-1 flex flex-col min-h-0 space-y-4 shadow-brutal-glass-lg text-[#09090B]">
            <div className="flex items-center justify-between border-b-2 border-[#09090B]/10 pb-3">
              <div className="flex items-center gap-2 select-none">
                <FileCode className="w-4 h-4 text-[#09090B]" />
                <h2 className="text-xs font-bold text-[#09090B] tracking-widest uppercase font-display">3. BLUEPRINT JSON ENGINE</h2>
              </div>

              {/* Copy Status Badge */}
              <button
                onClick={handleCopyToClipboard}
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
            </div>

            <button
              onClick={handleGenerateJson}
              className="w-full bg-[#D2E823] border-2 border-[#09090B] py-3 rounded-lg text-xs font-display text-[#09090B] transition-all cursor-pointer btn-press shadow-brutal-glass-sm"
            >
              GENERATE BLUEPRINT JSON 📜
            </button>

            <div className="flex-1 min-h-[250px] relative overflow-hidden rounded-xl border-2 border-[#09090B]/30">
              <textarea
                readOnly
                value={generatedJson}
                className="absolute inset-0 w-full h-full bg-black/60 text-[#D2E823] p-4 text-[11px] font-code leading-relaxed focus:outline-none resize-none overflow-y-auto"
              />
            </div>
            
            <p className="text-[10px] text-[#09090B]/40 leading-relaxed font-body font-semibold">
              * Note: Instantly copy this compiled database blueprint JSON array payload and drop it directly into the syllabus database array in syllabusData.ts or project blueprints.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
