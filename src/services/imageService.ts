import type { Question } from '../types';
import { findBestImageUrl, getSearchQuery } from './imageMapping';

const IMAGE_CACHE = new Map<string, string>();

// Images de secours ULTIME (si tout échoue) - éducatives et variées
const ULTIMATE_FALLBACKS = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', // study/books
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', // education
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', // knowledge
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', // learning
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', // study desk
];

export async function getImageForQuestion(question: Question): Promise<string> {
  const cacheKey = `img_${question.id}`;
  if (IMAGE_CACHE.has(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey)!;
  }

  let imageUrl: string | null = null;

  // === NIVEAU 1: Photo vérifiée correspondant exactement au sujet ===
  imageUrl = findBestImageUrl(question.question, question.category, question.keywords);
  if (imageUrl) {
    IMAGE_CACHE.set(cacheKey, imageUrl);
    return imageUrl;
  }

  // === NIVEAU 2: API Unsplash avec la clé (via backend proxy) ===
  imageUrl = await searchUnsplashAPI(question);
  if (imageUrl) {
    IMAGE_CACHE.set(cacheKey, imageUrl);
    return imageUrl;
  }

  // === NIVEAU 3: Fallback direct Unsplash (sans clé, pertinence limitée) ===
  const searchQuery = getSearchQuery(question.question, question.category, question.keywords);
  imageUrl = await tryUnsplashDirect(searchQuery);
  if (imageUrl) {
    IMAGE_CACHE.set(cacheKey, imageUrl);
    return imageUrl;
  }

  // === NIVEAU 4: Fallback ultime aléatoire ===
  imageUrl = ULTIMATE_FALLBACKS[Math.floor(Math.random() * ULTIMATE_FALLBACKS.length)];
  IMAGE_CACHE.set(cacheKey, imageUrl);
  return imageUrl;
}

async function searchUnsplashAPI(question: Question): Promise<string | null> {
  try {
    const searchQuery = getSearchQuery(question.question, question.category, question.keywords);
    // Essayer via le backend proxy
    const response = await fetch(
      `/api/images/search?query=${encodeURIComponent(searchQuery)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].url || data[0];
    }
    if (data.url) return data.url;
    return null;
  } catch {
    return null;
  }
}

async function tryUnsplashDirect(query: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`,
      { headers: { 'Accept-Version': 'v1' } }
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.results?.length > 0) {
      return data.results[0].urls?.regular || data.results[0].urls?.small || null;
    }
    return null;
  } catch {
    return null;
  }
}

export function preloadImages(questions: Question[]): void {
  questions.forEach(q => {
    getImageForQuestion(q).catch(() => {});
  });
}

export function clearImageCache(): void {
  IMAGE_CACHE.clear();
}
