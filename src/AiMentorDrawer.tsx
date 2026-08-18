"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Cpu 
} from 'lucide-react';
import { audioEngine } from './audioEngine';

interface AiMentorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentCode: string;
  activeFile: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function AiMentorDrawer({ isOpen, onClose, currentCode, activeFile }: AiMentorDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const OPENROUTER_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_BYTEZ_API_KEY || '';
  const isKeyAuthorized = !!OPENROUTER_KEY && OPENROUTER_KEY !== 'your_real_openrouter_key_here' && !OPENROUTER_KEY.startsWith('your_real_');

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'ai',
          text: `👋 Greetings! I am your AI Code Mentor. Ask me anything about your current code workspace in "${activeFile}". I can assist you with alignments, logic variables, or syntax structures!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    audioEngine.playClickSound();
    const userText = input.trim();
    setInput('');

    const newMsg: ChatMessage = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    // Smart Local Fallback if API key is not configured
    if (!isKeyAuthorized) {
      setTimeout(() => {
        let reply = "";
        const lowerInput = userText.toLowerCase();
        if (lowerInput.includes('explain') || lowerInput.includes('level') || lowerInput.includes('analogy')) {
          reply = `💡 **Level Guide**: To complete this level in \`${activeFile}\`, inspect the instruction box above. Make sure your tag syntax or variable declaration matches the requested format!`;
        } else if (lowerInput.includes('div') || lowerInput.includes('container')) {
          reply = `📦 **HTML Container**: \`<div>\` is a block-level container used to group elements together. Use \`<div id="var_1">Content</div>\` to complete this task.`;
        } else if (lowerInput.includes('h1') || lowerInput.includes('heading')) {
          reply = `🏷️ **HTML Heading**: Use \`<h1>Header Text</h1>\` to create top-level headings. Make sure you don't miss the closing tag!`;
        } else {
          reply = `🤖 **AI Assistant**: Inspect your code in \`${activeFile}\`. Ensure tags are properly opened and closed, or click the **HINT** button to check the exact syntax requirement.`;
        }

        setMessages(prev => [...prev, {
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsTyping(false);
        audioEngine.playSuccessChime();
      }, 700);
      return;
    }

    try {
      const endpoint = 'https://openrouter.ai/api/v1/chat/completions';
      
      const promptContext = `
You are the AI Mentor for SyntaxKnight, a Neo-Brutalist coding education application.
The user is working in file: "${activeFile}".
Current workspace editor contents:
\`\`\`
${currentCode}
\`\`\`

The user is asking: "${userText}".
Provide direct, concise, and helpful advice. Keep the response under 100 words. Highlight code syntax with standard markdown.
`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_KEY}`
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            {
              role: "user",
              content: promptContext
            }
          ],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: status ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "Check your syntax bindings and retry.";

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      audioEngine.playSuccessChime();
    } catch (err) {
      console.error('[AI_MENTOR_DRAWER_ERROR]', err);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: '💡 **Hint**: Make sure your HTML tag or variable declaration matches the instructions above.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      audioEngine.playErrorBuzzer();
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay Backdrop to prevent background text bleed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              audioEngine.playClickSound();
              onClose();
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          />

          {/* Drawer Slide-Over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 140 }}
            className="fixed top-0 right-0 h-full w-[380px] sm:w-[460px] bg-slate-950/95 backdrop-blur-2xl border-l border-white/15 z-50 flex flex-col justify-between shadow-2xl shadow-black text-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-900/80 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D2E823] flex items-center justify-center text-slate-950 font-bold shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm tracking-tight text-white uppercase font-bold">AI CODE MENTOR</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-code text-slate-400 font-semibold uppercase">ACTIVE MODEL: GEMINI 2.5 FLASH</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  onClose();
                }}
                className="p-2 rounded-xl bg-slate-800/80 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Grid */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div key={index} className={`flex items-start gap-3 ${!isAi ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 select-none shadow-md ${
                      isAi ? 'bg-[#D2E823] border-[#09090B] text-slate-950' : 'bg-slate-800 border-white/20 text-white'
                    }`}>
                      {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className="space-y-1 max-w-[80%]">
                      <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed select-text shadow-lg ${
                        isAi
                          ? 'bg-slate-900/90 border-white/10 text-slate-100'
                          : 'bg-[#D2E823]/20 border-[#D2E823]/40 text-white'
                      }`}>
                        <p className="whitespace-pre-wrap font-body leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="text-[9px] font-code text-slate-500 block text-right pr-1">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#D2E823] text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                    <Cpu className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="p-3.5 bg-slate-900/90 border border-white/10 rounded-2xl text-xs font-body text-slate-400 animate-pulse flex items-center gap-2">
                    <span>Querying the AI Mentor...</span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Footer Input Box */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-slate-900/80 flex gap-2.5 items-center">
              <input
                type="text"
                required
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isTyping}
                placeholder="Ask technical question..."
                className="flex-grow bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-xs font-code focus:outline-none focus:border-[#D2E823] text-white placeholder-slate-500 shadow-inner"
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="p-3 bg-[#D2E823] hover:bg-[#c2d813] text-slate-950 border border-black/20 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
