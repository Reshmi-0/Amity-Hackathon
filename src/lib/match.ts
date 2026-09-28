import { Item, Match } from '../types';
import { tokenize } from './synonyms';

export const MATCH_THRESHOLD = 50;

export function scorePair(a: Item, b: Item): number {
  // Must compare lost with found (opposite types)
  if (a.type === b.type) return 0;
  if (a.returned || b.returned) return 0;

  let score = 0;

  // 1. Same category (+30 points)
  if (a.category === b.category) {
    score += 30;
  }

  // 2. Token overlap between name + description (up to 40 points)
  const tokensA = new Set([
    ...tokenize(a.name),
    ...tokenize(a.description)
  ]);
  const tokensB = new Set([
    ...tokenize(b.name),
    ...tokenize(b.description)
  ]);

  if (tokensA.size > 0 && tokensB.size > 0) {
    let intersectionCount = 0;
    for (const t of tokensA) {
      if (tokensB.has(t)) {
        intersectionCount++;
      }
    }
    const minSize = Math.min(tokensA.size, tokensB.size);
    if (minSize > 0) {
      const overlapCoeff = intersectionCount / minSize;
      score += Math.round(overlapCoeff * 40);
    }
  }

  // 3. Same location (+15 points)
  const locA = a.location.toLowerCase().trim();
  const locB = b.location.toLowerCase().trim();
  if (locA && locB && (locA === locB || locA.includes(locB) || locB.includes(locA))) {
    score += 15;
  }

  // 4. Dates within 3 days (+15 points)
  if (a.date && b.date) {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    if (!isNaN(timeA) && !isNaN(timeB)) {
      const dayDiff = Math.abs(timeA - timeB) / (1000 * 60 * 60 * 24);
      if (dayDiff <= 3) {
        score += 15;
      } else if (dayDiff <= 7) {
        score += 8;
      }
    }
  }

  return Math.min(100, score);
}

export function getMatches(item: Item, allItems: Item[]): Match[] {
  if (item.returned) return [];

  const matches: Match[] = [];

  for (const other of allItems) {
    if (other.id === item.id) continue;
    const score = scorePair(item, other);
    if (score >= MATCH_THRESHOLD) {
      matches.push({ item: other, score });
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}

export function countMatchedItems(items: Item[]): number {
  let count = 0;
  for (const item of items) {
    if (getMatches(item, items).length > 0) {
      count++;
    }
  }
  return count;
}
