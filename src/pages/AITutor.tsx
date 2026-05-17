import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Brain, Send, Home, Sparkles, User, Bot } from 'lucide-react';

interface Message { id: string; role: 'user' | 'ai'; content: string; timestamp: Date; }

const AI_RESPONSES: Record<string, string[]> = {
  geography: [
    "La géographie est fascinante ! Savais-tu que la Russie s'étend sur 11 fuseaux horaires différents ?",
    "Pour mémoriser les capitales, associe-les à des images mentales. Par exemple, imagine un ours brun pour Berlin !",
    "Les océans couvrent environ 71% de la surface terrestre. Le Pacifique pourrait contenir tous les continents !",
  ],
  history: [
    "L'histoire nous apprend énormément ! La chute de l'Empire romain en 476 marque le début du Moyen Âge.",
    "Pour retenir les dates, utilise le palais mental : associe chaque date à un lieu familier.",
    "La Renaissance (XVe-XVIe siècle) fut un renouveau des arts et des sciences.",
  ],
  biology: [
    "La biologie est la science de la vie ! Le corps humain contient environ 37 000 milliards de cellules.",
    "La photosynthèse : les plantes convertissent la lumière en énergie chimique. Fascinant !",
    "Les mitochondries ont leur propre ADN — c'étaient probablement des bactéries indépendantes il y a des millions d'années.",
  ],
  chemistry: [
    "L'eau (H₂O) est une molécule polaire, ce qui lui donne ses propriétés uniques.",
    "Le tableau périodique compte 118 éléments. Mendeleïev l'a créé en 1869 !",
    "Une mole = 6,022 × 10²³ entités. C'est le nombre d'Avogadro.",
  ],
  general: [
    "La culture générale, c'est la clé pour comprendre le monde !",
    "Apprendre chaque jour quelque chose de nouveau est le secret des plus grands esprits.",
    "La lecture reste l'un des meilleurs moyens d'enrichir sa culture générale.",
  ],
  physics: [
    "Einstein a imaginé la relativité en se demandant ce qu'il verrait en voyageant à la vitesse de la lumière.",
    "L'énergie ne se crée ni ne se détruit, elle se transforme. Premier principe de la thermodynamique.",
    "La gravité n'est pas une force mais une courbure de l'espace-temps selon Einstein.",
  ],
  technology: [
    "Le premier ordinateur ENIAC pesait 30 tonnes et occupait une pièce entière.",
    "L'IA s'inspire du fonctionnement du cerveau humain. Les réseaux de neurones miment nos neurones.",
    "Internet a été créé en 1969 sous le nom ARPANET. Aujourd'hui, plus de 5 milliards de personnes y sont connectées.",
  ],
};

const FALLBACK = [
  "Excellente question ! Continue comme ça, tu progresses bien.",
  "C'est intéressant ! Pour approfondir, je te conseille de faire un quiz sur ce sujet.",
  "J'adore ta curiosité ! N'hésite pas à me poser d'autres questions.",
  "Très bonne réflexion ! L'apprentissage est un voyage, pas une destination.",
];

export default function AITutor() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useQuiz();
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome', role: 'ai',
    content: `Bonjour ${user?.username || ''} ! Je suis ton professeur IA. Pose-moi n'importe quelle question sur la géographie, l'histoire, la biologie, la chimie, la physique, la technologie ou la culture générale.`,
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  if (!isLoggedIn) { navigate('/'); return null; }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]); setInput('');
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: generateResponse(input.trim()), timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-600"><Home className="w-4 h-4" /></button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center"><Brain className="w-3.5 h-3.5 text-blue-600" /></div>
              <div><h1 className="font-semibold text-gray-900 text-sm">Professeur IA</h1><p className="text-xs text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />En ligne</p></div>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-blue-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><Bot className="w-3.5 h-3.5 text-blue-600" /></div>}
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm shadow-sm'}`}>
                <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <span className={`text-[10px] mt-1 block ${msg.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.role === 'user' && <div className="w-7 h-7 bg-gray-200 rounded-lg flex items-center justify-center shrink-0 mt-0.5"><User className="w-3.5 h-3.5 text-gray-500" /></div>}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-100 p-3">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Pose ta question au professeur IA..."
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
          <button onClick={handleSend} disabled={!input.trim()}
            className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="max-w-2xl mx-auto mt-2 flex gap-1.5 flex-wrap">
          {['Explique la photosynthèse', 'Astuces pour mémoriser', 'Qui était Napoléon ?', "Comment fonctionne l'IA ?"].map(s => (
            <button key={s} onClick={() => setInput(s)} className="text-[11px] bg-gray-50 text-gray-500 px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors">{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateResponse(query: string): string {
  const q = query.toLowerCase();
  const categories: Record<string, string[]> = {
    geography: ['géographie','pays','capitale','continent','océan','fleuve','montagne','carte','monde'],
    history: ['histoire','guerre','révolution','empire','roi','siècle','date','napoléon','ancien'],
    biology: ['biologie','cellule','adn','corps','organe','espèce','animal','plante','évolution','photosynthèse'],
    chemistry: ['chimie','élément','atome','molécule','réaction','acide','ph','tableau'],
    general: ['culture','art','musique','sport','cinéma','livre','littérature'],
    physics: ['physique','force','énergie','lumière','gravité','newton','einstein','quantique'],
    technology: ['technologie','ordinateur','code','programmation','internet','ia','algorithme'],
  };
  for (const [cat, kws] of Object.entries(categories)) {
    if (kws.some(kw => q.includes(kw))) return AI_RESPONSES[cat][Math.floor(Math.random() * AI_RESPONSES[cat].length)];
  }
  if (q.includes('aide') || q.includes('astuce') || q.includes('apprendre')) {
    return "Mes astuces :\n\n📚 1. Répétition espacée (1j, 3j, 1 semaine)\n🎯 2. Quiz réguliers\n🧠 3. Associations mentales\n📝 4. Explique à quelqu'un d'autre\n⏰ 5. Sessions de 25 min (Pomodoro)";
  }
  if (q.includes('bonjour') || q.includes('salut')) return "Bonjour ! Prêt(e) à apprendre ? Pose-moi une question sur n'importe quel sujet !";
  if (q.includes('merci')) return "Avec plaisir ! Continue comme ça, tu progresses à chaque quiz.";
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}
