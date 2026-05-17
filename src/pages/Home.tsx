import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { CATEGORY_NAMES, CATEGORY_COLORS, type Category } from '../types';
import { getQuestionCount, getCategoryCounts } from '../data/questionBank';
import { Brain, Globe, Zap, Trophy, BookOpen, ArrowRight, GraduationCap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useQuiz();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleStart = () => {
    if (!isLoggedIn) { setShowLogin(true); }
    else { navigate('/categories'); }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      login(username.trim(), email.trim());
      setShowLogin(false);
      navigate('/categories');
    }
  };

  const questionCount = getQuestionCount();
  const counts = getCategoryCounts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean & Professional */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-5 py-1.5 text-sm font-medium text-blue-700">
              <GraduationCap className="w-4 h-4" />
              <span>{questionCount.toLocaleString()}+ questions disponibles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Global{' '}
              <span className="text-blue-600">Quiz Master</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
              Une plateforme éducative complète pour apprendre et tester tes connaissances dans 7 disciplines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleStart}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm"
              >
                {isLoggedIn ? 'Commencer un Quiz' : 'Commencer gratuitement'}
                <ArrowRight className="w-4 h-4" />
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="flex items-center gap-2 border border-gray-200 px-8 py-3.5 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Trophy className="w-4 h-4" />
                  Classement
                </button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4">
              {[
                { value: `${questionCount.toLocaleString()}+`, label: 'Questions' },
                { value: '7', label: 'Catégories' },
                { value: '3', label: 'Niveaux' },
              ].map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
            Une plateforme conçue pour apprendre
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-lg mx-auto">
            Tout ce dont tu as besoin pour progresser dans chaque matière
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'IA Intelligente', desc: 'Questions adaptées à ton niveau par intelligence artificielle' },
              { icon: Globe, title: '7 Disciplines', desc: 'Géographie, Histoire, Biologie, Chimie, Physique, Technologie & Culture Générale' },
              { icon: Zap, title: 'Progression XP', desc: '15 niveaux à atteindre et des succès à collectionner' },
              { icon: BookOpen, title: 'Apprentissage', desc: 'Explications détaillées pour chaque question avec images' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all bg-white">
                <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-4">
            Choisis ta discipline
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
            7 catégories couvrant tous les domaines de la connaissance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(Object.entries(CATEGORY_NAMES) as [Category, string][]).map(([key, name]) => (
              <button
                key={key}
                onClick={() => {
                  if (!isLoggedIn) { setShowLogin(true); return; }
                  navigate(`/quiz?category=${key}&difficulty=mixed&mode=training`);
                }}
                className="group relative overflow-hidden rounded-xl p-5 text-left bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CATEGORY_COLORS[key]} flex items-center justify-center mb-3 text-white text-lg`}>
                  {name.split(' ')[0]}
                </div>
                <div className="font-semibold text-gray-900 text-sm">{name.split(' ').slice(1).join(' ')}</div>
                <div className="text-xs text-gray-400 mt-1">{counts[key]?.toLocaleString()} questions</div>
              </button>
            ))}
            <button
              onClick={() => {
                if (!isLoggedIn) { setShowLogin(true); return; }
                navigate('/quiz?category=all&difficulty=mixed&mode=training');
              }}
              className="group relative overflow-hidden rounded-xl p-5 text-left bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mb-3 text-white text-lg">
                🎲
              </div>
              <div className="font-semibold text-gray-900 text-sm">Tout mélanger</div>
              <div className="text-xs text-gray-400 mt-1">{counts['all']?.toLocaleString()} questions</div>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">Global Quiz Master</h3>
          <p className="text-gray-400 text-sm">Apprends, progresse, deviens incollable.</p>
          <p className="text-gray-500 text-xs mt-6">© 2024 Global Quiz Master. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Bienvenue</h2>
            <p className="text-gray-500 text-sm mb-6">Entre ton pseudo pour commencer</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pseudo</label>
                <input
                  type="text" value={username} onChange={e => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="TonPseudo" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  placeholder="ton@email.com"
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                C'est parti
              </button>
            </form>
            <button onClick={() => setShowLogin(false)} className="w-full mt-3 text-gray-400 text-sm hover:text-gray-600">
              Plus tard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
