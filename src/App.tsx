"use client";

import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Homepage from './Homepage';
import Playground from './Playground';
import CSSPlayground from './CSSPlayground';
import JSPlayground from './JSPlayground';
import ReactPlayground from './ReactPlayground';
import QuestCreator from './QuestCreator';
import AiLevelGenerator from './AiLevelGenerator';
import AuthMatrix from './AuthMatrix';
import { audioEngine } from './audioEngine';

function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Performance optimization: Avoid mounting listeners and animation loops on touch/mobile devices
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop) return;

    // Suppress default mouse cursor on desktop since custom cursor is enabled
    const styleNode = document.createElement('style');
    styleNode.id = 'syntaxknight-cursor-killer';
    styleNode.innerHTML = `
      * { cursor: none !important; }
      html, body, button, a, input, textarea, select, svg, i { cursor: none !important; }
    `;
    document.head.appendChild(styleNode);

    const handleMouseMove = (e: MouseEvent) => {
      // Center the 32px cursor on the physical mouse tip
      target.current = { x: e.clientX - 16, y: e.clientY - 16 };
    };

    let lastHovered: HTMLElement | null = null;
    const handleMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      if (!targetEl) return;

      const isInteractive =
        targetEl.closest('button') ||
        targetEl.closest('a') ||
        targetEl.closest('input') ||
        targetEl.closest('select') ||
        targetEl.closest('textarea') ||
        targetEl.closest('[data-cursor="pointer"]') ||
        targetEl.classList.contains('cursor-pointer') ||
        targetEl.classList.contains('btn-press') ||
        targetEl.classList.contains('folder-tab');

      if (isInteractive && lastHovered !== isInteractive) {
        audioEngine.playHoverSound();
        lastHovered = isInteractive as HTMLElement;
      } else if (!isInteractive) {
        lastHovered = null;
      }

      setIsHovered(!!isInteractive);
    };

    const lerp = () => {
      // 0.15 coordinate tracking speed for responsive movement
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${isHovered ? 2.5 : 1})`;
      }
      requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    const raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(raf);

      const existingStyle = document.getElementById('syntaxknight-cursor-killer');
      if (existingStyle) existingStyle.remove();
    };
  }, [isHovered]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999999] hidden md:block w-8 h-8 rounded-full bg-white mix-blend-difference border border-[#09090B]/10 transition-transform duration-200 ease-out"
      style={{
        left: 0,
        top: 0,
        willChange: 'transform'
      }}
    />
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const isPlayground = location.pathname.startsWith('/playground') || location.pathname.startsWith('/admin');
    audioEngine.toggleSpaceHum(isPlayground);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Homepage /></PageWrapper>} />
        <Route path="/playground/html" element={<PageWrapper><Playground /></PageWrapper>} />
        <Route path="/playground/css" element={<PageWrapper><CSSPlayground /></PageWrapper>} />
        <Route path="/playground/js" element={<PageWrapper><JSPlayground /></PageWrapper>} />
        <Route path="/playground/react" element={<PageWrapper><ReactPlayground /></PageWrapper>} />
        <Route path="/admin/quest-creator" element={<PageWrapper><QuestCreator /></PageWrapper>} />
        <Route path="/admin/ai-generator" element={<PageWrapper><AiLevelGenerator /></PageWrapper>} />
        <Route path="/auth-matrix" element={<PageWrapper><AuthMatrix /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const currentTheme = localStorage.getItem('sk_shop_active_theme') || 'light';
    document.documentElement.className = currentTheme;
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full overflow-x-hidden transition-colors duration-300 bg-[#F8F4E8] text-[#09090B]">
        {/* Backdrop Layer to prevent vertical/horizontal overflow from glow spheres & 3D objects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Global Vector Grid Backdrop */}
          <div className="absolute inset-0 vector-grid-backdrop opacity-40" />

          {/* Ambient Glow Spheres Engine */}
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/40 rounded-full blur-[140px] mix-blend-screen animate-breathe-1" />
          <div className="absolute top-[20%] right-[-5%] w-[700px] h-[700px] bg-purple-600/35 rounded-full blur-[160px] mix-blend-screen animate-breathe-2" />
          <div className="absolute bottom-[-10%] left-[15%] w-[500px] h-[500px] bg-orange-500/30 rounded-full blur-[120px] mix-blend-screen animate-breathe-3" />

          {/* 3D Auto-Floating Glass Objects Backdrop */}
          <div className="absolute top-[15%] left-[5%] w-44 h-44 glass-sphere-3d animate-float-sphere-1" />
          <div className="absolute top-[45%] right-[8%] w-56 h-56 glass-donut-3d animate-float-donut" />
          <div className="absolute bottom-[20%] left-[10%] w-60 h-24 glass-pill-3d animate-float-pill" />
          <div className="absolute top-[75%] right-[25%] w-32 h-32 glass-sphere-3d animate-float-sphere-2" style={{ opacity: 0.7 }} />
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full min-h-screen">
          <AnimatedRoutes />
        </div>
      </div>
      {/* Absolute Root Level Mounting for custom cursor */}
      <GlobalCursor />
    </BrowserRouter>
  );
}

export default App;
