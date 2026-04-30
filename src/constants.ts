import { Track } from './types';

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    artist: 'AI Synthwave',
    duration: 184,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder audio
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Cyber Drift',
    artist: 'Future Beats',
    duration: 215,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Ether Glow',
    artist: 'Luminal Space',
    duration: 142,
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const GAME_SPEED = 100; // ms
