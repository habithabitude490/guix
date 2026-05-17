import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { XP_LEVELS } from '../types';
import { Trophy, Zap, Target, BookOpen, Star, Award, LogOut, Home, ArrowRight } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, xpProgress, allAchievements } = useQuiz();

  if (!isLoggedIn || !user) { navigate('/'); return null; }

  const currentLevelXp = XP_LEVELS[user.level - 1] || 0;
  const nextLevelXp = XP_LEVELS[user.level] || XP_LEVELS[XP_LEVELS.length - 1];
  const xpNeeded = nextLevelXp - currentLevelXp;
  const xpCurrent = user.xp - currentLevelXp;
  const accuracy = user.questionsAnswered > 0 ? Math.round((user.correctAnswers / user.questionsAnswered) * 100) : 0;
  const unlocked = user.achievements || [];
  const locked = allAchievements.filter(a => !unlocked.find(ua => ua.id === a.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-14">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate('/')} className="text-white/60 hover:text-white"><Home className="w-4 h-4" /></button>
            <button onClick={() => { logout(); navigate('/'); }} className="text-white/60 hover:text-white flex items-center gap-1 text-xs"><LogOut className="w-3.5 h-3.5" />Déconnexion</button>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl font-bold mb-3 ring-4 ring-white/10">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-white/50 text-xs">{user.email}</p>
            <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 mt-3 text-xs">
              <Star className="w-3.5 h-3.5 text-amber-400" /> Niveau {user.level}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 space-y-5 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Zap, label: 'XP', value: user.xp.toLocaleString(), color: 'text-amber-600 bg-amber-50' },
            { icon: Target, label: 'Précision', value: `${accuracy}%`, color: 'text-emerald-600 bg-emerald-50' },
            { icon: BookOpen, label: 'Questions', value: user.questionsAnswered.toString(), color: 'text-blue-600 bg-blue-50' },
            { icon: Trophy, label: 'Série', value: user.streak.toString(), color: 'text-orange-600 bg-orange-50' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-3 text-center border border-gray-100 shadow-sm">
              <div className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center mb-1.5 ${s.color}`}><s.icon className="w-4 h-4" /></div>
              <div className="font-bold text-sm text-gray-900">{s.value}</div>
              <div className="text-[10px] text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>

        {/* XP Bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900 text-sm">Progression</h3>
            <span className="text-xs text-gray-500">{xpCurrent} / {xpNeeded} XP</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-700" style={{ width: `${xpProgress}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
            <span>Niv. {user.level}</span><span>Niv. {user.level + 1}</span>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" />Succès ({unlocked.length}/{allAchievements.length})</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {[...unlocked, ...locked].map(ach => {
              const isUnlocked = !!unlocked.find(ua => ua.id === ach.id);
              return (
                <div key={ach.id} className={`rounded-lg p-2.5 text-center border ${isUnlocked ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100 opacity-50'}`}>
                  <div className="text-lg mb-0.5">{isUnlocked ? ach.icon : '🔒'}</div>
                  <div className="font-semibold text-[11px] text-gray-800">{ach.name}</div>
                  <div className="text-[10px] text-gray-400">{ach.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate('/categories')} className="bg-blue-600 text-white rounded-lg py-2.5 font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5">
            Quiz <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => navigate('/leaderboard')} className="bg-gray-800 text-white rounded-lg py-2.5 font-semibold text-sm hover:bg-gray-900 transition-colors flex items-center justify-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" /> Classement
          </button>
        </div>
      </div>
    </div>
  );
}
