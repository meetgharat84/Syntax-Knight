"use client";

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#05050a] flex flex-col items-center justify-center p-6 text-gray-100 font-code relative overflow-hidden select-none">
          {/* Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-xl w-full bg-[#08080f]/90 border-2 border-red-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.15)] space-y-6 text-center">
            {/* Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center animate-pulse">
                <span className="text-3xl">⚠️</span>
              </div>
              <h1 className="text-sm font-black tracking-widest text-red-500 uppercase glitch-text">
                SYSTEM CONFLICT DETECTED
              </h1>
            </div>

            {/* Error Message Panel */}
            <div className="bg-black/40 border border-red-500/20 rounded-xl p-4 text-[11px] leading-relaxed text-red-400 font-mono text-left max-h-[150px] overflow-y-auto">
              <p className="font-bold">🔴 METADATA STREAM CORRUPTED. RECONNECTING SYSTEM ENGINES...</p>
              {this.state.error && (
                <p className="mt-2 text-gray-400 select-text">
                  {this.state.error.toString()}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-[#D2E823] text-black font-display text-[10px] font-bold py-3 px-4 border-2 border-[#09090B] rounded-xl cursor-pointer uppercase tracking-wider"
              >
                🔄 REBOOT ENGINE
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-white/5 border-2 border-white/10 hover:border-white/30 text-gray-300 font-display text-[10px] font-bold py-3 px-4 rounded-xl cursor-pointer uppercase tracking-wider"
              >
                🏠 WARP TO HQ
              </button>
            </div>

            <p className="text-[9px] text-gray-500 select-none">
              SYNTAXKNIGHT // ERROR RECOVERY SUBSYSTEM // CODE 0xDEADBEEF
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
