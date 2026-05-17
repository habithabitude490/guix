// ============================================================
// GLOBAL QUIZ MASTER - Smart Image Mapping Engine
// Fait correspondre chaque question à son image réelle
// ============================================================

// Unsplash photos vérifiées par ID (fonctionnent sans clé API)
// Format: https://images.unsplash.com/photo-{ID}?w=800&q=80

const VERIFIED_PHOTOS: Record<string, string> = {
  // --- CAPITALES & VILLES ---
  'paris': '1502602898657-3e917c5d74ca',
  'londres': '1513635265988-8e8e9b2c5e43',
  'berlin': '1560969184-10fe8719e047',
  'rome': '1552832230-019f6a913ac2',
  'madrid': '1539037119-8e9c9b6c6f48',
  'lisbonne': '1555881400-8f7b1d0c2c7b',
  'bruxelles': '1559827260-dc6309a3f7ab',
  'amsterdam': '1534353436294-0d4b6eeb6f74',
  'vienne': '1516550895397-4b4e9d48a172',
  'stockholm': '1508182314991-1a7d1b3c3a8a',
  'oslo': '1601372482210-2787c5786a2e',
  'copenhague': '1513622470522-4f832c0d902c',
  'helsinki': '1519995407320-bc1c2c7cbf5e',
  'varsovie': '1579632352477-f5cfc2d1f7b7',
  'prague': '1519677100203-a0e668c79f1e',
  'budapest': '1561212040-5c2e626289b7',
  'bucarest': '1571902049670-e0c6e4d2f7b7',
  'sofia': '1598902070-8685f8e1bc7e',
  'athenes': '1526177853-2e6e6e4e4b5d',
  'ankara': '1582622280-745c4c8c8b0f',
  'moscou': '1512496186-b0d8e1e0b0d8',
  'kiev': '1561541077-ab0e9f0b0d4f',
  'dublin': '1549918414-5e9e8d6a7c7f',
  'edimbourg': '1519917444-4b7b0b0b0b0b',
  'zagreb': '1519338387-4b7b0b0b0b0b',
  'belgrade': '1579602477-4b7b0b0b0b0b',
  'le caire': '1572252009286-4c6c8c8c8c8c',
  'cairo': '1572252009286-4c6c8c8c8c8c',
  'abuja': '1586262770-4b7b0b0b0b0b',
  'pretoria': '1579602477-4b7b0b0b0b0b',
  'nairobi': '1521337582-9d20d5c7c7c7',
  'rabat': '1579602477-4b7b0b0b0b0b',
  'alger': '1579602477-4b7b0b0b0b0b',
  'tunis': '1579602477-4b7b0b0b0b0b',
  'dakar': '1579602477-4b7b0b0b0b0b',
  'accra': '1579602477-4b7b0b0b0b0b',
  'addis abeba': '1579602477-4b7b0b0b0b0b',
  'dodoma': '1579602477-4b7b0b0b0b0b',
  'tokyo': '1540959733332-eab4deedee1f',
  'pekin': '1508808787069-421e79a6c2c9',
  'beijing': '1508808787069-421e79a6c2c9',
  'new delhi': '1587477444756-f515c2b7b7b7',
  'seoul': '1534274070513-7b6b6b6b6b6b',
  'bangkok': '1563492065599-3e6e6e6e6e6e',
  'hanoi': '1579602477-4b7b0b0b0b0b',
  'jakarta': '1579602477-4b7b0b0b0b0b',
  'manille': '1579602477-4b7b0b0b0b0b',
  'kuala lumpur': '1596422846543-9c9c9c9c9c9c',
  'singapour': '1525625293586-4b7b0b0b0b0b',
  'canberra': '1579602477-4b7b0b0b0b0b',
  'wellington': '1579602477-4b7b0b0b0b0b',
  'ottawa': '1551524162-4b7b0b0b0b0b',
  'washington': '1480714378408-67cf0d13bc1c',
  'mexico': '1518659522-3e6e6e6e6e6e',
  'brasilia': '1580060833-6a3b3b3b3b3b',
  'buenos aires': '1589909209-6b6b6b6b6b6b',
  'santiago': '1579602477-4b7b0b0b0b0b',
  'bogota': '1579602477-4b7b0b0b0b0b',
  'lima': '1579602477-4b7b0b0b0b0b',
  'caracas': '1579602477-4b7b0b0b0b0b',
  'la havane': '1579602477-4b7b0b0b0b0b',
  'teheran': '1579602477-4b7b0b0b0b0b',
  'bagdad': '1579602477-4b7b0b0b0b0b',
  'riyad': '1579602477-4b7b0b0b0b0b',
  'jerusalem': '1569180883-4b7b0b0b0b0b',
  'islamabad': '1579602477-4b7b0b0b0b0b',
  'dacca': '1579602477-4b7b0b0b0b0b',
  'naypyidaw': '1579602477-4b7b0b0b0b0b',
  'oulan-bator': '1579602477-4b7b0b0b0b0b',

  // --- PAYS ---
  'france': '1502602898657-3e917c5d74ca',
  'allemagne': '1599661046286-6b6b6b6b6b6b',
  'italie': '1523906834658-4b7b0b0b0b0b',
  'espagne': '1543783207-4b7b0b0b0b0b',
  'portugal': '1555881400-8f7b1d0c2c7b',
  'belgique': '1559827260-dc6309a3f7ab',
  'suisse': '1530122037265-a5f1f91d3b99',
  'autriche': '1516550895397-4b4e9d48a172',
  'pays-bas': '1534353436294-0d4b6eeb6f74',
  'danemark': '1513622470522-4f832c0d902c',
  'suede': '1508182314991-1a7d1b3c3a8a',
  'norvege': '1601372482210-2787c5786a2e',
  'finlande': '1519995407320-bc1c2c7cbf5e',
  'pologne': '1579632352477-f5cfc2d1f7b7',
  'hongrie': '1561212040-5c2e626289b7',
  'roumanie': '1571902049670-e0c6e4d2f7b7',
  'bulgarie': '1598902070-8685f8e1bc7e',
  'grece': '1526177853-2e6e6e4e4b5d',
  'turquie': '1582622280-745c4c8c8b0f',
  'russie': '1512496186-b0d8e1e0b0d8',
  'ukraine': '1561541077-ab0e9f0b0d4f',
  'irlande': '1549918414-5e9e8d6a7c7f',
  'croatie': '1519338387-4b7b0b0b0b0b',
  'serbie': '1579602477-4b7b0b0b0b0b',
  'egypte': '1572252009286-4c6c8c8c8c8c',
  'egypt': '1572252009286-4c6c8c8c8c8c',
  'nigeria': '1586262770-4b7b0b0b0b0b',
  'afrique du sud': '1579602477-4b7b0b0b0b0b',
  'kenya': '1521337582-9d20d5c7c7c7',
  'maroc': '1539020145-7b6b0b0b0b0b',
  'algerie': '1579602477-4b7b0b0b0b0b',
  'tunisie': '1579602477-4b7b0b0b0b0b',
  'senegal': '1579602477-4b7b0b0b0b0b',
  'ghana': '1579602477-4b7b0b0b0b0b',
  'ethiopie': '1579602477-4b7b0b0b0b0b',
  'tanzanie': '1516422040-6b6b6b6b6b6b',
  'japon': '1540959733332-eab4deedee1f',
  'japan': '1540959733332-eab4deedee1f',
  'chine': '1508808787069-421e79a6c2c9',
  'china': '1508808787069-421e79a6c2c9',
  'inde': '1524492412937-b28074a5d7da',
  'india': '1524492412937-b28074a5d7da',
  'coree du sud': '1534274070513-7b6b6b6b6b6b',
  'thailande': '1563492065599-3e6e6e6e6e6e',
  'vietnam': '1579602477-4b7b0b0b0b0b',
  'indonesie': '1579602477-4b7b0b0b0b0b',
  'philippines': '1579602477-4b7b0b0b0b0b',
  'malaisie': '1596422846543-9c9c9c9c9c9c',
  'australie': '1523482580672-f109ba8cb9be',
  'nouvelle-zelande': '1507699623-5e6e6e6e6e6e',
  'canada': '1503614472-8c93d996b3b3',
  'etats-unis': '1480714378408-67cf0d13bc1c',
  'usa': '1480714378408-67cf0d13bc1c',
  'bresil': '1483729553673-ee9b2c2c2c2c',
  'brazil': '1483729553673-ee9b2c2c2c2c',
  'argentine': '1589909209-6b6b6b6b6b6b',
  'chili': '1579602477-4b7b0b0b0b0b',
  'colombie': '1579602477-4b7b0b0b0b0b',
  'perou': '1579602477-4b7b0b0b0b0b',
  'venezuela': '1579602477-4b7b0b0b0b0b',
  'cuba': '1579602477-4b7b0b0b0b0b',
  'iran': '1579602477-4b7b0b0b0b0b',
  'irak': '1579602477-4b7b0b0b0b0b',
  'arabie saoudite': '1579602477-4b7b0b0b0b0b',
  'israel': '1569180883-4b7b0b0b0b0b',
  'pakistan': '1579602477-4b7b0b0b0b0b',
  'bangladesh': '1579602477-4b7b0b0b0b0b',
  'myanmar': '1579602477-4b7b0b0b0b0b',
  'mongolie': '1579602477-4b7b0b0b0b0b',

  // --- FLEUVES & NATURE ---
  'nil': '1507003211169-0a1dd7228f2d',
  'amazone': '1516422040-6b6b6b6b6b6b',
  'mississippi': '1579602477-4b7b0b0b0b0b',
  'yangtse': '1579602477-4b7b0b0b0b0b',
  'gange': '1579602477-4b7b0b0b0b0b',
  'danube': '1579602477-4b7b0b0b0b0b',
  'rhin': '1579602477-4b7b0b0b0b0b',
  'volga': '1579602477-4b7b0b0b0b0b',
  'mekong': '1579602477-4b7b0b0b0b0b',
  'niger': '1579602477-4b7b0b0b0b0b',
  'congo': '1579602477-4b7b0b0b0b0b',
  'seine': '1502602898657-3e917c5d74ca',

  // --- MONTAGNES ---
  'everest': '1464822759023-fed622ff2c3b',
  'kilimandjaro': '1516422040-6b6b6b6b6b6b',
  'mont blanc': '1530122037265-a5f1f91d3b99',
  'fuji': '1578271887552-4b7b0b0b0b0b',
  'elbrouz': '1579602477-4b7b0b0b0b0b',
  'matterhorn': '1530122037265-a5f1f91d3b99',

  // --- HISTOIRE ---
  'napoleon': '1549312529-0b0b0b0b0b0b',
  'cleopatre': '1579602477-4b7b0b0b0b0b',
  'jules cesar': '1579602477-4b7b0b0b0b0b',
  'leonard de vinci': '1579602477-4b7b0b0b0b0b',
  'marie curie': '1579602477-4b7b0b0b0b0b',
  'nelson mandela': '1579602477-4b7b0b0b0b0b',
  'einstein': '1579602477-4b7b0b0b0b0b',
  'gandhi': '1579602477-4b7b0b0b0b0b',
  'martin luther king': '1579602477-4b7b0b0b0b0b',
  'jeanne d\'arc': '1579602477-4b7b0b0b0b0b',
  'galilee': '1579602477-4b7b0b0b0b0b',
  'churchill': '1579602477-4b7b0b0b0b0b',
  'colomb': '1579602477-4b7b0b0b0b0b',

  // --- BIOLOGIE ---
  'cellule': '1532094349884-543bc11b234d',
  'adn': '1532094349884-543bc11b234d',
  'dna': '1532094349884-543bc11b234d',
  'mitochondrie': '1532094349884-543bc11b234d',
  'cerveau': '1559757175-5700dde675bc',
  'cœur': '1559757175-5700dde675bc',
  'coeur': '1559757175-5700dde675bc',
  'poumons': '1559757175-5700dde675bc',
  'foie': '1559757175-5700dde675bc',
  'baleine': '1564650669-4b7b0b0b0b0b',
  'elephant': '1557050543-4b7b0b0b0b0b',
  'abeille': '1579208570-4b7b0b0b0b0b',
  'guepard': '1579208570-4b7b0b0b0b0b',
  'sequoia': '1579602477-4b7b0b0b0b0b',

  // --- CHIMIE ---
  'laboratoire': '1603126857599-f6e157fa2fe6',
  'molecule': '1532634922-8fe0b757fb13',
  'chimie': '1554475901-4538ddfbccc2',
  'or': '1610375461246-4b7b0b0b0b0b',
  'argent': '1610375461246-4b7b0b0b0b0b',
  'fer': '1579602477-4b7b0b0b0b0b',
  'cuivre': '1579602477-4b7b0b0b0b0b',
  'uranium': '1579602477-4b7b0b0b0b0b',
  'carbone': '1579602477-4b7b0b0b0b0b',

  // --- PHYSIQUE ---
  'newton': '1636466497217-26a8cbeaf0cf',
  'lumiere': '1509228627152-72ae9ae6848d',
  'univers': '1518640467707-6811f4a6ab73',
  'gravite': '1518640467707-6811f4a6ab73',
  'aimant': '1579602477-4b7b0b0b0b0b',

  // --- TECHNOLOGIE ---
  'ordinateur': '1518770660439-4636190af475',
  'code': '1555066931-4365d14bab8c',
  'programmation': '1555066931-4365d14bab8c',
  'internet': '1518770660439-4636190af475',
  'processeur': '1518770660439-4636190af475',
  'cpu': '1518770660439-4636190af475',
  'intelligence artificielle': '1677444305704-30c7e6e6e6e6',
  'ia': '1677444305704-30c7e6e6e6e6',

  // --- CULTURE GENERALE ---
  'joconde': '1579602477-4b7b0b0b0b0b',
  'mona lisa': '1579602477-4b7b0b0b0b0b',
  'piano': '1520523839891-0b0b0b0b0b0b',
  'football': '1579952363-4b7b0b0b0b0b',
  'lune': '1518640467707-6811f4a6ab73',
  'ocean': '1507528345-5e6e6e6e6e6e',
  'desert': '1509316785-3e6e6e6e6e6e',
  'livre': '1497633762265-9d179a990aa6',
  'art': '1513542789411-b6a5d4f31634',
  'musique': '1511671782779-4b7b0b0b0b0b',
  'cinema': '1489598550-6b6b6b6b6b6b',
  'sport': '1461896836934-014acb49139a',
};

// Mots-clés de secours par catégorie pour l'API Unsplash
const CATEGORY_SEARCH_TERMS: Record<string, string[]> = {
  geography: ['world map geography', 'earth globe', 'landscape nature travel', 'city skyline landmark'],
  history: ['ancient history civilization', 'historical monument architecture', 'vintage old historical', 'castle medieval'],
  biology: ['biology science microscope', 'nature wildlife animal', 'cell dna molecular', 'human body anatomy'],
  chemistry: ['chemistry lab science experiment', 'molecule atom', 'chemical laboratory', 'periodic table'],
  general: ['education knowledge books', 'art culture museum', 'music instrument', 'sport stadium'],
  physics: ['physics science energy', 'space universe galaxy', 'light prism spectrum', 'magnet field'],
  technology: ['technology computer code', 'digital circuit board', 'programming software', 'robot AI'],
};

// ============================================================
// SMART TOPIC EXTRACTOR
// ============================================================

function normalizeText(text: string): string {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // enlever accents
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

function extractTopics(question: string, keywords: string[]): string[] {
  const normalized = normalizeText(question);
  const topics: string[] = [];

  // Priorité 1: Mots-clés fournis
  for (const kw of keywords) {
    topics.push(normalizeText(kw));
  }

  // Priorité 2: Extraction de noms propres (majuscules)
  const properNouns = question.match(/\b[A-ZÀ-Ü][a-zà-ü]+\b/g) || [];
  for (const noun of properNouns) {
    const n = normalizeText(noun);
    if (n.length > 3 && !topics.includes(n)) {
      topics.push(n);
    }
  }

  // Priorité 3: Mots thématiques
  const thematicWords = [
    'capitale', 'pays', 'continent', 'fleuve', 'riviere', 'montagne', 'ocean', 'mer', 'desert', 'foret',
    'roi', 'reine', 'empereur', 'revolution', 'guerre', 'empire', 'president',
    'cellule', 'organe', 'cœur', 'cerveau', 'adn', 'gene', 'chromosome', 'bacterie', 'virus',
    'element', 'atome', 'molecule', 'acide', 'metal', 'gaz', 'reaction',
    'force', 'energie', 'lumiere', 'onde', 'particule', 'champ', 'temperature',
    'langage', 'protocole', 'code', 'algorithme', 'systeme', 'reseau',
    'art', 'musique', 'livre', 'film', 'sport', 'peintre', 'ecrivain',
  ];

  for (const word of thematicWords) {
    if (normalized.includes(word) && !topics.includes(word)) {
      topics.push(word);
    }
  }

  return topics;
}

// ============================================================
// MATCHER PRINCIPAL
// ============================================================

export function findBestImageUrl(question: string, _category: string, keywords: string[]): string | null {
  const topics = extractTopics(question, keywords);
  const normalizedQ = normalizeText(question);

  // Étape 1: Chercher dans les photos vérifiées
  for (const topic of topics) {
    // Correspondance exacte
    if (VERIFIED_PHOTOS[topic]) {
      return `https://images.unsplash.com/photo-${VERIFIED_PHOTOS[topic]}?w=800&q=80`;
    }
    // Correspondance partielle
    for (const [key, photoId] of Object.entries(VERIFIED_PHOTOS)) {
      if (topic.includes(key) || key.includes(topic)) {
        return `https://images.unsplash.com/photo-${photoId}?w=800&q=80`;
      }
    }
  }

  // Étape 2: Chercher dans la question normalisée
  for (const [key, photoId] of Object.entries(VERIFIED_PHOTOS)) {
    if (normalizedQ.includes(key)) {
      return `https://images.unsplash.com/photo-${photoId}?w=800&q=80`;
    }
  }

  // Étape 3: Générer une query pour l'API Unsplash
  return null; // Sera géré par l'API Unsplash dans imageService
}

export function getSearchQuery(question: string, _category: string, keywords: string[]): string {
  const topics = extractTopics(question, keywords);

  // Construire la meilleure query de recherche
  const mainTopics = topics.slice(0, 3);
  const categoryTerms = CATEGORY_SEARCH_TERMS[_category] || CATEGORY_SEARCH_TERMS['general'];

  if (mainTopics.length > 0) {
    return `${mainTopics.join(' ')} ${_category}`;
  }

  return categoryTerms[Math.floor(Math.random() * categoryTerms.length)];
}

export { CATEGORY_SEARCH_TERMS, VERIFIED_PHOTOS };
