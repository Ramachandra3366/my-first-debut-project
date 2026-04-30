import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRID_SIZE, INITIAL_SNAKE, GAME_SPEED } from '../constants';
import { Point, Direction } from '../types';
import { Trophy, RefreshCw } from 'lucide-react';

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('UP');
  const [nextDirection, setNextDirection] = useState<Direction>('UP');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = currentSnake.some(
        (segment) => segment.x === newFood!.x && segment.y === newFood!.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('UP');
    setNextDirection('UP');
    setScore(0);
    setIsGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { ...head };
        setDirection(nextDirection);

        switch (nextDirection) {
          case 'UP': newHead.y -= 1; break;
          case 'DOWN': newHead.y += 1; break;
          case 'LEFT': newHead.x -= 1; break;
          case 'RIGHT': newHead.x += 1; break;
        }

        // Check Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check Food Collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const newScore = s + 10;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(interval);
  }, [food, isGameOver, isPaused, nextDirection, generateFood, highScore]);

  // Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cellSize = width / GRID_SIZE;

    // Clear background
    ctx.fillStyle = '#050505'; // void
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines (Retro look)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    // Draw snake (Glitch Magenta/Yellow)
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ffff' : '#ff00ff';
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

    // Draw food (Yellow)
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(
      food.x * cellSize + 2,
      food.y * cellSize + 2,
      cellSize - 4,
      cellSize - 4
    );
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full font-mono uppercase text-[10px]">
        <div className="flex flex-col bg-glitch-cyan text-void px-2 py-1">
          <span>DATA_SCORE_01:</span>
          <span className="text-lg font-bold">{score}</span>
        </div>
        <div className="flex flex-col bg-glitch-magenta text-void px-2 py-1 text-right">
          <span>HIGH_SCORE_BUF:</span>
          <span className="text-lg font-bold">{highScore}</span>
        </div>
      </div>

      <div className="relative border-4 border-glitch-cyan bg-void shadow-[8px_8px_0px_#ff00ff]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="bg-void cursor-none"
          id="snake-canvas"
        />

        <AnimatePresence>
          {isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-glitch-magenta/90 flex flex-col items-center justify-center z-10 p-8 text-center"
            >
              <h2 className="text-2xl font-pixel text-void mb-4 leading-none glitch-magenta-heavy">SYSTEM_CRASH_V0.1</h2>
              <p className="text-void font-mono text-xs mb-8 uppercase">SEGMENTATION_FAULT at score {score}</p>
              <button
                onClick={resetGame}
                className="bg-void text-glitch-cyan px-8 py-4 font-pixel text-xs hover:bg-glitch-yellow hover:text-void transition-colors"
                id="reset-game"
              >
                REBOOT_SYSTEM
              </button>
            </motion.div>
          )}

          {isPaused && !isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-void/80 flex items-center justify-center"
            >
              <span className="text-xl font-pixel text-glitch-yellow animate-pulse">SYSTEM_PAUSED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[8px] font-pixel text-glitch-cyan/60 uppercase tracking-widest flex gap-8">
        <span>[KEYS] DIR</span>
        <span>[SPACE] HALT</span>
      </div>
    </div>
  );
};

