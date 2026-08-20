import type { Metadata } from 'next';
import "./globals.css";
import { GameProvider } from '@/GameContext';
import { UserProvider } from '@/context/UserContext';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: 'SyntaxKnight - Neo-Brutalist Code Combat RPG',
  description: 'An interactive neo-brutalist code combat RPG. Master HTML, CSS, JavaScript, and React through gamified quests.',
  verification: {
    google: 'uKusfqskGYeBB0dcueisvs2WCfSRe8PJR27VqQI9T0k',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-[#D2E823] selection:text-slate-950 font-body relative min-h-screen overflow-x-hidden">
        
        {/* ─── DYNAMIC LIQUID GLASS MESH GRADIENT BACKDROP ─── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
          {/* Glowing Animated Sphere 1 */}
          <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#D2E823]/30 via-emerald-500/20 to-teal-400/10 blur-[120px] animate-breathe-1" />
          
          {/* Glowing Animated Sphere 2 */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-indigo-600/30 via-purple-600/25 to-pink-500/20 blur-[140px] animate-breathe-2" />
          
          {/* Glowing Animated Sphere 3 */}
          <div className="absolute top-[35%] right-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-blue-600/20 to-indigo-500/15 blur-[100px] animate-breathe-3" />
          
          {/* Vector Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        </div>

        <div className="relative z-10">
          <UserProvider>
            <GameProvider>{children}</GameProvider>
          </UserProvider>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
