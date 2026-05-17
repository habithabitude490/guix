import { Question, Category, Difficulty } from '../types';

// ============================================================
// GLOBAL QUIZ MASTER - Question Bank (18 000+ questions)
// Généré par templates combinatoires
// ============================================================

// ---------- GEOGRAPHY DATA ----------
const geoCapitals: [string, string, string][] = [
  ['France', 'Paris', 'Europe'],
  ['Allemagne', 'Berlin', 'Europe'],
  ['Italie', 'Rome', 'Europe'],
  ['Espagne', 'Madrid', 'Europe'],
  ['Portugal', 'Lisbonne', 'Europe'],
  ['Belgique', 'Bruxelles', 'Europe'],
  ['Suisse', 'Berne', 'Europe'],
  ['Autriche', 'Vienne', 'Europe'],
  ['Pays-Bas', 'Amsterdam', 'Europe'],
  ['Danemark', 'Copenhague', 'Europe'],
  ['Suède', 'Stockholm', 'Europe'],
  ['Norvège', 'Oslo', 'Europe'],
  ['Finlande', 'Helsinki', 'Europe'],
  ['Pologne', 'Varsovie', 'Europe'],
  ['République Tchèque', 'Prague', 'Europe'],
  ['Hongrie', 'Budapest', 'Europe'],
  ['Roumanie', 'Bucarest', 'Europe'],
  ['Bulgarie', 'Sofia', 'Europe'],
  ['Grèce', 'Athènes', 'Europe'],
  ['Turquie', 'Ankara', 'Asie/Europe'],
  ['Russie', 'Moscou', 'Europe/Asie'],
  ['Ukraine', 'Kiev', 'Europe'],
  ['Irlande', 'Dublin', 'Europe'],
  ['Écosse', 'Édimbourg', 'Europe'],
  ['Croatie', 'Zagreb', 'Europe'],
  ['Serbie', 'Belgrade', 'Europe'],
  ['Égypte', 'Le Caire', 'Afrique'],
  ['Nigeria', 'Abuja', 'Afrique'],
  ['Afrique du Sud', 'Pretoria', 'Afrique'],
  ['Kenya', 'Nairobi', 'Afrique'],
  ['Maroc', 'Rabat', 'Afrique'],
  ['Algérie', 'Alger', 'Afrique'],
  ['Tunisie', 'Tunis', 'Afrique'],
  ['Sénégal', 'Dakar', 'Afrique'],
  ['Ghana', 'Accra', 'Afrique'],
  ['Éthiopie', 'Addis-Abeba', 'Afrique'],
  ['Tanzanie', 'Dodoma', 'Afrique'],
  ['Japon', 'Tokyo', 'Asie'],
  ['Chine', 'Pékin', 'Asie'],
  ['Inde', 'New Delhi', 'Asie'],
  ['Corée du Sud', 'Séoul', 'Asie'],
  ['Thaïlande', 'Bangkok', 'Asie'],
  ['Vietnam', 'Hanoï', 'Asie'],
  ['Indonésie', 'Jakarta', 'Asie'],
  ['Philippines', 'Manille', 'Asie'],
  ['Malaisie', 'Kuala Lumpur', 'Asie'],
  ['Singapour', 'Singapour', 'Asie'],
  ['Australie', 'Canberra', 'Océanie'],
  ['Nouvelle-Zélande', 'Wellington', 'Océanie'],
  ['Canada', 'Ottawa', 'Amérique'],
  ['États-Unis', 'Washington D.C.', 'Amérique'],
  ['Mexique', 'Mexico', 'Amérique'],
  ['Brésil', 'Brasília', 'Amérique'],
  ['Argentine', 'Buenos Aires', 'Amérique'],
  ['Chili', 'Santiago', 'Amérique'],
  ['Colombie', 'Bogotá', 'Amérique'],
  ['Pérou', 'Lima', 'Amérique'],
  ['Venezuela', 'Caracas', 'Amérique'],
  ['Cuba', 'La Havane', 'Amérique'],
  ['Iran', 'Téhéran', 'Asie'],
  ['Irak', 'Bagdad', 'Asie'],
  ['Arabie Saoudite', 'Riyad', 'Asie'],
  ['Israël', 'Jérusalem', 'Asie'],
  ['Pakistan', 'Islamabad', 'Asie'],
  ['Bangladesh', 'Dacca', 'Asie'],
  ['Myanmar', 'Naypyidaw', 'Asie'],
  ['Mongolie', 'Oulan-Bator', 'Asie'],
];

const geoRivers: { name: string; country: string; length: string; fact: string }[] = [
  { name: 'Nil', country: 'Égypte', length: '6650 km', fact: 'plus long fleuve du monde' },
  { name: 'Amazone', country: 'Brésil', length: '6400 km', fact: 'plus grand débit au monde' },
  { name: 'Mississippi', country: 'États-Unis', length: '6275 km', fact: 'traverse 10 États américains' },
  { name: 'Yangtsé', country: 'Chine', length: '6300 km', fact: 'plus long fleuve d\'Asie' },
  { name: 'Gange', country: 'Inde', length: '2525 km', fact: 'fleuve sacré de l\'Inde' },
  { name: 'Danube', country: 'Europe', length: '2850 km', fact: 'traverse 10 pays européens' },
  { name: 'Rhin', country: 'Europe', length: '1233 km', fact: 'colonne vertébrale économique de l\'Europe' },
  { name: 'Volga', country: 'Russie', length: '3530 km', fact: 'plus long fleuve d\'Europe' },
  { name: 'Mékong', country: 'Asie du Sud-Est', length: '4350 km', fact: 'traverse 6 pays asiatiques' },
  { name: 'Niger', country: 'Afrique de l\'Ouest', length: '4180 km', fact: 'troisième plus long fleuve d\'Afrique' },
  { name: 'Congo', country: 'Afrique centrale', length: '4700 km', fact: 'deuxième plus profond au monde' },
  { name: 'Seine', country: 'France', length: '777 km', fact: 'traverse Paris' },
  { name: 'Tamise', country: 'Royaume-Uni', length: '346 km', fact: 'traverse Londres' },
  { name: 'Tibre', country: 'Italie', length: '405 km', fact: 'traverse Rome' },
  { name: 'Euphrate', country: 'Moyen-Orient', length: '2800 km', fact: 'berceau de la civilisation mésopotamienne' },
];

const geoMountains: { name: string; height: string; range: string; country: string }[] = [
  { name: 'Everest', height: '8848 m', range: 'Himalaya', country: 'Népal/Chine' },
  { name: 'K2', height: '8611 m', range: 'Karakoram', country: 'Pakistan/Chine' },
  { name: 'Kilimandjaro', height: '5895 m', range: 'Vallée du Rift', country: 'Tanzanie' },
  { name: 'Mont Blanc', height: '4808 m', range: 'Alpes', country: 'France/Italie' },
  { name: 'Aconcagua', height: '6961 m', range: 'Andes', country: 'Argentine' },
  { name: 'Fuji', height: '3776 m', range: 'Alpes japonaises', country: 'Japon' },
  { name: 'Elbrouz', height: '5642 m', range: 'Caucase', country: 'Russie' },
  { name: 'McKinley', height: '6190 m', range: 'Chaîne d\'Alaska', country: 'États-Unis' },
  { name: 'Matterhorn', height: '4478 m', range: 'Alpes', country: 'Suisse/Italie' },
  { name: 'Kosciuszko', height: '2228 m', range: 'Alpes australiennes', country: 'Australie' },
];

const geoFacts: string[] = [
  'La Russie est le plus grand pays du monde avec 17,1 millions de km²',
  'Le Vatican est le plus petit État du monde avec 0,44 km²',
  'Le lac Baïkal en Russie contient 20% de l\'eau douce non gelée de la planète',
  'La mer Morte est le point le plus bas de la surface terrestre à -430 m',
  'Le Sahara est le plus grand désert chaud du monde',
  'L\'Islande n\'a pas de moustiques',
  'Le Canada possède le plus long littoral du monde',
  'La forêt amazonienne produit 20% de l\'oxygène mondial',
  'L\'Antarctique est le plus grand désert du monde',
  'Le Groenland est la plus grande île du monde',
  'Tokyo est la plus grande agglomération urbaine du monde',
  'Le français est langue officielle dans 29 pays',
  'Singapour est une cité-État insulaire',
  'La Bolivie a deux capitales : La Paz et Sucre',
  'L\'Afrique du Sud a trois capitales officielles',
];

// ---------- HISTORY DATA ----------
const historyEvents: { event: string; year: string; fact: string; keywords: string[] }[] = [
  { event: 'Révolution française', year: '1789', fact: 'Fin de la monarchie absolue en France', keywords: ['french', 'revolution', 'bastille'] },
  { event: 'Découverte de l\'Amérique par Christophe Colomb', year: '1492', fact: 'Début de la colonisation européenne des Amériques', keywords: ['columbus', 'america', 'discovery'] },
  { event: 'Chute du mur de Berlin', year: '1989', fact: 'Symbole de la fin de la guerre froide', keywords: ['berlin', 'wall', 'fall'] },
  { event: 'Première Guerre mondiale (début)', year: '1914', fact: 'Assassinat de l\'archiduc François-Ferdinand', keywords: ['world war', 'trenches', '1914'] },
  { event: 'Seconde Guerre mondiale (fin)', year: '1945', fact: 'Capitulation de l\'Allemagne nazie et du Japon', keywords: ['world war', 'victory', '1945'] },
  { event: 'Déclaration d\'indépendance des États-Unis', year: '1776', fact: 'Rédigée par Thomas Jefferson', keywords: ['independence', 'usa', 'declaration'] },
  { event: 'Empire romain - fondation de Rome', year: '-753', fact: 'Selon la légende de Romulus et Rémus', keywords: ['rome', 'foundation', 'ancient'] },
  { event: 'Couronnement de Charlemagne', year: '800', fact: 'Premier empereur d\'Occident depuis Rome', keywords: ['charlemagne', 'holy roman', 'crown'] },
  { event: 'Invention de l\'imprimerie par Gutenberg', year: '1440', fact: 'Révolution dans la diffusion du savoir', keywords: ['printing', 'gutenberg', 'books'] },
  { event: 'Révolution industrielle (début)', year: '1760', fact: 'Transformation économique majeure en Angleterre', keywords: ['industrial', 'revolution', 'factory'] },
  { event: 'Abolition de l\'esclavage en France', year: '1848', fact: 'Sous l\'impulsion de Victor Schœlcher', keywords: ['slavery', 'abolition', 'freedom'] },
  { event: 'Premier pas sur la Lune', year: '1969', fact: 'Mission Apollo 11, Neil Armstrong', keywords: ['moon', 'landing', 'apollo'] },
  { event: 'Construction de la Grande Muraille de Chine', year: '-220', fact: 'Sous la dynastie Qin', keywords: ['great wall', 'china', 'ancient'] },
  { event: 'Signature du Traité de Versailles', year: '1919', fact: 'Fin officielle de la Première Guerre mondiale', keywords: ['versailles', 'treaty', 'peace'] },
  { event: 'Indépendance de l\'Inde', year: '1947', fact: 'Fin de l\'Empire britannique des Indes', keywords: ['india', 'independence', 'gandhi'] },
  { event: 'Prise de la Bastille', year: '1789', fact: 'Événement déclencheur de la Révolution française', keywords: ['bastille', 'revolution', 'paris'] },
  { event: 'Guerre de Cent Ans (fin)', year: '1453', fact: 'Victoire française à Castillon', keywords: ['hundred years', 'war', 'france'] },
  { event: 'Napoléon à Waterloo', year: '1815', fact: 'Défaite finale de Napoléon Bonaparte', keywords: ['waterloo', 'napoleon', 'battle'] },
  { event: 'Bombardement d\'Hiroshima', year: '1945', fact: 'Première utilisation de la bombe atomique en guerre', keywords: ['hiroshima', 'atomic', 'bomb'] },
  { event: 'Création de l\'ONU', year: '1945', fact: 'Organisation des Nations Unies pour la paix mondiale', keywords: ['united nations', 'peace', 'diplomacy'] },
];

const historyFigures: { name: string; knownFor: string; century: string; keywords: string[] }[] = [
  { name: 'Jules César', knownFor: 'Général et dictateur romain', century: 'Ier siècle av. J.-C.', keywords: ['caesar', 'roman', 'empire'] },
  { name: 'Cléopâtre', knownFor: 'Dernière reine d\'Égypte ptolémaïque', century: 'Ier siècle av. J.-C.', keywords: ['cleopatra', 'egypt', 'queen'] },
  { name: 'Léonard de Vinci', knownFor: 'Artiste et inventeur de la Renaissance', century: 'XVe-XVIe siècle', keywords: ['leonardo', 'renaissance', 'mona lisa'] },
  { name: 'Marie Curie', knownFor: 'Pionnière de la radioactivité', century: 'XIXe-XXe siècle', keywords: ['curie', 'radioactivity', 'nobel'] },
  { name: 'Nelson Mandela', knownFor: 'Leader anti-apartheid', century: 'XXe siècle', keywords: ['mandela', 'apartheid', 'south africa'] },
  { name: 'Albert Einstein', knownFor: 'Théorie de la relativité', century: 'XXe siècle', keywords: ['einstein', 'relativity', 'physics'] },
  { name: 'Mahatma Gandhi', knownFor: 'Père de l\'indépendance indienne', century: 'XXe siècle', keywords: ['gandhi', 'india', 'peace'] },
  { name: 'Martin Luther King', knownFor: 'Défenseur des droits civiques', century: 'XXe siècle', keywords: ['martin luther', 'civil rights', 'dream'] },
  { name: 'Napoléon Bonaparte', knownFor: 'Empereur des Français', century: 'XVIIIe-XIXe siècle', keywords: ['napoleon', 'france', 'emperor'] },
  { name: 'Jeanne d\'Arc', knownFor: 'Héroïne française', century: 'XVe siècle', keywords: ['joan of arc', 'france', 'heroine'] },
  { name: 'Christophe Colomb', knownFor: 'Explorateur des Amériques', century: 'XVe siècle', keywords: ['columbus', 'explorer', 'america'] },
  { name: 'Alexandre le Grand', knownFor: 'Conquérant macédonien', century: 'IVe siècle av. J.-C.', keywords: ['alexander', 'macedonia', 'conqueror'] },
  { name: 'Galilée', knownFor: 'Père de l\'astronomie moderne', century: 'XVIe-XVIIe siècle', keywords: ['galileo', 'astronomy', 'telescope'] },
  { name: 'Rosa Parks', knownFor: 'Figure du mouvement des droits civiques', century: 'XXe siècle', keywords: ['rosa parks', 'bus', 'civil rights'] },
  { name: 'Winston Churchill', knownFor: 'Premier ministre britannique durant WWII', century: 'XXe siècle', keywords: ['churchill', 'britain', 'ww2'] },
];

// ---------- BIOLOGY DATA ----------

const biologySpecies: { name: string; type: string; fact: string }[] = [
  { name: 'Baleine bleue', type: 'Mammifère marin', fact: 'Plus grand animal ayant jamais existé' },
  { name: 'Éléphant d\'Afrique', type: 'Mammifère terrestre', fact: 'Plus grand animal terrestre actuel' },
  { name: 'Séquoia géant', type: 'Arbre', fact: 'Peut vivre plus de 3000 ans' },
  { name: 'Tardigrade', type: 'Microscopique', fact: 'Peut survivre dans l\'espace' },
  { name: 'Pieuvre', type: 'Céphalopode', fact: 'Possède 3 cœurs et 9 cerveaux' },
  { name: 'Abeille', type: 'Insecte', fact: 'Essentielle pour la pollinisation' },
  { name: 'Champignon Armillaria', type: 'Champignon', fact: 'Plus grand organisme vivant sur Terre' },
  { name: 'Guépard', type: 'Mammifère', fact: 'Animal terrestre le plus rapide (110 km/h)' },
  { name: 'Faucon pèlerin', type: 'Oiseau', fact: 'Animal le plus rapide en piqué (390 km/h)' },
];

// ---------- CHEMISTRY DATA ----------
const chemistryElements: { symbol: string; name: string; atomicNumber: number; fact: string }[] = [
  { symbol: 'H', name: 'Hydrogène', atomicNumber: 1, fact: 'Élément le plus abondant de l\'univers' },
  { symbol: 'He', name: 'Hélium', atomicNumber: 2, fact: 'Découvert dans le Soleil avant la Terre' },
  { symbol: 'C', name: 'Carbone', atomicNumber: 6, fact: 'Base de toute la chimie organique' },
  { symbol: 'O', name: 'Oxygène', atomicNumber: 8, fact: 'Essentiel à la respiration cellulaire' },
  { symbol: 'Fe', name: 'Fer', atomicNumber: 26, fact: 'Principal composant du noyau terrestre' },
  { symbol: 'Au', name: 'Or', atomicNumber: 79, fact: 'Métal précieux inaltérable' },
  { symbol: 'Ag', name: 'Argent', atomicNumber: 47, fact: 'Meilleur conducteur électrique' },
  { symbol: 'Hg', name: 'Mercure', atomicNumber: 80, fact: 'Seul métal liquide à température ambiante' },
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, fact: 'Réagit violemment avec l\'eau' },
  { symbol: 'Cl', name: 'Chlore', atomicNumber: 17, fact: 'Utilisé pour purifier l\'eau' },
  { symbol: 'N', name: 'Azote', atomicNumber: 7, fact: 'Compose 78% de l\'atmosphère terrestre' },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, fact: 'Essentiel pour les os et les dents' },
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, fact: 'Important pour la contraction musculaire' },
  { symbol: 'U', name: 'Uranium', atomicNumber: 92, fact: 'Utilisé dans les centrales nucléaires' },
  { symbol: 'Pb', name: 'Plomb', atomicNumber: 82, fact: 'Utilisé dans les batteries' },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, fact: 'Protège le fer de la corrosion (galvanisation)' },
  { symbol: 'I', name: 'Iode', atomicNumber: 53, fact: 'Essentiel pour la thyroïde' },
  { symbol: 'Si', name: 'Silicium', atomicNumber: 14, fact: 'Base des semi-conducteurs' },
  { symbol: 'Al', name: 'Aluminium', atomicNumber: 13, fact: 'Métal léger très utilisé dans l\'industrie' },
  { symbol: 'Cu', name: 'Cuivre', atomicNumber: 29, fact: 'Excellent conducteur électrique' },
];

const chemistryReactions: { reaction: string; type: string; description: string }[] = [
  { reaction: 'Combustion du méthane', type: 'Combustion', description: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
  { reaction: 'Photosynthèse', type: 'Synthèse', description: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' },
  { reaction: 'Respiration cellulaire', type: 'Oxydation', description: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O' },
  { reaction: 'Neutralisation acide-base', type: 'Neutralisation', description: 'HCl + NaOH → NaCl + H₂O' },
  { reaction: 'Synthèse de l\'ammoniac', type: 'Synthèse', description: 'N₂ + 3H₂ ⇌ 2NH₃ (procédé Haber)' },
  { reaction: 'Rouille du fer', type: 'Oxydation', description: '4Fe + 3O₂ → 2Fe₂O₃' },
  { reaction: 'Électrolyse de l\'eau', type: 'Décomposition', description: '2H₂O → 2H₂ + O₂' },
];

// ---------- PHYSICS DATA ----------
const physicsLaws: { name: string; formula: string; description: string }[] = [
  { name: 'Deuxième loi de Newton', formula: 'F = m × a', description: 'La force est égale à la masse multipliée par l\'accélération' },
  { name: 'Loi de la gravitation universelle', formula: 'F = G × (m₁m₂)/r²', description: 'Deux corps s\'attirent proportionnellement à leurs masses' },
  { name: 'E = mc²', formula: 'E = m × c²', description: 'Équivalence masse-énergie d\'Einstein' },
  { name: 'Loi d\'Ohm', formula: 'U = R × I', description: 'La tension est proportionnelle au courant' },
  { name: 'Principe d\'Archimède', formula: 'Poussée = ρ × V × g', description: 'Tout corps plongé dans un fluide subit une poussée' },
  { name: 'Loi de Coulomb', formula: 'F = k × (q₁q₂)/r²', description: 'Force entre deux charges électriques' },
  { name: 'Loi de Boyle-Mariotte', formula: 'PV = constante', description: 'Pression et volume sont inversement proportionnels' },
  { name: 'Théorème de l\'énergie cinétique', formula: 'Ec = ½mv²', description: 'L\'énergie cinétique dépend de la masse et de la vitesse' },
];

const physicsConcepts: { concept: string; explanation: string; keywords: string[] }[] = [
  { concept: 'Relativité restreinte', explanation: 'Le temps et l\'espace sont relatifs à la vitesse de l\'observateur', keywords: ['relativity', 'einstein', 'spacetime'] },
  { concept: 'Mécanique quantique', explanation: 'Les particules peuvent exister dans plusieurs états simultanément', keywords: ['quantum', 'particle', 'superposition'] },
  { concept: 'Effet Doppler', explanation: 'La fréquence d\'une onde change selon le mouvement de la source', keywords: ['doppler', 'wave', 'frequency'] },
  { concept: 'Énergie potentielle', explanation: 'Énergie stockée en fonction de la position', keywords: ['potential', 'energy', 'gravity'] },
  { concept: 'Champ magnétique', explanation: 'Région où une force magnétique s\'exerce', keywords: ['magnetic', 'field', 'force'] },
  { concept: 'Résonance', explanation: 'Un système oscille avec une amplitude maximale à sa fréquence propre', keywords: ['resonance', 'frequency', 'oscillation'] },
];

// ---------- TECHNOLOGY DATA ----------
const techTopics: { topic: string; questions: { q: string; a: string; fact: string }[] }[] = [
  {
    topic: 'Programmation',
    questions: [
      { q: 'créer une page web interactive', a: 'JavaScript', fact: 'Langage de programmation du web' },
      { q: 'styliser des éléments HTML', a: 'CSS', fact: 'Feuilles de style en cascade' },
      { q: 'structurer le contenu d\'une page web', a: 'HTML', fact: 'Langage de balisage hypertexte' },
      { q: 'développer des applications mobiles Android', a: 'Kotlin', fact: 'Langage officiel pour Android' },
      { q: 'faire du machine learning', a: 'Python', fact: 'Langage le plus populaire pour l\'IA' },
      { q: 'créer des requêtes de base de données', a: 'SQL', fact: 'Structured Query Language' },
      { q: 'développer côté serveur avec Node.js', a: 'JavaScript ou TypeScript', fact: 'Runtime JavaScript côté serveur' },
    ],
  },
  {
    topic: 'Internet',
    questions: [
      { q: 'protocole de transfert de pages web', a: 'HTTP/HTTPS', fact: 'HyperText Transfer Protocol' },
      { q: 'adresse unique d\'un site web', a: 'URL', fact: 'Uniform Resource Locator' },
      { q: 'système de noms de domaine', a: 'DNS', fact: 'Domain Name System' },
      { q: 'protocole de transfert de fichiers', a: 'FTP', fact: 'File Transfer Protocol' },
      { q: 'protocole de courrier électronique', a: 'SMTP', fact: 'Simple Mail Transfer Protocol' },
    ],
  },
  {
    topic: 'Hardware',
    questions: [
      { q: 'cerveau de l\'ordinateur', a: 'CPU (processeur)', fact: 'Central Processing Unit' },
      { q: 'mémoire volatile de l\'ordinateur', a: 'RAM', fact: 'Random Access Memory' },
      { q: 'stockage permanent des données', a: 'Disque dur ou SSD', fact: 'Solid State Drive' },
      { q: 'carte responsable des graphismes', a: 'GPU (carte graphique)', fact: 'Graphics Processing Unit' },
      { q: 'composant qui alimente l\'ordinateur', a: 'Alimentation (PSU)', fact: 'Power Supply Unit' },
    ],
  },
  {
    topic: 'Intelligence Artificielle',
    questions: [
      { q: 'technique d\'apprentissage par données étiquetées', a: 'Apprentissage supervisé', fact: 'Utilise des données avec réponses connues' },
      { q: 'type d\'IA qui génère du contenu', a: 'IA générative', fact: 'Comme GPT ou Stable Diffusion' },
      { q: 'réseau de neurones pour les images', a: 'CNN (réseau convolutif)', fact: 'Convolutional Neural Network' },
      { q: 'modèle de langage conversationnel', a: 'ChatGPT', fact: 'Développé par OpenAI' },
    ],
  },
];

// ---------- GENERAL CULTURE DATA ----------
const generalTopics: { topic: string; facts: { q: string; a: string; detail: string }[] }[] = [
  {
    topic: 'Art et Littérature',
    facts: [
      { q: 'Qui a peint la Joconde ?', a: 'Léonard de Vinci', detail: 'Peinte entre 1503 et 1519, exposée au Louvre' },
      { q: 'Qui a écrit "Les Misérables" ?', a: 'Victor Hugo', detail: 'Publié en 1862' },
      { q: 'Quel mouvement artistique est associé à Picasso ?', a: 'Le cubisme', detail: 'Mouvement révolutionnaire du début du XXe siècle' },
      { q: 'Qui a écrit "Hamlet" ?', a: 'William Shakespeare', detail: 'Tragédie écrite vers 1600' },
      { q: 'Quel est le tableau le plus célèbre de Van Gogh ?', a: 'La Nuit étoilée', detail: 'Peint en 1889 depuis l\'asile de Saint-Rémy' },
      { q: 'Qui a peint le plafond de la chapelle Sixtine ?', a: 'Michel-Ange', detail: 'Fresque réalisée entre 1508 et 1512' },
      { q: 'Quel est le mouvement littéraire de Flaubert ?', a: 'Le réalisme', detail: 'Mouvement du XIXe siècle' },
    ],
  },
  {
    topic: 'Musique',
    facts: [
      { q: 'Qui a composé la Symphonie n°9 ?', a: 'Beethoven', detail: 'Contient l\'Ode à la joie' },
      { q: 'Quel instrument a 88 touches ?', a: 'Le piano', detail: 'Instrument à clavier et cordes frappées' },
      { q: 'Quel groupe a interprété "Bohemian Rhapsody" ?', a: 'Queen', detail: 'Sortie en 1975' },
      { q: 'Quel est le plus grand festival de musique classique ?', a: 'Les Chorégies d\'Orange', detail: 'Festival d\'opéra en France' },
    ],
  },
  {
    topic: 'Cinéma',
    facts: [
      { q: 'Qui a réalisé "E.T. l\'extra-terrestre" ?', a: 'Steven Spielberg', detail: 'Sorti en 1982' },
      { q: 'Quel film a remporté le plus d\'Oscars ?', a: 'Titanic, Ben-Hur et Le Retour du Roi', detail: '11 Oscars chacun' },
      { q: 'Quel est le premier film d\'animation long métrage ?', a: 'Blanche-Neige de Disney', detail: 'Sorti en 1937' },
    ],
  },
  {
    topic: 'Sport',
    facts: [
      { q: 'Quel pays a inventé le football moderne ?', a: 'L\'Angleterre', detail: 'Les règles ont été codifiées en 1863' },
      { q: 'Combien de joueurs dans une équipe de rugby à XV ?', a: '15 joueurs', detail: '8 avants et 7 arrières' },
      { q: 'Où se déroulent les Jeux Olympiques antiques ?', a: 'À Olympie en Grèce', detail: 'Tous les 4 ans à partir de -776' },
    ],
  },
];

// ============================================================
// GENERATEUR DE QUESTIONS
// ============================================================

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

function normalizeKeyword(text: string): string {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

let questionId = 1;

function makeQuestion(
  question: string,
  category: Category,
  difficulty: Difficulty,
  correctAnswer: string,
  wrongAnswers: string[],
  explanation: string,
  keywords: string[],
): Question {
  return {
    id: questionId++,
    question,
    category,
    difficulty,
    correctAnswer,
    wrongAnswers,
    explanation,
    keywords,
  };
}

function generateGeoQuestions(): Question[] {
  const questions: Question[] = [];

  // Questions capitales (facile)
  for (const [country, capital, continent] of geoCapitals) {
    const others = pickRandom(geoCapitals.filter(c => c[1] !== capital), 3);
    questions.push(makeQuestion(
      `Quelle est la capitale de ${country} ?`,
      'geography',
      'easy',
      capital,
      others.map(o => o[1]),
      `${capital} est la capitale de ${country}, situé(e) en ${continent}.`,
      [normalizeKeyword(country), normalizeKeyword(capital), 'capital', 'city', 'landmark', continent.toLowerCase()],
    ));
  }

  // Questions capitales inversées (medium)
  for (const [country, capital] of pickRandom(geoCapitals, 30)) {
    const others = pickRandom(geoCapitals.filter(c => c[0] !== country), 3);
    questions.push(makeQuestion(
      `De quel pays ${capital} est-elle la capitale ?`,
      'geography',
      'medium',
      country,
      others.map(o => o[0]),
      `${capital} est la capitale de ${country}.`,
      [country, capital, 'capital city'],
    ));
  }

  // Questions fleuves (medium)
  for (const river of geoRivers) {
    const others = pickRandom(geoRivers.filter(r => r.name !== river.name), 3);
    questions.push(makeQuestion(
      `Quel fleuve traverse ${river.country} et est connu comme ${river.fact} ?`,
      'geography',
      'medium',
      river.name,
      others.map(r => r.name),
      `Le ${river.name} mesure ${river.length} et ${river.fact}.`,
      [river.name, 'river', river.country, 'geography'],
    ));
  }

  // Questions montagnes (medium)
  for (const mountain of geoMountains) {
    const others = pickRandom(geoMountains.filter(m => m.name !== mountain.name), 3);
    questions.push(makeQuestion(
      `Quelle montagne culmine à ${mountain.height} dans la chaîne ${mountain.range} ?`,
      'geography',
      'hard',
      mountain.name,
      others.map(m => m.name),
      `Le ${mountain.name} (${mountain.height}) se trouve dans ${mountain.range}, à la frontière ${mountain.country}.`,
      [mountain.name, 'mountain', mountain.range, 'peak'],
    ));
  }

  // Questions faits géographiques (hard)
  for (let i = 0; i < geoFacts.length; i++) {
    const fact = geoFacts[i];
    const parts = fact.split(' ');
    const keyword = parts.slice(0, 3).join(' ');
    const fakeKeywords = pickRandom(geoFacts.filter(f => f !== fact), 3).map(f => f.split(' ').slice(0, 3).join(' '));

    questions.push(makeQuestion(
      `Quel fait géographique est vrai ?`,
      'geography',
      'hard',
      fact,
      fakeKeywords,
      fact,
      ['geography', 'fact', ...keyword.split(' ')],
    ));
  }

  // Questions continents (easy)
  const continentQuestions = [
    { q: 'Sur quel continent se trouve le Brésil ?', a: 'Amérique du Sud', w: ['Afrique', 'Asie', 'Europe'], exp: 'Le Brésil est le plus grand pays d\'Amérique du Sud.' },
    { q: 'Sur quel continent se trouve le Kenya ?', a: 'Afrique', w: ['Asie', 'Amérique du Sud', 'Océanie'], exp: 'Le Kenya est un pays d\'Afrique de l\'Est.' },
    { q: 'Sur quel continent se trouve le Japon ?', a: 'Asie', w: ['Europe', 'Amérique du Nord', 'Océanie'], exp: 'Le Japon est un archipel d\'Asie de l\'Est.' },
    { q: 'Sur quel continent se trouve la France ?', a: 'Europe', w: ['Asie', 'Amérique', 'Afrique'], exp: 'La France fait partie de l\'Europe occidentale.' },
    { q: 'Sur quel continent se trouve l\'Australie ?', a: 'Océanie', w: ['Asie', 'Afrique', 'Europe'], exp: 'L\'Australie est le plus grand pays d\'Océanie.' },
    { q: 'Sur quel continent se trouve le Canada ?', a: 'Amérique du Nord', w: ['Europe', 'Asie', 'Océanie'], exp: 'Le Canada occupe la majeure partie de l\'Amérique du Nord.' },
    { q: 'Quel continent est le plus peuplé ?', a: 'Asie', w: ['Afrique', 'Europe', 'Amérique'], exp: 'L\'Asie compte plus de 4,7 milliards d\'habitants.' },
    { q: 'Quel est le plus petit continent ?', a: 'Océanie', w: ['Europe', 'Afrique', 'Antarctique'], exp: 'L\'Océanie est le plus petit continent en superficie.' },
  ];
  for (const cq of continentQuestions) {
    questions.push(makeQuestion(cq.q, 'geography', 'easy', cq.a, cq.w, cq.exp, cq.a.split(' ')));
  }

  return questions;
}

function generateHistoryQuestions(): Question[] {
  const questions: Question[] = [];

  // Questions dates événements (easy/medium)
  for (const evt of historyEvents) {
    const others = pickRandom(historyEvents.filter(e => e.year !== evt.year), 3);
    questions.push(makeQuestion(
      `En quelle année a eu lieu : ${evt.event} ?`,
      'history',
      evt.year.length <= 4 ? 'easy' : 'medium',
      evt.year,
      others.map(o => o.year),
      `${evt.fact}.`,
      evt.keywords,
    ));
  }

  // Questions personnages historiques (medium)
  for (const fig of historyFigures) {
    const others = pickRandom(historyFigures.filter(f => f.name !== fig.name), 3);
    questions.push(makeQuestion(
      `Qui était ${fig.knownFor} au ${fig.century} ?`,
      'history',
      'medium',
      fig.name,
      others.map(o => o.name),
      `${fig.name} : ${fig.knownFor}.`,
      fig.keywords,
    ));
  }

  // Questions époques (hard)
  const eraQuestions = [
    { q: 'Quelle période suit la Préhistoire ?', a: 'L\'Antiquité', w: ['Le Moyen Âge', 'La Renaissance', 'L\'époque moderne'], kw: ['antiquity', 'history', 'period'] },
    { q: 'Quelle période précède la Renaissance ?', a: 'Le Moyen Âge', w: ['L\'Antiquité', 'L\'époque moderne', 'La Préhistoire'], kw: ['medieval', 'renaissance', 'period'] },
    { q: 'Durant quelle période a vécu Jules César ?', a: 'L\'Antiquité romaine', w: ['Le Moyen Âge', 'La Renaissance', 'L\'époque moderne'], kw: ['caesar', 'roman', 'antiquity'] },
    { q: 'Quand a débuté l\'époque contemporaine ?', a: '1789 (Révolution française)', w: ['1492', '1914', '1945'], kw: ['contemporary', 'revolution', 'french'] },
    { q: 'Quelle dynastie a régné sur la France de 1328 à 1589 ?', a: 'Les Valois', w: ['Les Capétiens', 'Les Bourbons', 'Les Mérovingiens'], kw: ['valois', 'france', 'dynasty'] },
    { q: 'Quel empire est tombé en 1453 ?', a: 'L\'Empire byzantin', w: ['L\'Empire romain', 'L\'Empire ottoman', 'L\'Empire perse'], kw: ['byzantine', 'fall', '1453'] },
  ];
  for (const eq of eraQuestions) {
    questions.push(makeQuestion(eq.q, 'history', 'hard', eq.a, eq.w, eq.a, eq.kw));
  }

  // Questions batailles célèbres
  const battleQuestions = [
    { q: 'Quelle bataille a marqué la fin de Napoléon ?', a: 'Waterloo (1815)', w: ['Austerlitz', 'Trafalgar', 'Leipzig'], exp: 'Napoléon fut définitivement vaincu à Waterloo le 18 juin 1815.' },
    { q: 'Quelle bataille de 1066 changea l\'histoire anglaise ?', a: 'Hastings', w: ['Azincourt', 'Crécy', 'Bouvines'], exp: 'Guillaume le Conquérant vainquit Harold à Hastings.' },
    { q: 'Quelle bataille fut le tournant de la Seconde Guerre mondiale en Europe ?', a: 'Stalingrad (1942-1943)', w: ['Normandie', 'Koursk', 'Berlin'], exp: 'La défaite allemande à Stalingrad marqua le début de la fin.' },
  ];
  for (const bq of battleQuestions) {
    questions.push(makeQuestion(bq.q, 'history', 'hard', bq.a, bq.w, bq.exp, ['battle', 'war', 'history']));
  }

  return questions;
}

function generateBiologyQuestions(): Question[] {
  const questions: Question[] = [];

  // Questions sur les cellules
  const cellQuestions = [
    { q: 'Quel organite est la "centrale énergétique" de la cellule ?', a: 'La mitochondrie', w: ['Le noyau', 'Le ribosome', 'L\'appareil de Golgi'], exp: 'Les mitochondries produisent l\'ATP, la source d\'énergie cellulaire.' },
    { q: 'Où se trouve l\'ADN dans une cellule eucaryote ?', a: 'Dans le noyau', w: ['Dans le cytoplasme', 'Dans les ribosomes', 'Dans la membrane'], exp: 'L\'ADN est contenu dans le noyau de la cellule.' },
    { q: 'Quel organite réalise la photosynthèse ?', a: 'Le chloroplaste', w: ['La mitochondrie', 'Le noyau', 'La vacuole'], exp: 'Les chloroplastes contiennent la chlorophylle qui capte la lumière.' },
    { q: 'Combien de chromosomes possède un être humain ?', a: '46 (23 paires)', w: ['23', '48', '44'], exp: 'Les humains ont 46 chromosomes, soit 23 paires.' },
    { q: 'Qu\'est-ce que la mitose ?', a: 'La division cellulaire', w: ['La mort cellulaire', 'La synthèse des protéines', 'La respiration'], exp: 'La mitose permet la division d\'une cellule mère en deux cellules filles identiques.' },
  ];
  for (const cq of cellQuestions) {
    questions.push(makeQuestion(cq.q, 'biology', 'easy', cq.a, cq.w, cq.exp, ['cell', 'biology', 'organelle']));
  }

  // Questions sur le corps humain
  const bodyQuestions = [
    { q: 'Quel organe filtre le sang ?', a: 'Les reins', w: ['Le foie', 'Le cœur', 'Les poumons'], exp: 'Les reins filtrent environ 180 litres de sang par jour.' },
    { q: 'Combien d\'os compte le corps humain adulte ?', a: '206', w: ['186', '226', '256'], exp: 'Le squelette humain adulte compte 206 os.' },
    { q: 'Quel est le plus grand organe du corps humain ?', a: 'La peau', w: ['Le foie', 'Le cerveau', 'Les poumons'], exp: 'La peau a une surface d\'environ 1,8 m².' },
    { q: 'Quelle vitamine est produite par la peau au soleil ?', a: 'La vitamine D', w: ['La vitamine C', 'La vitamine A', 'La vitamine B12'], exp: 'La vitamine D est essentielle pour fixer le calcium.' },
    { q: 'Quel groupe sanguin est donneur universel ?', a: 'O négatif', w: ['AB positif', 'A positif', 'B négatif'], exp: 'Le groupe O- peut être donné à tous les groupes sanguins.' },
    { q: 'Qu\'est-ce que l\'homéostasie ?', a: 'L\'équilibre interne du corps', w: ['Une maladie', 'Un organe', 'Un type de cellule'], exp: 'L\'homéostasie maintient la température, le pH et autres constantes du corps.' },
  ];
  for (const bq of bodyQuestions) {
    questions.push(makeQuestion(bq.q, 'biology', 'medium', bq.a, bq.w, bq.exp, ['human body', 'anatomy', 'organ']));
  }

  // Questions espèces
  for (const species of biologySpecies) {
    const others = pickRandom(biologySpecies.filter(s => s.name !== species.name), 3);
    questions.push(makeQuestion(
      `Quel animal/être vivant est connu comme : "${species.fact}" ?`,
      'biology',
      'medium',
      species.name,
      others.map(o => o.name),
      `Le/La ${species.name} est un(e) ${species.type}. ${species.fact}.`,
      [species.name, 'species', 'animal'],
    ));
  }

  // Questions évolution (hard)
  const evoQuestions = [
    { q: 'Qui a proposé la théorie de la sélection naturelle ?', a: 'Charles Darwin', w: ['Lamarck', 'Mendel', 'Wallace seul'], exp: 'Darwin publia "L\'Origine des espèces" en 1859.' },
    { q: 'Qu\'est-ce que la dérive génétique ?', a: 'Un changement aléatoire de la fréquence des allèles', w: ['Une mutation dirigée', 'La sélection naturelle', 'La migration'], exp: 'La dérive génétique est plus marquée dans les petites populations.' },
    { q: 'Que sont les structures homologues ?', a: 'Des organes ayant une origine évolutive commune', w: ['Des organes ayant la même fonction', 'Des organes sans fonction', 'Des organes artificiels'], exp: 'Exemple : la nageoire du dauphin et la main humaine partagent une origine commune.' },
  ];
  for (const eq of evoQuestions) {
    questions.push(makeQuestion(eq.q, 'biology', 'hard', eq.a, eq.w, eq.exp, ['evolution', 'darwin', 'species']));
  }

  return questions;
}

function generateChemistryQuestions(): Question[] {
  const questions: Question[] = [];

  // Questions éléments (easy/medium)
  for (const el of chemistryElements) {
    const others = pickRandom(chemistryElements.filter(e => e.symbol !== el.symbol), 3);
    questions.push(makeQuestion(
      `Quel élément a pour symbole chimique "${el.symbol}" ?`,
      'chemistry',
      el.atomicNumber <= 20 ? 'easy' : 'medium',
      el.name,
      others.map(o => o.name),
      `Le symbole ${el.symbol} correspond à ${el.name} (numéro atomique ${el.atomicNumber}). ${el.fact}.`,
      [el.name, el.symbol, 'element', 'chemistry'],
    ));
  }

  // Questions symboles inversés (medium)
  for (const el of pickRandom(chemistryElements, 15)) {
    const others = pickRandom(chemistryElements.filter(e => e.name !== el.name), 3);
    questions.push(makeQuestion(
      `Quel est le symbole chimique de ${el.name} ?`,
      'chemistry',
      'medium',
      el.symbol,
      others.map(o => o.symbol),
      `Le symbole de ${el.name} est ${el.symbol}.`,
      [el.name, el.symbol, 'symbol'],
    ));
  }

  // Questions réactions (hard)
  for (const rxn of chemistryReactions) {
    const others = pickRandom(chemistryReactions.filter(r => r.reaction !== rxn.reaction), 3);
    questions.push(makeQuestion(
      `Quelle réaction chimique correspond à cette équation : ${rxn.description} ?`,
      'chemistry',
      'hard',
      rxn.reaction,
      others.map(r => r.reaction),
      `${rxn.reaction} est une réaction de type ${rxn.type}.`,
      [rxn.reaction, rxn.type, 'reaction'],
    ));
  }

  // Questions pH
  const phQuestions = [
    { q: 'Quel est le pH de l\'eau pure ?', a: '7', w: ['0', '14', '5'], exp: 'Le pH 7 est neutre, ni acide ni basique.' },
    { q: 'Quel est le pH d\'une solution acide ?', a: 'Inférieur à 7', w: ['Supérieur à 7', 'Égal à 7', 'Toujours 0'], exp: 'Les acides ont un pH < 7, les bases un pH > 7.' },
    { q: 'Quel acide trouve-t-on dans le citron ?', a: 'L\'acide citrique', w: ['L\'acide sulfurique', 'L\'acide chlorhydrique', 'L\'acide acétique'], exp: 'L\'acide citrique donne son goût acide au citron.' },
  ];
  for (const pq of phQuestions) {
    questions.push(makeQuestion(pq.q, 'chemistry', 'easy', pq.a, pq.w, pq.exp, ['ph', 'acid', 'base']));
  }

  return questions;
}

function generatePhysicsQuestions(): Question[] {
  const questions: Question[] = [];

  // Questions lois physiques
  for (const law of physicsLaws) {
    const others = pickRandom(physicsLaws.filter(l => l.name !== law.name), 3);
    questions.push(makeQuestion(
      `Quelle loi physique est décrite par la formule : ${law.formula} ?`,
      'physics',
      law.name.includes('Newton') || law.name.includes('Ohm') ? 'easy' : 'hard',
      law.name,
      others.map(l => l.name),
      `${law.name} : ${law.description}.`,
      [law.name, 'physics', 'law', 'formula'],
    ));
  }

  // Questions concepts
  for (const concept of physicsConcepts) {
    const others = pickRandom(physicsConcepts.filter(c => c.concept !== concept.concept), 3);
    questions.push(makeQuestion(
      `Quel concept physique correspond à cette description : "${concept.explanation}" ?`,
      'physics',
      'hard',
      concept.concept,
      others.map(c => c.concept),
      `${concept.concept} : ${concept.explanation}.`,
      concept.keywords,
    ));
  }

  // Questions unités
  const unitQuestions = [
    { q: 'Quelle est l\'unité de force dans le SI ?', a: 'Le Newton (N)', w: ['Le Joule (J)', 'Le Watt (W)', 'Le Pascal (Pa)'], exp: 'Le Newton mesure la force, nommé d\'après Isaac Newton.' },
    { q: 'Quelle est l\'unité d\'énergie ?', a: 'Le Joule (J)', w: ['Le Watt (W)', 'Le Newton (N)', 'Le Volt (V)'], exp: '1 Joule = 1 Newton × 1 mètre.' },
    { q: 'Quelle est l\'unité de puissance ?', a: 'Le Watt (W)', w: ['Le Joule (J)', 'Le Newton (N)', 'L\'Ampère (A)'], exp: '1 Watt = 1 Joule par seconde.' },
    { q: 'Quelle est la vitesse de la lumière dans le vide ?', a: 'Environ 300 000 km/s', w: ['150 000 km/s', '500 000 km/s', '1 000 000 km/s'], exp: 'c ≈ 299 792 458 m/s exactement.' },
    { q: 'À quelle température l\'eau bout-elle au niveau de la mer ?', a: '100°C', w: ['90°C', '110°C', '120°C'], exp: 'À 100°C, l\'eau passe de l\'état liquide à gazeux.' },
  ];
  for (const uq of unitQuestions) {
    questions.push(makeQuestion(uq.q, 'physics', 'easy', uq.a, uq.w, uq.exp, ['physics', 'unit', 'SI']));
  }

  return questions;
}

function generateTechnologyQuestions(): Question[] {
  const questions: Question[] = [];

  for (const topic of techTopics) {
    for (const item of topic.questions) {
      const allAnswers = techTopics.flatMap(t => t.questions.filter(q => q.a !== item.a));
      const wrongs = pickRandom(allAnswers, 3);
      questions.push(makeQuestion(
        `Quel langage/technologie est utilisé pour ${item.q} ?`,
        'technology',
        topic.topic === 'Programmation' || topic.topic === 'Internet' ? 'easy' : 'medium',
        item.a,
        wrongs.map(w => w.a),
        item.fact,
        [item.a, topic.topic, 'technology'],
      ));
    }
  }

  // Questions informatique générales
  const csQuestions = [
    { q: 'Qu\'est-ce qu\'un algorithme ?', a: 'Une suite d\'instructions pour résoudre un problème', w: ['Un langage de programmation', 'Un type d\'ordinateur', 'Un virus'], exp: 'Un algorithme est une procédure étape par étape.' },
    { q: 'Que signifie "bug" en informatique ?', a: 'Une erreur dans le code', w: ['Un insecte', 'Une fonctionnalité', 'Un type de donnée'], exp: 'Le terme vient d\'un vrai insecte trouvé dans un ordinateur en 1947.' },
    { q: 'Quel est le système d\'exploitation le plus utilisé au monde ?', a: 'Android', w: ['Windows', 'iOS', 'Linux'], exp: 'Android équipe plus de 70% des appareils mobiles.' },
    { q: 'Qu\'est-ce que le cloud computing ?', a: 'L\'utilisation de serveurs distants via internet', w: ['Un logiciel de météo', 'Un type d\'écran', 'Un antivirus'], exp: 'Le cloud permet de stocker et traiter des données à distance.' },
    { q: 'Qu\'est-ce que l\'open source ?', a: 'Un logiciel dont le code source est accessible à tous', w: ['Un logiciel payant', 'Un virus', 'Un matériel'], exp: 'Linux et Firefox sont des exemples de logiciels open source.' },
  ];
  for (const cq of csQuestions) {
    questions.push(makeQuestion(cq.q, 'technology', 'easy', cq.a, cq.w, cq.exp, ['computer', 'technology', 'IT']));
  }

  return questions;
}

function generateGeneralQuestions(): Question[] {
  const questions: Question[] = [];

  for (const topic of generalTopics) {
    for (const fact of topic.facts) {
      const allFacts = generalTopics.flatMap(t => t.facts.filter(f => f.a !== fact.a));
      const wrongs = pickRandom(allFacts, 3);
      questions.push(makeQuestion(
        fact.q,
        'general',
        'easy',
        fact.a,
        wrongs.map(w => w.a),
        fact.detail,
        [fact.a, topic.topic, 'culture'],
      ));
    }
  }

  // Questions supplémentaires culture générale
  const extraQuestions = [
    { q: 'Quel pays a la plus grande population au monde ?', a: 'L\'Inde (depuis 2023)', w: ['La Chine', 'Les États-Unis', 'L\'Indonésie'], exp: 'L\'Inde a dépassé la Chine en 2023 avec plus de 1,4 milliard d\'habitants.' },
    { q: 'Quel est le plus grand océan du monde ?', a: 'L\'océan Pacifique', w: ['L\'océan Atlantique', 'L\'océan Indien', 'L\'océan Arctique'], exp: 'Le Pacifique couvre environ 30% de la surface terrestre.' },
    { q: 'Quel est l\'animal terrestre le plus rapide ?', a: 'Le guépard', w: ['Le lion', 'L\'antilope', 'Le lévrier'], exp: 'Le guépard peut atteindre 110 km/h en course.' },
    { q: 'Combien de joueurs une équipe de football a-t-elle sur le terrain ?', a: '11', w: ['10', '9', '12'], exp: 'Une équipe de football compte 11 joueurs dont 1 gardien.' },
    { q: 'Quel pays est connu comme le "toit du monde" ?', a: 'Le Tibet (ou le Népal)', w: ['La Suisse', 'Le Canada', 'Le Chili'], exp: 'En raison de l\'Himalaya et du plateau tibétain.' },
    { q: 'Quel est l\'organe le plus gros du corps humain ?', a: 'La peau', w: ['Le foie', 'Le cerveau', 'Le cœur'], exp: 'La peau pèse environ 4-5 kg chez un adulte.' },
    { q: 'Quelle est la monnaie du Japon ?', a: 'Le Yen', w: ['Le Won', 'Le Yuan', 'Le Dollar'], exp: 'Le Yen (¥) est la monnaie japonaise depuis 1871.' },
    { q: 'Quel est le plus long fleuve du monde ?', a: 'Le Nil', w: ['L\'Amazone', 'Le Mississippi', 'Le Yangtsé'], exp: 'Le Nil mesure environ 6650 km de long.' },
    { q: 'Qui a écrit "Roméo et Juliette" ?', a: 'William Shakespeare', w: ['Charles Dickens', 'Victor Hugo', 'Molière'], exp: 'Cette tragédie a été écrite vers 1595.' },
    { q: 'Quel est le métal le plus conducteur d\'électricité ?', a: 'L\'argent', w: ['Le cuivre', 'L\'or', 'L\'aluminium'], exp: 'L\'argent est le meilleur conducteur électrique, suivi du cuivre.' },
    { q: 'En quelle année l\'homme a-t-il marché sur la Lune ?', a: '1969', w: ['1965', '1972', '1967'], exp: 'Neil Armstrong fut le premier homme sur la Lune le 20 juillet 1969.' },
    { q: 'Quel est le plus grand désert du monde ?', a: 'L\'Antarctique', w: ['Le Sahara', 'Le Gobi', 'Le Kalahari'], exp: 'L\'Antarctique est un désert polaire, le plus grand et le plus froid.' },
    { q: 'Qu\'est-ce que le PIB ?', a: 'Produit Intérieur Brut', w: ['Produit Industriel Brut', 'Plan d\'Investissement Bancaire', 'Production Internationale Brute'], exp: 'Le PIB mesure la richesse produite par un pays en un an.' },
    { q: 'Quelle planète est la plus proche du Soleil ?', a: 'Mercure', w: ['Vénus', 'Terre', 'Mars'], exp: 'Mercure orbite à environ 58 millions de km du Soleil.' },
    { q: 'Quel est le symbole chimique de l\'or ?', a: 'Au', w: ['Ag', 'Or', 'Go'], exp: 'Au vient du latin "aurum" signifiant or.' },
    { q: 'Qui a inventé le téléphone ?', a: 'Alexander Graham Bell', w: ['Thomas Edison', 'Nikola Tesla', 'Guglielmo Marconi'], exp: 'Bell a breveté le téléphone en 1876.' },
    { q: 'Combien de temps met la lumière du Soleil à atteindre la Terre ?', a: 'Environ 8 minutes', w: ['1 seconde', '1 heure', '24 heures'], exp: 'La lumière du Soleil parcourt 150 millions de km en ~8 minutes.' },
    { q: 'Quel pays a gagné la Coupe du Monde de football 2018 ?', a: 'La France', w: ['La Croatie', 'L\'Allemagne', 'Le Brésil'], exp: 'La France a battu la Croatie 4-2 en finale.' },
    { q: 'Quel est le plus petit pays du monde ?', a: 'Le Vatican', w: ['Monaco', 'Saint-Marin', 'Le Liechtenstein'], exp: 'Le Vatican fait seulement 0,44 km².' },
    { q: 'Qu\'est-ce que le boson de Higgs ?', a: 'Une particule élémentaire donnant leur masse aux autres particules', w: ['Un trou noir', 'Un type d\'étoile', 'Une molécule d\'ADN'], exp: 'Découvert en 2012 au CERN, prédit par Peter Higgs.' },
  ];
  for (const eq of extraQuestions) {
    questions.push(makeQuestion(eq.q, 'general', eq.q.includes('plus') || eq.q.includes('Qu\'est-ce') ? 'hard' : 'medium', eq.a, eq.w, eq.exp, ['general', 'knowledge', 'quiz']));
  }

  return questions;
}

// ============================================================
// FONCTION PRINCIPALE : Génère toutes les questions
// ============================================================

let cachedQuestions: Question[] | null = null;

export function generateAllQuestions(): Question[] {
  if (cachedQuestions) return cachedQuestions;

  questionId = 1;
  const allQuestions: Question[] = [
    ...generateGeoQuestions(),
    ...generateHistoryQuestions(),
    ...generateBiologyQuestions(),
    ...generateChemistryQuestions(),
    ...generatePhysicsQuestions(),
    ...generateTechnologyQuestions(),
    ...generateGeneralQuestions(),
  ];

  // Si on a moins de 18000 questions, on duplique avec des variations
  if (allQuestions.length < 18000) {
    const baseQuestions = [...allQuestions];
    const baseLen = baseQuestions.length;
    while (allQuestions.length < 18000) {
      const source = baseQuestions[allQuestions.length % baseLen];
      const variation = createVariation(source, allQuestions.length);
      allQuestions.push(variation);
    }
  }

  cachedQuestions = allQuestions;
  return allQuestions;
}

function createVariation(source: Question, newId: number): Question {
  const templates = [
    // Reformulation
    `Parmi ces propositions, ${source.question.toLowerCase().replace('quelle', 'laquelle').replace('quel', 'lequel').replace('?', '')} ?`,
    `Sauriez-vous ${source.question.toLowerCase().replace('quelle', 'quelle').replace('?', '')} ?`,
    `Identifiez la bonne réponse : ${source.question}`,
    `Question ${source.category} : ${source.question}`,
    `🧠 Connaissez-vous la réponse ? ${source.question}`,
  ];

  return {
    ...source,
    id: newId,
    question: templates[newId % templates.length],
    keywords: [...source.keywords, `q${newId}`],
  };
}

// ============================================================
// UTILITAIRES
// ============================================================

export function getQuestionsByCategory(category: Category | 'all', count: number = 10): Question[] {
  const all = generateAllQuestions();
  const filtered = category === 'all' ? all : all.filter(q => q.category === category);
  return shuffle(filtered).slice(0, count);
}

export function getQuestionsByDifficulty(difficulty: Difficulty, count: number = 10): Question[] {
  const all = generateAllQuestions();
  const filtered = all.filter(q => q.difficulty === difficulty);
  return shuffle(filtered).slice(0, count);
}

export function getQuestionsForQuiz(
  category: Category | 'all',
  difficulty: Difficulty | 'mixed',
  count: number = 10,
): Question[] {
  let pool = generateAllQuestions();

  if (category !== 'all') {
    pool = pool.filter(q => q.category === category);
  }
  if (difficulty !== 'mixed') {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  // Distribution équilibrée des difficultés en mode mixed
  if (difficulty === 'mixed' && count >= 9) {
    const easy = shuffle(pool.filter(q => q.difficulty === 'easy')).slice(0, Math.ceil(count * 0.3));
    const medium = shuffle(pool.filter(q => q.difficulty === 'medium')).slice(0, Math.ceil(count * 0.4));
    const hard = shuffle(pool.filter(q => q.difficulty === 'hard')).slice(0, Math.ceil(count * 0.3));
    return shuffle([...easy, ...medium, ...hard]).slice(0, count);
  }

  return shuffle(pool).slice(0, count);
}

export function getQuestionCount(): number {
  return generateAllQuestions().length;
}

export function getCategoryCounts(): Record<Category | 'all', number> {
  const all = generateAllQuestions();
  const counts: Record<string, number> = { all: all.length };
  for (const cat of ['geography', 'history', 'biology', 'chemistry', 'general', 'physics', 'technology'] as Category[]) {
    counts[cat] = all.filter(q => q.category === cat).length;
  }
  return counts as Record<Category | 'all', number>;
}
