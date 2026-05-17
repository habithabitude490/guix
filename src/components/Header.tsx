import { Link, useLocation } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Brain, Trophy, MessageCircle, Home } from 'lucide-react';

export default function Header() {
  const { user, isLoggedIn } = useQuiz();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="hidden sm:inline text-sm">Global Quiz Master</span>
            <span className="sm:hidden text-sm">GQM</span>
          </Link>

          {isLoggedIn && (
            <div className="flex items-center gap-0.5">
              <Link to="/" className={`p-2 rounded-lg transition-colors ${isActive('/') ? 'bg-gray-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Accueil">
                <Home className="w-4 h-4" />
              </Link>
              <Link to="/categories" className={`p-2 rounded-lg transition-colors ${isActive('/categories') ? 'bg-gray-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Quiz">
                <Brain className="w-4 h-4" />
              </Link>
              <Link to="/leaderboard" className={`p-2 rounded-lg transition-colors ${isActive('/leaderboard') ? 'bg-gray-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Classement">
                <Trophy className="w-4 h-4" />
              </Link>
              <Link to="/ai-tutor" className={`p-2 rounded-lg transition-colors ${isActive('/ai-tutor') ? 'bg-gray-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Prof. IA">
                <MessageCircle className="w-4 h-4" />
              </Link>
              <Link to="/profile" className={`p-2 rounded-lg transition-colors ${isActive('/profile') ? 'bg-gray-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} title="Profil">
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {user?.username?.charAt(0)?.toUpperCase() || '?'}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
