import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DUMMY_TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }
  }, [currentTrackIndex]);

  return (
    <div className="bg-void border-2 border-glitch-cyan p-4 pixel-border w-full max-w-sm relative">
      <audio ref={audioRef} onEnded={nextTrack} />
      
      {/* Decoys / Machine UI */}
      <div className="absolute -top-3 -right-2 bg-glitch-magenta text-void px-1 font-mono text-[6px]">
        UPLINK_001
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-void border-[3px] border-glitch-magenta relative overflow-hidden"
          >
            <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all" />
            <div className="absolute inset-0 border border-glitch-cyan animate-pulse" />
          </motion.div>

          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="text-xs font-pixel text-white truncate glitch-magenta">
              {currentTrack.title}
            </h3>
            <p className="text-[10px] font-mono text-glitch-cyan/60 uppercase mt-1">
              CH: {currentTrack.artist}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-glitch-cyan/20 pt-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={prevTrack}
              className="text-glitch-cyan hover:bg-glitch-cyan hover:text-void p-1 transition-colors"
            >
              <SkipBack size={16} />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-glitch-cyan text-void p-2 hover:bg-glitch-yellow transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-glitch-cyan hover:bg-glitch-cyan hover:text-void p-1 transition-colors"
            >
              <SkipForward size={16} />
            </button>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className="text-[6px] font-pixel text-glitch-yellow">VOL_CTRL</span>
            <div className="w-16 h-1 bg-glitch-cyan/20 overflow-hidden">
              <div className="w-2/3 h-full bg-glitch-magenta" />
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer: Glitchy Style */}
      <div className="mt-4 flex items-end h-6 gap-[1px]">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              height: isPlaying ? [2, Math.random() * 20 + 2, 2] : 2 
            }}
            transition={{ 
              duration: 0.2 + Math.random() * 0.3, 
              repeat: Infinity,
              ease: "linear"
            }}
            className={`flex-1 ${i % 2 === 0 ? 'bg-glitch-cyan' : 'bg-glitch-magenta'}`}
          />
        ))}
      </div>
    </div>
  );
};

