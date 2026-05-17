import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { CATEGORY_NAMES, type Category, type Difficulty, XP_PER_CORRECT, XP_STREAK_BONUS } from '../types';
import { getImageForQuestion } from '../services/imageService';
import { Check, X, Zap, Trophy, ChevronRight, Home, RotateCcw, Brain } from 'lucide-react';

export default function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, gameState, isLoggedIn, startGame, answerQuestion, nextQuestion, endGame, xpProgress } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [imageLoading, setImageLoading] = useState(true);
  const [xpGained, setXpGained] = useState(0);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [imageError, setImageError] = useState(false);

  const category = (searchParams.get('category') || 'all') as Category | 'all';
  const difficulty = (searchParams.get('difficulty') || 'mixed') as Difficulty | 'mixed';
  const mode = (searchParams.get('mode') || 'training') as 'training' | 'competition';

  useEffect(() => { if (!isLoggedIn) navigate('/'); else startGame(category, difficulty, mode); }, [isLoggedIn]);

  useEffect(() => {
    if (gameState && gameState.questions.length > 0) {
      const question = gameState.questions[gameState.currentQuestion];
      setImageLoading(true);
      setImageError(false);
      setCurrentImage('');
      getImageForQuestion(question).then(url => {
        setCurrentImage(url);
        setImageLoading(false);
      }).catch(() => { setImageLoading(false); setImageError(true); });
    }
  }, [gameState?.currentQuestion, gameState?.questions.length]);

  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer !== null || !gameState) return;
    setSelectedAnswer(answer);
    const correct = answerQuestion(answer);
    setIsCorrect(correct);
    setShowExplanation(true);
    if (correct) {
      const streak = gameState.streak;
      const gained = XP_PER_CORRECT + (streak >= 3 ? XP_STREAK_BONUS * Math.min(streak, 10) : 0);
      setXpGained(gained);
      setShowXpAnimation(true);
      setTimeout(() => setShowXpAnimation(false), 2000);
    }
  }, [selectedAnswer, gameState, answerQuestion]);

  const handleNext = useCallback(() => {
    if (!gameState) return;
    if (gameState.currentQuestion < gameState.questions.length - 1) {
      setSelectedAnswer(null); setIsCorrect(null); setShowExplanation(false);
      nextQuestion();
    } else {
      endGame(); setQuizFinished(true);
    }
  }, [gameState, nextQuestion, endGame]);

  const handleRestart = () => {
    setQuizFinished(false); setSelectedAnswer(null); setIsCorrect(null);
    setShowExplanation(false); startGame(category, difficulty, mode);
  };

  if (!isLoggedIn || !user) return null;

  if (!gameState && !quizFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 text-sm">Préparation du quiz...</p>
        </div>
      </div>
    );
  }

  // Résultats finaux
  if (quizFinished && gameState) {
    const total = gameState.questions.length;
    const correct = gameState.answers.filter((a, i) => a === gameState.questions[i].correctAnswer).length;
    const accuracy = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-6">
            <div className="text-5xl">{accuracy >= 80 ? '🏆' : accuracy >= 50 ? '👍' : '💪'}</div>
            <h2 className="text-2xl font-bold text-gray-900">Quiz terminé</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: `${correct}/${total}`, label: 'Correctes', color: 'text-blue-600' },
                { val: `${accuracy}%`, label: 'Précision', color: 'text-emerald-600' },
                { val: gameState.score.toString(), label: 'Points', color: 'text-amber-600' },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3">
                  <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Niveau {user.level}</span><span>{user.xp} XP</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${xpProgress}%` }} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleRestart} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                <RotateCcw className="w-4 h-4" /> Rejouer
              </button>
              <button onClick={() => navigate('/categories')} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                <Home className="w-4 h-4" /> Accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState) return null;

  const question = gameState.questions[gameState.currentQuestion];
  const progress = ((gameState.currentQuestion + (selectedAnswer ? 1 : 0)) / gameState.questions.length) * 100;
  const allAnswers = shuffleArray([question.correctAnswer, ...question.wrongAnswers]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/categories')} className="text-gray-400 hover:text-gray-600"><Home className="w-4 h-4" /></button>
              <span className="text-xs font-medium text-gray-500">{CATEGORY_NAMES[question.category]}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                question.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700' :
                question.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
              }`}>
                {question.difficulty === 'easy' ? 'Facile' : question.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-amber-600 font-semibold"><Trophy className="w-3.5 h-3.5" />{gameState.score}</div>
              {gameState.streak >= 3 && <div className="flex items-center gap-1 text-orange-500 font-semibold animate-pulse"><Zap className="w-3.5 h-3.5" />x{gameState.streak}</div>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">{gameState.currentQuestion + 1}/{gameState.questions.length}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* XP animation */}
      {showXpAnimation && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-amber-500 text-white px-5 py-2 rounded-full font-bold text-sm shadow-lg">+{xpGained} XP</div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">
        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {imageLoading && (
            <div className="w-full h-48 sm:h-56 bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="w-7 h-7 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {currentImage && !imageError && (
            <img src={currentImage} alt="Illustration" className={`w-full h-48 sm:h-56 object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoading(false)} onError={() => { setImageError(true); setImageLoading(false); }} />
          )}
          {(!currentImage || imageError) && !imageLoading && (
            <div className="w-full h-48 sm:h-56 bg-gray-50 flex items-center justify-center">
              <Brain className="w-12 h-12 text-gray-200" />
            </div>
          )}
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">{question.question}</h3>
        </div>

        {/* Answers */}
        <div className="grid gap-2.5">
          {allAnswers.map((answer, i) => {
            let style = 'bg-white border-gray-150 hover:border-blue-300 hover:bg-blue-50/50';
            if (selectedAnswer !== null) {
              if (answer === question.correctAnswer) style = 'bg-emerald-50 border-emerald-400 text-emerald-800';
              else if (answer === selectedAnswer && !isCorrect) style = 'bg-red-50 border-red-400 text-red-800';
              else style = 'bg-white border-gray-150 opacity-50';
            }
            return (
              <button key={i} onClick={() => handleAnswer(answer)} disabled={selectedAnswer !== null}
                className={`w-full text-left p-3.5 rounded-lg border-2 transition-all ${style} ${selectedAnswer === null ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'}`}>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">{String.fromCharCode(65 + i)}</span>
                  <span className="font-medium text-sm">{answer}</span>
                  {selectedAnswer !== null && answer === question.correctAnswer && <Check className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />}
                  {selectedAnswer === answer && !isCorrect && <X className="w-4 h-4 text-red-500 ml-auto shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`rounded-xl p-5 border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-3">
              <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{isCorrect ? 'Bonne réponse !' : 'Pas tout à fait...'}</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{question.explanation}</p>
                {isCorrect && gameState.streak >= 3 && (
                  <p className="text-orange-600 font-medium text-xs mt-2 flex items-center gap-1"><Zap className="w-3 h-3" />Bonus de série x{gameState.streak}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next */}
        {showExplanation && (
          <button onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            {gameState.currentQuestion < gameState.questions.length - 1 ? (
              <>Question suivante <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>Voir les résultats <Trophy className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
