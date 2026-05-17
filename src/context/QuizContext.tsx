import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, GameState, Achievement, XP_PER_CORRECT, XP_STREAK_BONUS, XP_LEVELS } from '../types';
import { getQuestionsForQuiz } from '../data/questionBank';
import type { Category, Difficulty } from '../types';

interface QuizContextType {
  user: User | null;
  gameState: GameState | null;
  isLoggedIn: boolean;
  login: (username: string, email: string) => void;
  logout: () => void;
  startGame: (category: Category | 'all', difficulty: Difficulty | 'mixed', mode: 'training' | 'competition', count?: number) => void;
  answerQuestion: (answer: string) => boolean;
  nextQuestion: () => void;
  endGame: () => void;
  xpProgress: number;
  allAchievements: Achievement[];
}

const defaultAchievements: Achievement[] = [
  { id: 'first_quiz', name: 'Premier Pas', description: 'Termine ton premier quiz', icon: '🎯' },
  { id: 'streak_3', name: 'En Feu', description: 'Atteins 3 bonnes réponses d\'affilée', icon: '🔥' },
  { id: 'streak_5', name: 'Inarrêtable', description: 'Atteins 5 bonnes réponses d\'affilée', icon: '⚡' },
  { id: 'streak_10', name: 'Légende', description: 'Atteins 10 bonnes réponses d\'affilée', icon: '👑' },
  { id: 'perfect_score', name: 'Score Parfait', description: '100% de bonnes réponses sur un quiz', icon: '💎' },
  { id: 'questions_50', name: 'Explorateur', description: 'Réponds à 50 questions', icon: '🧭' },
  { id: 'questions_100', name: 'Savant', description: 'Réponds à 100 questions', icon: '📚' },
  { id: 'questions_500', name: 'Érudit', description: 'Réponds à 500 questions', icon: '🎓' },
  { id: 'level_5', name: 'Apprenti', description: 'Atteins le niveau 5', icon: '⭐' },
  { id: 'level_10', name: 'Expert', description: 'Atteins le niveau 10', icon: '🌟' },
  { id: 'level_15', name: 'Maître', description: 'Atteins le niveau 15', icon: '🏆' },
  { id: 'all_categories', name: 'Touche-à-Tout', description: 'Joue dans toutes les catégories', icon: '🌈' },
];

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playedCategories, setPlayedCategories] = useState<Set<string>>(new Set());

  // Charger l'utilisateur depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gqm_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        if (parsed.achievements) {
          const cats = parsed.achievements
            .filter((a: Achievement) => a.id.startsWith('played_'))
            .map((a: Achievement) => a.id.replace('played_', ''));
          setPlayedCategories(new Set(cats));
        }
      } catch {}
    }
  }, []);

  const saveUser = useCallback((u: User) => {
    setUser(u);
    localStorage.setItem('gqm_user', JSON.stringify(u));
  }, []);

  const login = useCallback((username: string, email: string) => {
    const newUser: User = {
      id: 'user_' + Date.now(),
      username,
      email,
      xp: 0,
      level: 1,
      streak: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      achievements: [],
      joinedAt: new Date().toISOString(),
    };
    saveUser(newUser);
  }, [saveUser]);

  const logout = useCallback(() => {
    setUser(null);
    setGameState(null);
    localStorage.removeItem('gqm_user');
  }, []);

  const startGame = useCallback((category: Category | 'all', difficulty: Difficulty | 'mixed', mode: 'training' | 'competition', count = 10) => {
    const questions = getQuestionsForQuiz(category, difficulty, count);
    const newGame: GameState = {
      currentQuestion: 0,
      score: 0,
      streak: 0,
      questions,
      answers: new Array(questions.length).fill(null),
      startTime: new Date().toISOString(),
      mode,
      category,
      difficulty,
    };
    setGameState(newGame);
  }, []);

  const answerQuestion = useCallback((answer: string): boolean => {
    if (!gameState || !user) return false;
    const question = gameState.questions[gameState.currentQuestion];
    const isCorrect = answer === question.correctAnswer;

    const newAnswers = [...gameState.answers];
    newAnswers[gameState.currentQuestion] = answer;

    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const xpGain = isCorrect ? XP_PER_CORRECT + (newStreak >= 3 ? XP_STREAK_BONUS * Math.min(newStreak, 10) : 0) : 0;

    const updatedUser = { ...user };
    updatedUser.xp += xpGain;
    updatedUser.streak = Math.max(updatedUser.streak, newStreak);
    updatedUser.questionsAnswered++;

    if (isCorrect) {
      updatedUser.correctAnswers++;
    }

    // Calculer le niveau
    let newLevel = 1;
    for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
      if (updatedUser.xp >= XP_LEVELS[i]) {
        newLevel = i + 1;
        break;
      }
    }
    updatedUser.level = newLevel;

    // Vérifier les succès
    const newAchievements = [...updatedUser.achievements];

    const checkAchievement = (id: string) => !newAchievements.find(a => a.id === id);

    if (checkAchievement('first_quiz') && gameState.currentQuestion === gameState.questions.length - 1) {
      const ach = defaultAchievements.find(a => a.id === 'first_quiz')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('streak_3') && newStreak >= 3) {
      const ach = defaultAchievements.find(a => a.id === 'streak_3')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('streak_5') && newStreak >= 5) {
      const ach = defaultAchievements.find(a => a.id === 'streak_5')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('streak_10') && newStreak >= 10) {
      const ach = defaultAchievements.find(a => a.id === 'streak_10')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('questions_50') && updatedUser.questionsAnswered >= 50) {
      const ach = defaultAchievements.find(a => a.id === 'questions_50')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('questions_100') && updatedUser.questionsAnswered >= 100) {
      const ach = defaultAchievements.find(a => a.id === 'questions_100')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('questions_500') && updatedUser.questionsAnswered >= 500) {
      const ach = defaultAchievements.find(a => a.id === 'questions_500')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('level_5') && newLevel >= 5) {
      const ach = defaultAchievements.find(a => a.id === 'level_5')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('level_10') && newLevel >= 10) {
      const ach = defaultAchievements.find(a => a.id === 'level_10')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }
    if (checkAchievement('level_15') && newLevel >= 15) {
      const ach = defaultAchievements.find(a => a.id === 'level_15')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }

    // Catégories jouées
    if (!playedCategories.has(gameState.questions[gameState.currentQuestion].category)) {
      const newPlayed = new Set(playedCategories);
      newPlayed.add(gameState.questions[gameState.currentQuestion].category);
      setPlayedCategories(newPlayed);
    }

    if (checkAchievement('all_categories') && playedCategories.size >= 6) {
      const ach = defaultAchievements.find(a => a.id === 'all_categories')!;
      newAchievements.push({ ...ach, unlockedAt: new Date().toISOString() });
    }

    updatedUser.achievements = newAchievements;

    setGameState({
      ...gameState,
      score: gameState.score + (isCorrect ? 100 + newStreak * 10 : 0),
      streak: newStreak,
      answers: newAnswers,
    });

    saveUser(updatedUser);
    return isCorrect;
  }, [gameState, user, saveUser, playedCategories]);

  const nextQuestion = useCallback(() => {
    if (!gameState) return;
    if (gameState.currentQuestion < gameState.questions.length - 1) {
      setGameState({ ...gameState, currentQuestion: gameState.currentQuestion + 1 });
    }
  }, [gameState]);

  const endGame = useCallback(() => {
    if (!gameState || !user) return;

    // Vérifier score parfait
    const allCorrect = gameState.answers.every((a, i) => a === gameState.questions[i].correctAnswer);
    if (allCorrect) {
      const ach = defaultAchievements.find(a => a.id === 'perfect_score')!;
      if (!user.achievements.find(a => a.id === 'perfect_score')) {
        const updated = {
          ...user,
          achievements: [...user.achievements, { ...ach, unlockedAt: new Date().toISOString() }],
        };
        saveUser(updated);
      }
    }

    setGameState(null);
  }, [gameState, user, saveUser]);

  const xpProgress = user ? (() => {
    const currentLevelXp = XP_LEVELS[user.level - 1] || 0;
    const nextLevelXp = XP_LEVELS[user.level] || XP_LEVELS[XP_LEVELS.length - 1];
    return ((user.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  })() : 0;

  return (
    <QuizContext.Provider
      value={{
        user,
        gameState,
        isLoggedIn: !!user,
        login,
        logout,
        startGame,
        answerQuestion,
        nextQuestion,
        endGame,
        xpProgress,
        allAchievements: defaultAchievements,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}
