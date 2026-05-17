// ============================================================
// GLOBAL QUIZ MASTER - Backend Server (sql.js version)
// ============================================================

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import initSqlJs from 'sql.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'global_quiz_master_secret_key_2024';
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY || '';

// Middleware
app.use(cors());
app.use(express.json());

// --------------------
// SQLite via sql.js
// --------------------
const DB_PATH = join(__dirname, 'quiz.sqlite');

let SQL = null;
let db = null;

function readDbFile() {
  try {
    const file = fs.readFileSync(DB_PATH);
    return new Uint8Array(file);
  } catch {
    return null;
  }
}

function writeDbFile() {
  if (!db || !SQL) return;
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function toSqlValueArray(params) {
  return params.map(v => (typeof v === 'undefined' ? null : v));
}

function normalizeRows(rows) {
  // sql.js retourne un tableau d'objets; on garde tel quel
  return rows;
}

async function initDatabase() {
  SQL = await initSqlJs({
    locateFile: filename => {
      // sql.js utilise un worker/wasm, laisse Vite/serveur gérer les assets depuis node_modules
      // (si ça échoue, on corrigera locateFile)
      return join(__dirname, 'node_modules', 'sql.js', 'dist', filename);
    },
  });

  const fileData = readDbFile();
  db = fileData ? new SQL.Database(fileData) : new SQL.Database();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      streak INTEGER DEFAULT 0,
      questions_answered INTEGER DEFAULT 0,
      correct_answers INTEGER DEFAULT 0,
      joined_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      correct_count INTEGER NOT NULL,
      category TEXT,
      mode TEXT,
      date TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      wrong_answers TEXT NOT NULL,
      explanation TEXT,
      keywords TEXT,
      image_url TEXT
    );
  `);

  // Seed minimal si la DB est vide (sinon /api/questions renvoie [])
  try {
    const countResult = db.exec('SELECT COUNT(*) as count FROM questions;');
    const count = countResult?.[0]?.values?.[0]?.[0] ?? 0;

    if (count === 0) {
      db.exec(`
        INSERT INTO questions (question, category, difficulty, correct_answer, wrong_answers, explanation, keywords, image_url)
        VALUES
          ('Quelle est la capitale de France ?', 'geography', 'easy', 'Paris', '["Berlin","Rome","Madrid"]', 'Paris est la capitale de la France.', '["paris","capital","france"]', NULL),
          ('Quel est le plus grand océan du monde ?', 'general', 'easy', 'L’océan Pacifique', '["L’océan Atlantique","L’océan Indien","L’océan Arctique"]', 'Le Pacifique couvre environ 30% de la surface terrestre.', '["pacifique","ocean"]', NULL),
          ('Quel élément a pour symbole chimique "O" ?', 'chemistry', 'easy', 'Oxygène', '["Hydrogène","Carbone","Fer"]', 'Le symbole O correspond à l’oxygène.', '["oxygène","O","element"]', NULL),
          ('Quelle loi physique décrit la formule E = mc² ?', 'physics', 'hard', 'L’équivalence masse-énergie', '["Loi d’Ohm","Deuxième loi de Newton","Principe d’Archimède"]', 'E = mc² est la formule d’Einstein.', '["einstein","energie","E=mc2"]', NULL);
      `);
    }
  } finally {
    writeDbFile();
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token requis' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = user;
    next();
  });
}

// Rate limiter simple
const rateLimits = new Map();
function rateLimit(maxRequests = 50, windowMs = 60000) {
  return (req, res, next) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!rateLimits.has(key)) rateLimits.set(key, []);
    const requests = rateLimits.get(key).filter(t => t > windowStart);

    requests.push(now);
    rateLimits.set(key, requests);

    if (requests.length > maxRequests) {
      return res.status(429).json({ error: 'Trop de requêtes. Réessaie plus tard.' });
    }
    next();
  };
}

app.use(rateLimit(100, 60000));

// ============================================================
// ROUTES AUTH
// ============================================================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // sql.js n'a pas prepare/run/get/all comme better-sqlite3
    // On fait INSERT puis SELECT last row via max(id) (simple et OK pour ce projet)
    const safeUser = username.replace(/'/g, "''");
    const safeEmail = email.replace(/'/g, "''");
    const safePass = hashedPassword.replace(/'/g, "''");

    db.exec(`
      INSERT INTO users (username, email, password)
      VALUES ('${safeUser}', '${safeEmail}', '${safePass}');
    `);

    const row = db.exec(`SELECT id FROM users WHERE username = '${safeUser}' ORDER BY id DESC LIMIT 1;`)[0];
    const lastId = row.values[0][0];

    const token = jwt.sign({ id: lastId, username }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: {
        id: lastId,
        username,
        email,
        xp: 0,
        level: 1,
        streak: 0,
        questionsAnswered: 0,
        correctAnswers: 0,
      },
    });
  } catch (err) {
    // sql.js: erreurs SQL parfois peu parlantes
    return res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    writeDbFile();
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'Tous les champs sont requis' });

    const safeUser = username.replace(/'/g, "''");
    const result = db.exec(`SELECT * FROM users WHERE username = '${safeUser}' LIMIT 1;`);

    if (!result || result.length === 0) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const row = result[0];
    const columns = row.columns;
    const values = row.values[0];

    const user = Object.fromEntries(columns.map((c, i) => [c, values[i]]));

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Identifiants invalides' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        questionsAnswered: user.questions_answered,
        correctAnswers: user.correct_answers,
      },
    });
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ============================================================
// ROUTES UTILISATEUR
// ============================================================

app.get('/api/user/profile', authenticateToken, (req, res) => {
  const userId = Number(req.user.id);

  const result = db.exec(`SELECT id, username, email, xp, level, streak, questions_answered, correct_answers, joined_at FROM users WHERE id = ${userId} LIMIT 1;`);
  if (!result || result.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

  const row = result[0];
  const columns = row.columns;
  const values = row.values[0];
  const user = Object.fromEntries(columns.map((c, i) => [c, values[i]]));

  return res.json(user);
});

app.put('/api/user/xp', authenticateToken, (req, res) => {
  const { xp, level, streak, questionsAnswered, correctAnswers } = req.body;

  const userId = Number(req.user.id);

  db.exec(`
    UPDATE users
    SET xp = ${Number(xp)},
        level = ${Number(level)},
        streak = ${Number(streak)},
        questions_answered = ${Number(questionsAnswered)},
        correct_answers = ${Number(correctAnswers)}
    WHERE id = ${userId};
  `);

  writeDbFile();
  res.json({ success: true });
});

app.post('/api/user/result', authenticateToken, (req, res) => {
  const { score, totalQuestions, correctCount, category, mode } = req.body;
  const userId = Number(req.user.id);

  const safeCategory = category ? String(category).replace(/'/g, "''") : null;
  const safeMode = mode ? String(mode).replace(/'/g, "''") : null;

  db.exec(`
    INSERT INTO results (user_id, score, total_questions, correct_count, category, mode)
    VALUES (
      ${userId},
      ${Number(score)},
      ${Number(totalQuestions)},
      ${Number(correctCount)},
      ${safeCategory === null ? 'NULL' : `'${safeCategory}'`},
      ${safeMode === null ? 'NULL' : `'${safeMode}'`}
    );
  `);

  writeDbFile();
  res.json({ success: true });
});

// ============================================================
// ROUTES CLASSEMENT
// ============================================================

app.get('/api/leaderboard', (req, res) => {
  const result = db.exec(`
    SELECT username, xp, level, questions_answered, correct_answers
    FROM users
    ORDER BY xp DESC
    LIMIT 50;
  `);

  const rows = result && result[0] ? normalizeRows(result[0].values.map(v => {
    const columns = result[0].columns;
    return Object.fromEntries(columns.map((c, i) => [c, v[i]]));
  })) : [];

  const formatted = rows.map(u => ({
    username: u.username,
    xp: u.xp,
    level: u.level,
    accuracy: u.questions_answered > 0 ? Math.round((u.correct_answers / u.questions_answered) * 100) : 0,
    streak: 0,
  }));

  res.json(formatted);
});

// ============================================================
// ROUTES IMAGES (UNSPLASH PROXY)
// ============================================================

const imageCache = new Map();

app.get('/api/images/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) return res.status(400).json({ error: 'Paramètre query requis' });

    const cacheKey = String(query).toLowerCase().trim();
    if (imageCache.has(cacheKey)) return res.json(imageCache.get(cacheKey));

    if (!UNSPLASH_API_KEY || UNSPLASH_API_KEY.includes('INSÈRE')) {
      const fallback = getFallbackUrls(String(query));
      imageCache.set(cacheKey, fallback);
      return res.json(fallback);
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(String(query) + ' education learning')}&per_page=5&orientation=landscape`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` },
      }
    );

    if (!response.ok) {
      const fallback = getFallbackUrls(String(query));
      imageCache.set(cacheKey, fallback);
      return res.json(fallback);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const images = data.results.map(r => ({
        id: r.id,
        url: r.urls.regular,
        thumb: r.urls.thumb,
        alt: r.alt_description || String(query),
        photographer: r.user.name,
      }));

      imageCache.set(cacheKey, images);
      return res.json(images);
    }

    const fallback = getFallbackUrls(String(query));
    imageCache.set(cacheKey, fallback);
    return res.json(fallback);
  } catch {
    const fallback = getFallbackUrls(String(req.query.query || 'education'));
    return res.json(fallback);
  }
});

function getFallbackUrls(query) {
  const q = query.toLowerCase();

  const topicMap = {
    paris: '1502602898657-3e917c5d74ca',
    londres: '1513635265988-8e8e9b2c5e43',
    berlin: '1560969184-10fe8719e047',
    rome: '1552832230-019f6a913ac2',
    madrid: '1539037119-8e9c9b6c6f48',
    amsterdam: '1534353436294-0d4b6eeb6f74',
    tokyo: '1540959733332-eab4deedee1f',
    pekin: '1508808787069-421e79a6c2c9',
    washington: '1480714378408-67cf0d13bc1c',
    moscou: '1512496186-b0d8e1e0b0d8',
    france: '1502602898657-3e917c5d74ca',
    italie: '1523906834658-4b7b0b0b0b0b',
    japon: '1540959733332-eab4deedee1f',
    chine: '1508808787069-421e79a6c2c9',
    inde: '1524492412937-b28074a5d7da',
    bresil: '1483729553673-ee9b2c2c2c2c',
    canada: '1503614472-8c93d996b3b3',
    australie: '1523482580672-f109ba8cb9be',
    egypte: '1572252009286-4c6c8c8c8c8c',
    suisse: '1530122037265-a5f1f91d3b99',
    everest: '1464822759023-fed622ff2c3b',
    adn: '1532094349884-543bc11b234d',
    cellule: '1532094349884-543bc11b234d',
    laboratoire: '1603126857599-f6e157fa2fe6',
    chimie: '1554475901-4538ddfbccc2',
    physique: '1636466497217-26a8cbeaf0cf',
    univers: '1518640467707-6811f4a6ab73',
    ordinateur: '1518770660439-4636190af475',
    code: '1555066931-4365d14bab8c',
    football: '1579952363-4b7b0b0b0b0b',
    lune: '1518640467707-6811f4a6ab73',
    desert: '1509316785-3e6e6e6e6e6e',
    ocean: '1507528345-5e6e6e6e6e6e',
    montagne: '1464822759023-fed622ff2c3b',
    histoire: '1461360228754-6e81c478b882',
    livre: '1497633762265-9d179a990aa6',
    art: '1513542789411-b6a5d4f31634',
    musique: '1511671782779-4b7b0b0b0b0b',
    sport: '1461896836934-014acb49139a',
    carte: '1526778548025-fa2f459cd5c1',
    terre: '1451187580459-43490279c0fa',
  };

  for (const [topic, photoId] of Object.entries(topicMap)) {
    if (q.includes(topic)) {
      return [{ url: `https://images.unsplash.com/photo-${photoId}?w=800&q=80`, alt: topic, photographer: 'Unsplash' }];
    }
  }

  const categoryImages = {
    geography: '1526778548025-fa2f459cd5c1',
    history: '1461360228754-6e81c478b882',
    biology: '1532094349884-543bc11b234d',
    chemistry: '1603126857599-f6e157fa2fe6',
    physics: '1636466497217-26a8cbeaf0cf',
    technology: '1518770660439-4636190af475',
    general: '1497633762265-9d179a990aa6',
  };

  for (const [cat, photoId] of Object.entries(categoryImages)) {
    if (q.includes(cat)) {
      return [{ url: `https://images.unsplash.com/photo-${photoId}?w=800&q=80`, alt: cat, photographer: 'Unsplash' }];
    }
  }

  return [{ url: `https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80`, alt: 'Education', photographer: 'Unsplash' }];
}

// ============================================================
// ROUTES QUESTIONS (CRUD)
// ============================================================

app.get('/api/questions', (req, res) => {
  try {
    const { category, difficulty, limit = 10, offset = 0 } = req.query;

    let sql = 'SELECT * FROM questions WHERE 1=1';
    const where = [];

    if (category && category !== 'all') where.push(`category = '${String(category).replace(/'/g, "''")}'`);
    if (difficulty && difficulty !== 'mixed') where.push(`difficulty = '${String(difficulty).replace(/'/g, "''")}'`);

    if (where.length > 0) sql += ' AND ' + where.join(' AND ');

    // sql.js supporte RANDOM() dans SQLite
    sql += ` ORDER BY RANDOM() LIMIT ${Number(limit)} OFFSET ${Number(offset)};`;

    const result = db.exec(sql);
    if (!result || result.length === 0) return res.json([]);

    const row = result[0];
    const columns = row.columns;
    const values = row.values;

    const questions = values.map(v => {
      const q = Object.fromEntries(columns.map((c, i) => [c, v[i]]));
      return {
        ...q,
        wrongAnswers: JSON.parse(q.wrong_answers || '[]'),
        keywords: JSON.parse(q.keywords || '[]'),
      };
    });

    res.json(questions);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ============================================================
// START
// ============================================================

initDatabase()
  .then(() => {
    // Servir les fichiers statiques du frontend build
    app.use(express.static(join(__dirname, '..', 'dist')));

    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
    });

    app.listen(PORT, () => {
      console.log(`🌍 Global Quiz Master API running on http://localhost:${PORT}`);
      const q1 = db.exec('SELECT COUNT(*) as count FROM questions;');
      const q2 = db.exec('SELECT COUNT(*) as count FROM users;');

      const questionsCount = q1?.[0]?.values?.[0]?.[0] ?? 0;
      const usersCount = q2?.[0]?.values?.[0]?.[0] ?? 0;

      console.log(`📚 ${questionsCount} questions en base`);
      console.log(`👥 ${usersCount} utilisateurs enregistrés`);
    });
  })
  .catch(err => {
    console.error('DB init failed:', err);
    process.exit(1);
  });
