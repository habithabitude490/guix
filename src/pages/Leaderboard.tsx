import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import type { LeaderboardEntry } from '../types';
import { Home, Search } from 'lucide-react';

function generateMockLeaderboard(): LeaderboardEntry[] {
  const names = [
    'QuizMaster99','BrainStorm','ProfesseurX','EduGamer','SmartFox','KnowledgeKing',
    'QuizWizard','ThinkTank','BrainWave','LearnPro','AceStudent','MindPalace',
    'QuizChamp','DataBrain','EduStar','SuperSayan','Neuronaut','FactHunter',
    'QuizQueen','BookWorm','SpeedLearn','BrainGain','TriviaLord','SmartAce','QuizNova',
  ];
  return names.map((name, i) => ({
    username: name, xp: Math.floor(15000 - i * 450 + Math.random() * 300),
    level: Math.max(1, 15 - Math.floor(i * 0.5)),
    accuracy: Math.floor(60 + Math.random() * 35), streak: Math.floor(Math.random() * 20),
  })).sort((a, b) => b.xp - a.xp);
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const { user } = useQuiz();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => { setLeaderboard(generateMockLeaderboard()); }, []);

  const filtered = leaderboard.filter(e => search === '' || e.username.toLowerCase().includes(search.toLowerCase()));
  const userRank = user ? leaderboard.findIndex(e => e.username === user.username) + 1 : -1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate('/')} className="text-white/60 hover:text-white"><Home className="w-4 h-4" /></button>
            <h1 className="text-base font-bold">Classement</h1>
            <div className="w-4" />
          </div>
          {user && userRank > 0 && (
            <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center font-bold">{user.username.charAt(0).toUpperCase()}</div>
              <div className="flex-1"><div className="font-semibold text-sm">{user.username}</div><div className="text-xs text-white/50">{user.xp} XP · Niveau {user.level}</div></div>
              <div className="text-right"><div className="text-xl font-bold text-amber-400">#{userRank}</div><div className="text-[10px] text-white/50">Ton rang</div></div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher un joueur..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
        </div>

        {/* Podium */}
        {filtered.length >= 3 && search === '' && (
          <div className="grid grid-cols-3 gap-2 items-end">
            {[1, 0, 2].map(pos => {
              const entry = filtered[pos];
              const medals = ['👑','🥈','🥉'];
              const bgColors = ['bg-yellow-100 ring-yellow-300','bg-gray-100 ring-gray-300','bg-amber-100 ring-amber-300'];
              return (
                <div key={pos} className={`text-center ${pos === 0 ? '-mt-2' : ''}`}>
                  <div className={`w-12 h-12 mx-auto ${bgColors[pos]} rounded-full flex items-center justify-center text-lg font-bold ring-2 mb-1.5`}>{entry.username.charAt(0)}</div>
                  <div className="text-2xl mb-0.5">{medals[pos]}</div>
                  <div className="font-semibold text-xs text-gray-900 truncate">{entry.username}</div>
                  <div className="text-[10px] text-gray-400">{entry.xp} XP</div>
                </div>
              );
            })}
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {filtered.map((entry, i) => {
            const isMe = user?.username === entry.username;
            return (
              <div key={entry.username} className={`flex items-center gap-3 p-3 border-b border-gray-50 last:border-0 ${isMe ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0 bg-gray-50 text-gray-400">{i + 1}</div>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xs text-gray-500 shrink-0">{entry.username.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate flex items-center gap-1.5">
                    {entry.username} {isMe && <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Toi</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400"><span>Niv.{entry.level}</span><span>{entry.accuracy}%</span><span>Série:{entry.streak}</span></div>
                </div>
                <div className="text-right shrink-0"><div className="font-bold text-sm text-gray-900">{entry.xp.toLocaleString()}</div><div className="text-[10px] text-gray-400">XP</div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
