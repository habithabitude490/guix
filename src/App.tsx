import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Header from './components/Header';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AITutor from './pages/AITutor';

export default function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/ai-tutor" element={<AITutor />} />
            </Routes>
          </main>
        </div>
      </QuizProvider>
    </BrowserRouter>
  );
}
