import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { CATEGORY_NAMES, type Category, type Difficulty } from '../types';
import { getCategoryCounts } from '../data/questionBank';
import { ArrowRight, Brain, Swords, BookOpen } from 'lucide-react';

export default function Categories() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'mixed'>('mixed');
  const [selectedMode, setSelectedMode] = useState<'training' | 'competition'>('training');
  const [questionCount, setQuestionCount] = useState(10);
  const counts = getCategoryCounts();

  if (!isLoggedIn) { navigate('/'); return null; }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Configuration du Quiz</h1>
          {user && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg text-sm">
              <span className="text-blue-700 font-semibold">Niv. {user.level}</span>
              <span className="text-gray-500">{user.xp} XP</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Catégorie */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Catégorie</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button onClick={() => setSelectedCategory('all')}
              className={`rounded-lg p-3 text-left transition-all border ${
                selectedCategory === 'all' ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-200' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
              <div className="text-lg mb-0.5">🎲</div>
              <div className="font-semibold text-gray-900 text-sm">Tout</div>
              <div className="text-xs text-gray-400">{counts['all']?.toLocaleString()} q.</div>
            </button>
            {(Object.entries(CATEGORY_NAMES) as [Category, string][]).map(([key, name]) => (
              <button key={key} onClick={() => setSelectedCategory(key)}
                className={`rounded-lg p-3 text-left transition-all border ${
                  selectedCategory === key ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-200' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                <div className="text-lg mb-0.5">{name.split(' ')[0]}</div>
                <div className="font-semibold text-gray-900 text-xs">{name.split(' ').slice(1).join(' ')}</div>
                <div className="text-xs text-gray-400">{counts[key]?.toLocaleString()} q.</div>
              </button>
            ))}
          </div>
        </section>

        {/* Mode */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Mode de jeu</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            <button onClick={() => setSelectedMode('training')}
              className={`rounded-lg p-4 text-left transition-all border flex items-center gap-3 ${
                selectedMode === 'training' ? 'border-emerald-300 bg-emerald-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
              <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center"><BookOpen className="w-4 h-4 text-emerald-600" /></div>
              <div><div className="font-semibold text-gray-900 text-sm">Entraînement</div><div className="text-xs text-gray-400">Apprends à ton rythme</div></div>
            </button>
            <button onClick={() => setSelectedMode('competition')}
              className={`rounded-lg p-4 text-left transition-all border flex items-center gap-3 ${
                selectedMode === 'competition' ? 'border-amber-300 bg-amber-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
              <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center"><Swords className="w-4 h-4 text-amber-600" /></div>
              <div><div className="font-semibold text-gray-900 text-sm">Compétition</div><div className="text-xs text-gray-400">Défie le classement</div></div>
            </button>
          </div>
        </section>

        {/* Difficulté */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Difficulté</h2>
          <div className="flex gap-2">
            {[
              { key: 'mixed', label: 'Mixte' },
              { key: 'easy', label: 'Facile' },
              { key: 'medium', label: 'Moyen' },
              { key: 'hard', label: 'Difficile' },
            ].map(item => (
              <button key={item.key} onClick={() => setSelectedDifficulty(item.key as Difficulty | 'mixed')}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all border ${
                  selectedDifficulty === item.key ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}>
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* Nombre */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Questions</h2>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map(n => (
              <button key={n} onClick={() => setQuestionCount(n)}
                className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all border ${
                  questionCount === n ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'}`}>{n}</button>
            ))}
          </div>
        </section>

        <button onClick={() => navigate(`/quiz?category=${selectedCategory}&difficulty=${selectedDifficulty}&mode=${selectedMode}&count=${questionCount}`)}
          className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Brain className="w-4 h-4" /> Lancer le Quiz <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
