"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from '@/hooks/useNavigate';
import { useGame } from './GameContext';
import { audioEngine } from './audioEngine';
import { evaluateCode } from './lib/evaluator';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle2,
  Trophy,
  Eye,
  Code2,
  ChevronRight,
  Swords,
  Star,
  Zap,
  Lightbulb,
  Sparkles,
  Bot
} from 'lucide-react';
import AiMentorDrawer from './AiMentorDrawer';

/* ──────────────────────────────────────────────
   LEVEL DATA — expandable per quest
   ────────────────────────────────────────────── */
interface LevelData {
  title: string;
  world: string;
  missionLabel: string;
  initialCode: string;
  objectives: { text: string; done: boolean }[];
  tabs: {
    analogy: { title: string; body: string };
    blueprint: { title: string; body: string };
    deepDive: { title: string; body: string };
  };
  validate: (code: string) => {
    isCorrect: boolean;
    objectiveStates: boolean[];
    errorMsg: string;
  };
}

const LEVEL_1_HTML: LevelData = {
  title: 'HTML Paragraph Tags',
  world: 'WORLD 1: THE FOUNDATION',
  missionLabel: 'Mission 1 — The Blueprint',
  initialCode: `<!-- 🏰 Welcome, Knight. Write your HTML here. -->\n<!-- MISSION: Create an <h1> tag with your castle's name. -->\n\n`,
  objectives: [
    { text: 'Create a main heading using the <h1> tag.', done: false },
    { text: "Write your castle's name inside the tag.", done: false },
  ],
  tabs: {
    analogy: {
      title: '🔮 The Analogy',
      body: `Think of HTML tags like **building blocks** of a castle. The \`<h1>\` tag is the **grand gatehouse** — the first and most important structure visitors see. Just as every castle needs a prominent entrance with the kingdom's name, every webpage needs a primary heading to declare its purpose.\n\nThe opening \`<h1>\` is like opening the castle gates, the text inside is the banner that hangs above them, and the closing \`</h1>\` seals and fortifies the structure.`,
    },
    blueprint: {
      title: '📜 The Blueprint',
      body: `**Syntax Pattern:**\n\`\`\`html\n<h1>Your Castle Name</h1>\n\`\`\`\n\n**Rules:**\n• The tag name goes inside angle brackets: \`<h1>\`\n• Content is placed between the opening and closing tags\n• The closing tag has a forward slash: \`</h1>\`\n• There should be exactly one \`<h1>\` per page\n\n**Example:**\n\`\`\`html\n<h1>The Citadel of Syntax</h1>\n\`\`\``,
    },
    deepDive: {
      title: '🧠 Deep Dive',
      body: `**HTML Heading Hierarchy:**\n\nHTML provides six levels of headings, from \`<h1>\` (most important) to \`<h6>\` (least important). Search engines use headings to index the structure and content of your web pages.\n\n**Semantic Importance:**\n• \`<h1>\` defines the main topic — use only once per page\n• Screen readers use heading levels to navigate\n• Search engines weight \`<h1>\` content heavily for SEO\n\n**Common Mistakes:**\n• Skipping heading levels (e.g., \`<h1>\` → \`<h3>\`)\n• Using headings for styling instead of structure\n• Forgetting the closing tag — browsers may render it, but the DOM will be malformed`,
    },
  },
  validate: (code: string) => {
    const evalResult = evaluateCode(code, '<h1[^>]*>\\s*(.+?)\\s*<\\/h1>', 'html');
    const h1Regex = /<h1[^>]*>\s*(.+?)\s*<\/h1>/i;
    const match = code.match(h1Regex);
    const hasOpenTag = /<h1[^>]*>/i.test(code);
    const hasCloseTag = /<\/h1>/i.test(code);
    const hasContent = !!(match && match[1].trim().length > 0);

    const objectiveStates = [hasOpenTag && hasCloseTag, hasContent];

    if (!evalResult.syntaxValid) {
      return { isCorrect: false, objectiveStates, errorMsg: evalResult.errorMsg };
    }

    if (hasOpenTag && hasCloseTag && hasContent) {
      return { isCorrect: true, objectiveStates, errorMsg: '' };
    }

    let errorMsg = '';
    if (!hasOpenTag && !hasCloseTag) {
      errorMsg = 'No <h1> element detected. The castle needs a name, Knight.';
    } else if (hasOpenTag && !hasCloseTag) {
      errorMsg = 'Unclosed <h1> tag detected — the gate is left open!';
    } else if (!hasOpenTag && hasCloseTag) {
      errorMsg = 'Closing </h1> found without an opening tag.';
    } else if (!hasContent) {
      errorMsg = 'Your <h1> tag is empty. Name your castle!';
    }

    return { isCorrect: false, objectiveStates, errorMsg };
  },
};

/* ──────────────────────────────────────────────
   TAB TYPE
   ────────────────────────────────────────────── */
type TabKey = 'analogy' | 'blueprint' | 'deepDive';

const TAB_CONFIG: { key: TabKey; label: string }[] = [
  { key: 'analogy', label: '🔮 ANALOGY' },
  { key: 'blueprint', label: '📜 BLUEPRINT' },
  { key: 'deepDive', label: '🧠 DEEP DIVE' },
];

/* ──────────────────────────────────────────────
   SIMPLE MARKDOWN-LIKE RENDERER
   ────────────────────────────────────────────── */
function renderRichText(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeKey = 0;

  lines.forEach((line, i) => {
    // Toggle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${codeKey++}`}
            className="bg-[#09090B] text-[#D2E823] border-2 border-[#09090B] rounded-lg p-3 text-xs font-code overflow-x-auto my-2 leading-relaxed"
          >
            {codeBuffer.join('\n')}
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Headings
    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="text-[13px] font-bold text-[#09090B] mt-3 mb-1 font-display">
          {line.replace(/\*\*/g, '')}
        </p>
      );
      return;
    }

    // Bullet points
    if (line.startsWith('•') || line.startsWith('- ')) {
      const content = line.replace(/^[•\-]\s*/, '');
      elements.push(
        <div key={i} className="flex items-start gap-2 text-sm text-[#09090B] leading-relaxed ml-1">
          <span className="text-[#09090B] mt-0.5 shrink-0 font-bold">›</span>
          <span>{parseInlineMarkup(content)}</span>
        </div>
      );
      return;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
      return;
    }

    // Normal paragraph
    elements.push(
      <p
        key={i}
        className="text-sm text-[#09090B] leading-relaxed"
      >
        {parseInlineMarkup(line)}
      </p>
    );
  });

  return elements;
}

/** Safe React node parser for inline formatting: **bold**, `code` */
function parseInlineMarkup(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="text-[#09090B] font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={index}
          className="text-[#09090B] bg-[#D2E823]/30 px-1 py-0.5 rounded text-[12px] font-code border border-[#09090B]/10"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/* ══════════════════════════════════════════════
   PLAYGROUND COMPONENT — THE BATTLE ARENA
   ══════════════════════════════════════════════ */
function Playground() {
  const navigate = useNavigate();
  const { completedMissions, completeMission, currentXP, playerLevel, playerName, playerTokens, spendTokens } = useGame();

  const level = LEVEL_1_HTML;

  // ── State ──
  const [code, setCode] = useState<string>(level.initialCode);
  const [activeTab, setActiveTab] = useState<TabKey>('analogy');
  const [hintVisible, setHintVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [missionXp, setMissionXp] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationMessage, setValidationMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [objectives, setObjectives] = useState(level.objectives);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  // ── Line numbers ──
  const lineCount = code.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 25) }, (_, i) => i + 1);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // ── Real-time objective tracking ──
  useEffect(() => {
    const result = level.validate(code);
    setObjectives(
      level.objectives.map((obj, idx) => ({
        ...obj,
        done: result.objectiveStates[idx],
      }))
    );
  }, [code]);

  // ── Sync if already completed globally ──
  useEffect(() => {
    if (completedMissions.includes('html')) {
      setMissionXp(100);
      setObjectives(level.objectives.map((obj) => ({ ...obj, done: true })));
    }
  }, [completedMissions]);

  // ── Submit / Attack ──
  const handleSubmit = useCallback(() => {
    const result = level.validate(code);

    if (result.isCorrect) {
      audioEngine.playSuccessChime();
      setValidationStatus('success');
      setValidationMessage('CODE COMPILED SUCCESSFULLY — All objectives met.');
      const earnedXp = hintCount === 0 ? 100 : hintCount === 1 ? 85 : 70;
      setMissionXp(earnedXp);
      completeMission('html', hintCount > 0, hintCount);
      setTimeout(() => setIsSuccess(true), 600);
    } else {
      audioEngine.playErrorBuzzer();
      setValidationStatus('error');
      setValidationMessage(result.errorMsg);
      // Trigger shake
      setShakeKey((k) => k + 1);
    }
  }, [code, hintCount, completeMission]);

  // ── Reset ──
  const handleReset = () => {
    audioEngine.playClickSound();
    setCode(level.initialCode);
    setMissionXp(0);
    setHintCount(0);
    setIsSuccess(false);
    setValidationMessage('');
    setValidationStatus('idle');
    setObjectives(level.objectives.map((obj) => ({ ...obj, done: false })));
  };

  // ── Safe preview HTML ──
  const getPreviewHtml = (): string => {
    const sanitized = code.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    return `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        background: transparent;
        color: #e2e8f0;
        padding: 24px;
        margin: 0;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #f8fafc;
        font-weight: 700;
      }
      h1 {
        font-size: 2em;
        background: linear-gradient(90deg, #22d3ee, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      p { color: #94a3b8; }
      a { color: #22d3ee; }
      ul, ol { color: #cbd5e1; }
    </style>
  </head>
  <body>${sanitized}</body>
</html>`;
  };

  // ── Currently active tab content ──
  const activeTabData = level.tabs[activeTab];

  return (
    <motion.div
      key="html-playground"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="bg-transparent p-3 sm:p-4 relative noise-overlay min-h-[100dvh] lg:h-[100dvh] overflow-y-auto lg:overflow-hidden flex flex-col"
    >
      {/* ─── Top Navigation Bar ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => {
              audioEngine.playClickSound();
              navigate('/');
            }}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-code text-[#09090B]/60 hover:text-[#DC2626] transition-colors group cursor-pointer glass-inner hover:border-[#DC2626] px-3 py-2 sm:py-2.5 rounded-lg btn-press-sm shadow-brutal-glass-sm text-[#09090B] min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="tracking-widest">← ABANDON</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playClickSound();
              setIsAiMentorOpen(v => !v);
            }}
            className="flex items-center gap-1.5 text-[10px] sm:text-xs font-code font-bold bg-[#D2E823]/90 backdrop-blur-sm border-2 border-[#09090B] px-3 py-2 sm:py-2.5 rounded-lg btn-press-sm shadow-brutal-glass-sm cursor-pointer text-[#09090B] min-h-[44px]"
          >
            <Bot className="w-3.5 h-3.5 text-[#09090B]" />
            <span>AI MENTOR 🤖</span>
          </button>
        </div>

        {/* Center: Arena Label */}
        <div className="hidden md:flex items-center gap-3">
          <Swords className="w-4 h-4 text-[#D2E823]" />
          <span className="font-display text-[11px] tracking-tight text-[#09090B] uppercase font-bold">
            The Battle Arena
          </span>
          <Swords className="w-4 h-4 text-[#D2E823]" />
        </div>

        {/* Right: Player HUD */}
        <div className="flex items-center glass-inner px-3 sm:px-4 py-1.5 rounded-lg gap-3 sm:gap-4 text-[10px] select-none shadow-brutal-glass-sm text-[#09090B] min-h-[44px]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#09090B]/50 tracking-wider font-code">KNIGHT:</span>
            <span className="font-bold text-[#09090B] font-code uppercase">
              {playerName || 'RECRUIT'}
            </span>
          </div>
          <div className="h-3 w-px bg-[#09090B]/20" />
          <div className="flex items-center gap-1.5">
            <span className="text-[#09090B]/50 tracking-wider font-code">RANK:</span>
            <span className="font-bold text-[#09090B] font-code">LVL {playerLevel}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-3 w-px bg-[#09090B]/20" />
            <div className="w-16 sm:w-20 h-2 bg-[#E8E4D8] rounded-sm overflow-hidden border-2 border-[#09090B]">
              <div
                className="h-full bg-[#D2E823] transition-all duration-500"
                style={{
                  width: `${Math.min((currentXP / (playerLevel * 500)) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="font-bold font-code text-[#09090B] text-[9px]">
              {currentXP}/{playerLevel * 500}
            </span>
          </div>
        </div>
      </div>

      {/* ─── THREE-PANEL GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow lg:h-[calc(100dvh-5.5rem)]">
        {/* ══════════════════════════════════════
           LEFT COLUMN — THE QUEST CODEX (span 4)
           ══════════════════════════════════════ */}
        <aside className="lg:col-span-4 glass-outer rounded-xl p-4 sm:p-5 overflow-y-auto flex flex-col shadow-brutal-glass text-[#09090B]">
          {/* Mission Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-[10px] font-code text-[#09090B]/60 tracking-[0.2em] uppercase">
              <Swords className="w-3.5 h-3.5 text-[#09090B]" />
              {level.missionLabel}
            </div>
            <h1 className="font-display text-lg sm:text-xl mt-1.5 tracking-tight text-[#09090B]">
              {level.title.toUpperCase()}
            </h1>
            <p className="text-[10px] text-[#09090B]/50 mt-0.5 font-code">{level.world}</p>
          </div>

          {/* XP Progress */}
          <div className="glass-inner rounded-lg p-3 mb-4 shadow-brutal-glass-sm text-[#09090B]">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-[#09090B]" />
                <span className="text-[9px] font-code font-bold text-[#09090B] tracking-wider">
                  MISSION XP
                </span>
              </div>
              <span className="text-[10px] font-code font-bold text-[#09090B]">{missionXp}/100</span>
            </div>
            <div className="w-full h-3 bg-[#E8E4D8] rounded-sm overflow-hidden border-2 border-[#09090B]">
              <div
                className="h-full bg-[#D2E823] transition-all duration-700 ease-out"
                style={{ width: `${missionXp}%` }}
              />
            </div>
          </div>

          {/* ── Quest Objectives (Highlighted Alert Panel) ── */}
          <div className="mb-5 bg-[#D2E823] border-4 border-[#09090B] rounded-xl p-4 sm:p-5 shadow-brutal brutal-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-[#09090B] fill-current" />
              <span className="text-[11px] font-code font-black tracking-widest text-[#09090B] uppercase">
                ⚡ QUEST OBJECTIVES
              </span>
            </div>
            <div className="space-y-2.5">
              {objectives.map((obj, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-300 ${
                    obj.done
                      ? 'bg-black/10 border-black/40 text-black/60'
                      : 'bg-white border-[#09090B] shadow-brutal-shadow-sm'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      obj.done
                        ? 'bg-[#09090B] border-[#09090B]'
                        : 'border-[#09090B] bg-white'
                    }`}
                  >
                    {obj.done && <CheckCircle2 className="w-3.5 h-3.5 text-[#D2E823]" />}
                  </div>
                  <p
                    className={`text-xs sm:text-[13px] font-body font-bold leading-relaxed transition-colors ${
                      obj.done ? 'text-black/55 line-through font-semibold' : 'text-[#09090B]'
                    }`}
                  >
                    {obj.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 3-LAYER TABS — Folder Cutout Style ── */}
          <div className="flex gap-0 mb-0 flex-wrap">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  audioEngine.playClickSound();
                  setActiveTab(tab.key);
                }}
                className={`folder-tab text-[10px] sm:text-[11px] font-code font-bold tracking-wider py-2 px-3 cursor-pointer min-h-[38px] ${
                  activeTab === tab.key
                    ? 'folder-tab-active'
                    : 'folder-tab-inactive'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab Content (Rich Text) ── */}
          <div className="flex-1 glass-inner border-t-0 rounded-b-lg p-4 overflow-y-auto mb-4 text-[#09090B] shadow-brutal-glass-sm min-h-[140px]">
            <h3 className="text-sm font-bold text-[#09090B] mb-3 flex items-center gap-2 font-display">
              <Sparkles className="w-3.5 h-3.5 text-[#09090B]" />
              {activeTabData.title}
            </h3>
            <div className="space-y-1 text-xs sm:text-sm">{renderRichText(activeTabData.body)}</div>
          </div>

        </aside>

        {/* ══════════════════════════════════════
           CENTER COLUMN — THE CODE TERMINAL (span 5)
           ══════════════════════════════════════ */}
        <main className={`lg:col-span-5 glass-dark-code border-4 border-[#09090B] rounded-xl flex flex-col justify-between p-0 overflow-hidden shadow-brutal-glass-lg min-h-[340px] lg:min-h-0 ${
          validationStatus === 'error' ? 'code-error-flash' : validationStatus === 'success' ? 'code-success-flash' : ''
        }`}>
          {/* ── Top Bar ── */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 border-b border-[#F8F4E8]/10 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#DC2626]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#D2E823]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#F8F4E8]" />
              </div>
              <div className="flex items-center gap-1.5 bg-[#141418] border border-[#F8F4E8]/10 px-2.5 sm:px-3 py-1 rounded-md">
                <Code2 className="w-3.5 h-3.5 text-[#D2E823]" />
                <span className="text-[9px] sm:text-[10px] font-code text-[#F8F4E8]/50 tracking-wider">
                  WORKSPACE.HTML
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Hint toggle */}
              <button
                onClick={() => {
                  if (hintVisible) {
                    audioEngine.playClickSound();
                    setHintVisible(false);
                  } else {
                    if (spendTokens(2)) {
                      audioEngine.playClickSound();
                      setHintVisible(true);
                      setHintCount((c) => Math.min(c + 1, 2));
                    } else {
                      audioEngine.playErrorBuzzer();
                      setValidationStatus('error');
                      setValidationMessage('INSUFFICIENT TOKENS! You need at least 2 tokens to unlock this Oracle Clue.');
                    }
                  }
                }}
                className={`flex items-center gap-1.5 text-[9px] font-code font-bold px-2.5 sm:px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer min-h-[36px] ${
                  hintVisible
                    ? 'bg-[#D2E823] border-[#D2E823] text-[#09090B]'
                    : 'border-[#F8F4E8]/10 text-[#F8F4E8]/50 hover:text-[#D2E823] hover:border-[#D2E823]/30'
                }`}
              >
                <Lightbulb className="w-3 h-3" />
                HINT
              </button>
              {/* Reset */}
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-[9px] font-code text-[#F8F4E8]/50 hover:text-[#F8F4E8] transition-colors px-2 py-1.5 rounded-lg cursor-pointer border border-transparent hover:border-[#F8F4E8]/10 min-h-[36px]"
                title="Reset code"
              >
                <RotateCcw className="w-3 h-3" />
                RESET
              </button>
            </div>
          </div>

          {/* ── Hint Banner (conditionally shown) ── */}
          {hintVisible && (
            <div className="mx-3 sm:mx-4 mt-3 bg-[#141418] border-2 border-[#D2E823]/40 p-3 rounded-lg text-xs text-[#D2E823] space-y-1.5 animate-fade-up">
              <div className="font-bold text-[#D2E823] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" />
                  Oracle Clue
                </span>
                <span className="text-[9px] bg-[#D2E823]/10 border border-[#D2E823]/30 px-2 py-0.5 rounded font-code font-bold">
                  -{hintCount * 15}% XP Penalty
                </span>
              </div>
              <div className="font-code leading-relaxed text-[11px] text-[#F8F4E8]/70">
                <span className="text-[#D2E823] font-bold">Hint:</span> Web structures use paired
                tags. To create the primary, largest heading, use the 'h' element with the number 1.
                Don't forget to close it with a '/'.
              </div>
            </div>
          )}

          {/* ── IDE Input Area with Horizontal Overflow Safety ── */}
          <div className="flex-1 flex overflow-hidden min-h-[200px] lg:min-h-0 mx-3 sm:mx-4 mt-3 mb-3">
            <motion.div 
              animate={validationStatus === 'error' ? {
                x: [-10, 10, -10, 10, 0],
                borderColor: "#DC2626"
              } : validationStatus === 'success' ? {
                x: 0,
                borderColor: "#D2E823"
              } : {
                x: 0,
                borderColor: "rgba(248, 244, 232, 0.1)"
              }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex rounded-lg border-2 overflow-hidden relative"
            >
              {/* Line numbers gutter */}
              <div
                ref={lineNumberRef}
                className="w-9 sm:w-10 bg-black/40 border-r border-white/10 py-3 overflow-hidden shrink-0 select-none"
              >
                {lines.map((n) => (
                  <div
                    key={n}
                    className="px-1.5 sm:px-2 text-right text-[12px] sm:text-[13px] font-code text-[#F8F4E8]/25 leading-[1.7]"
                  >
                    {n}
                  </div>
                ))}
              </div>

              {/* Textarea with overflow-x-auto */}
              <textarea
                key={shakeKey}
                ref={textareaRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (validationStatus === 'error') {
                     setValidationStatus('idle');
                     setValidationMessage('');
                  }
                }}
                onScroll={handleScroll}
                spellCheck={false}
                className="flex-1 font-mono tracking-wide text-[#D2E823] bg-transparent p-3 sm:p-4 w-full resize-none outline-none text-[13px] sm:text-[15px] leading-[1.7] caret-[#D2E823] placeholder-[#F8F4E8]/15 overflow-x-auto whitespace-pre"
                style={{ minHeight: 0 }}
                placeholder="// Begin writing your code here, Knight..."
              />
            </motion.div>
          </div>

          {/* ── Validation Message ── */}
          {validationMessage && (
            <div
              className={`mx-3 sm:mx-4 mb-3 px-3 py-2 text-[10px] sm:text-xs font-code flex items-center gap-2 rounded-lg border-2 ${
                validationStatus === 'success'
                  ? 'bg-[#D2E823]/10 border-[#D2E823]/40 text-[#D2E823]'
                  : 'bg-[#DC2626]/10 border-[#DC2626]/40 text-[#DC2626]'
              }`}
            >
              {validationStatus === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <span className="text-[#DC2626] shrink-0">⚠</span>
              )}
              {validationMessage}
            </div>
          )}

          {/* ── Bottom Submit Bar (Touch-friendly) ── */}
          <div className="px-3 sm:px-5 py-3 border-t border-[#F8F4E8]/5 shrink-0">
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-[#D2E823] hover:bg-[#c5db1a] px-4 sm:px-6 py-3 rounded-lg font-display text-xs sm:text-sm tracking-wider text-[#09090B] border-2 border-[#D2E823] transition-all cursor-pointer btn-press shadow-brutal-glass-sm min-h-[48px] font-bold"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              SUBMIT CODE / ATTACK ➔
            </button>
          </div>
        </main>

        {/* ══════════════════════════════════════
           RIGHT COLUMN — LIVE PREVIEW (span 3)
           ══════════════════════════════════════ */}
        <section
          className={`lg:col-span-3 glass-outer border-4 rounded-xl p-4 sm:p-5 flex flex-col overflow-hidden transition-all duration-500 shadow-brutal-glass text-[#09090B] min-h-[260px] lg:min-h-0 ${
            isSuccess
              ? 'border-[#D2E823]'
              : 'border-[#09090B]'
          }`}
        >
          {/* Preview header */}
          <div className="flex items-center justify-between mb-3 shrink-0 border-b border-[#09090B]/10 pb-2">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-[#09090B]" />
              <span className="text-[11px] font-code font-bold text-[#09090B]/60 tracking-[0.15em] uppercase">
                Live Preview
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-code text-[#09090B]/50">
              <div className="w-1.5 h-1.5 rounded-sm bg-[#D2E823] border border-[#09090B] animate-acid-pulse" />
              LIVE
            </div>
          </div>

          {/* Preview container */}
          <div className="flex-1 rounded-lg overflow-hidden bg-white/70 backdrop-blur-sm border-2 border-[#09090B] relative min-h-0">
            {/* Floating celebration particles */}
            <AnimatePresence>
              {isSuccess && (
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

            <iframe
              srcDoc={getPreviewHtml()}
              title="Live Preview"
              className="w-full h-full border-0 bg-transparent relative z-10"
              sandbox="allow-same-origin"
            />
          </div>

          {/* Execution status footer */}
          <div className="mt-3 flex items-center gap-2 text-[9px] font-code text-[#09090B]/50 shrink-0">
            <div
              className={`w-2 h-2 rounded-sm border border-[#09090B] ${
                validationStatus === 'success'
                  ? 'bg-[#D2E823]'
                  : validationStatus === 'error'
                  ? 'bg-[#DC2626]'
                  : 'bg-[#E8E4D8]'
              }`}
            />
            {validationStatus === 'success'
              ? 'RENDER: ACTIVE'
              : validationStatus === 'error'
              ? 'RENDER: FAILED'
              : 'AWAITING INPUT...'}
          </div>
        </section>
      </div>

      {/* ─── SUCCESS OVERLAY MODAL ─── */}
      <AnimatePresence>
        {isSuccess && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 1.1, opacity: 0, rotate: -1 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative glass-outer rounded-xl p-8 sm:p-10 max-w-md w-[90%] text-center overflow-hidden shadow-brutal-glass-xl text-[#09090B]"
            >
              {/* Trophy icon */}
              <div className="mx-auto w-16 h-16 rounded-xl bg-[#D2E823] border-4 border-[#09090B] flex items-center justify-center mb-5 shadow-brutal-glass-sm"
                >
                <Trophy className="w-8 h-8 text-[#09090B]" />
              </div>

              <h2 className="font-display text-3xl tracking-tight text-[#09090B]">
                QUEST CLEARED!
              </h2>
              <p className="text-sm text-[#09090B]/60 mt-2 font-code font-bold">
                +{missionXp} XP gained
              </p>
              {hintCount > 0 && (
                <p className="text-[10px] text-[#DC2626] font-code mt-0.5">
                  (Penalty applied: {hintCount} oracle clue{hintCount > 1 ? 's' : ''} unlocked)
                </p>
              )}

              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg shadow-brutal-glass-sm">
                  <span className="text-[10px] font-code text-[#09090B] font-bold tracking-wider">
                    MISSION COMPLETE
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#09090B]/50 mt-5 leading-relaxed font-body">
                You've laid the first stone. The{' '}
                <span className="text-[#09090B] font-bold">HTML Citadel</span> recognises your mark.
                The <span className="text-[#09090B] font-bold">CSS Armor Shop</span> awaits, Knight.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="flex-1 px-5 py-3 text-xs font-code font-bold text-[#09090B] glass-inner rounded-lg hover:bg-white/20 transition-colors cursor-pointer btn-press-sm shadow-brutal-glass-sm"
                >
                  STAY & PRACTICE
                </button>
                <button
                  onClick={() => navigate('/playground/css')}
                  className="flex-1 px-5 py-3 text-xs font-display text-[#09090B] bg-[#D2E823] border-2 border-[#09090B] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 btn-press shadow-brutal-glass-sm"
                >
                  PROCEED TO WORLD 2 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AiMentorDrawer
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
        currentCode={code}
        activeFile="index.html"
      />
    </motion.div>
  );
}

export default Playground;
