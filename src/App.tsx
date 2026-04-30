/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Music, Gamepad2, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Visual Glitch Layers */}
      <div className="screen-effect" />
      <div className="static-noise" />
      <div className="scanline" />

      {/* Background Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e293b_0%,#050505_100%)]" />
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32 tear-anim">
        
        {/* Machine Interface: Left Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 space-y-12 text-center lg:text-left"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-block bg-glitch-magenta text-void px-4 py-1 font-pixel text-[10px] uppercase tracking-tighter"
            >
              SIGNAL: ENCRYPTED // SOURCE: UNKNOWN
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-pixel leading-none tracking-tighter uppercase glitch-magenta-heavy">
              TERMINAL <br />
              <span className="text-white block mt-4 bg-glitch-cyan text-void px-4 inline-block">SNAKE.EXE</span>
            </h1>
            
            <div className="font-mono text-xs text-glitch-cyan/60 space-y-2 uppercase tracking-widest border-l-2 border-glitch-magenta pl-4 py-2">
              <p>{">"} INITIALIZING NEURAL UPLINK...</p>
              <p>{">"} SYNCING SYNTHETIC RHYTHMS...</p>
              <p>{">"} WARNING: TOTAL SYSTEM IMMERSION RECOMMENDED.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <MusicPlayer />
          </div>
        </motion.div>

        {/* The Grid: Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative pixel-border bg-void/80 p-2"
        >
          <div className="absolute -top-6 left-0 bg-glitch-cyan text-void px-2 py-0.5 font-pixel text-[8px]">
            GRID_COORD_SYSTEM_01
          </div>
          <SnakeGame />
          <div className="absolute -bottom-6 right-0 text-glitch-magenta font-mono text-[8px] animate-pulse">
            ERR_BUFFER_OVERFLOW: 0x8F2
          </div>
        </motion.div>
      </main>

      {/* Global Metadata Hud */}
      <footer className="fixed bottom-4 left-4 right-4 flex items-center justify-between text-[8px] font-pixel text-glitch-cyan/40 uppercase pointer-events-none z-20">
        <div className="flex gap-8">
          <span>MEM_ALLOC: 4096KB</span>
          <span>UPTIME: 99.999%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-glitch-magenta animate-ping" />
          <span>REALITY_SYNC: ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}


