export type Category = 'geography' | 'history' | 'biology' | 'chemistry' | 'general' | 'physics' | 'technology';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  question: string;
  category: Category;
  difficulty: Difficulty;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
  keywords: string[];
  imageUrl?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  questionsAnswered: number;
  correctAnswers: number;
  achievements: Achievement[];
  joinedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  streak: number;
  questions: Question[];
  answers: (string | null)[];
  startTime: string;
  mode: 'training' | 'competition';
  category: Category | 'all';
  difficulty: Difficulty | 'mixed';
}

export interface LeaderboardEntry {
  username: string;
  xp: number;
  level: number;
  accuracy: number;
  streak: number;
}

export const CATEGORY_NAMES: Record<Category, string> = {
  geography: '🌍 Géographie',
  history: '📜 Histoire',
  biology: '🧬 Biologie',
  chemistry: '⚗️ Chimie',
  general: '🎯 Culture Générale',
  physics: '⚡ Physique',
  technology: '💻 Technologie',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  geography: 'from-emerald-600 to-teal-700',
  history: 'from-amber-600 to-orange-700',
  biology: 'from-green-600 to-emerald-700',
  chemistry: 'from-blue-600 to-sky-700',
  general: 'from-slate-600 to-gray-700',
  physics: 'from-cyan-600 to-blue-700',
  technology: 'from-gray-600 to-slate-700',
};

export const XP_PER_CORRECT = 25;
export const XP_STREAK_BONUS = 10;
export const XP_LEVELS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000, 17000, 23000, 30000, 40000, 55000];
