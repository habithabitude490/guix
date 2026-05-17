import type { Question } from '../types';
import { findBestImageUrl } from './imageMapping';

const IMAGE_CACHE = new Map<string, string>();

const FALLBACKS = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
];

export async function getImageForQuestion(question: Question): Promise<string> {
  const cacheKey = `img_${question.id}`;
  if (IMAGE_CACHE.has(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey)!;
  }

  const imageUrl = findBestImageUrl(question.question, question.category, question.keywords)
    || FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];

  IMAGE_CACHE.set(cacheKey, imageUrl);
  return imageUrl;
}

export function preloadImages(questions: Question[]): void {
  questions.forEach(q => {
    getImageForQuestion(q).catch(() => {});
  });
}

export function clearImageCache(): void {
  IMAGE_CACHE.clear();
}
