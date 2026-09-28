export const SYNONYMS: Record<string, string[]> = {
  earphones: ['earphone', 'earbuds', 'earbud', 'airpods', 'headphones', 'headset', 'buds'],
  phone: ['mobile', 'iphone', 'smartphone', 'cellphone', 'android'],
  bag: ['backpack', 'bagpack', 'satchel', 'purse', 'rucksack'],
  bottle: ['flask', 'tumbler', 'sipper', 'water'],
  keys: ['key', 'keychain', 'keyset', 'fob'],
  wallet: ['purse', 'billfold', 'cardholder', 'pouch'],
  id: ['idcard', 'identity', 'badge', 'card'],
  books: ['book', 'textbook', 'textbooks', 'notebook', 'notes'],
  laptop: ['notebook', 'macbook', 'computer'],
};

// Build reverse lookup
const REVERSE_SYNONYMS: Record<string, string> = {};
for (const [canonical, variants] of Object.entries(SYNONYMS)) {
  REVERSE_SYNONYMS[canonical.toLowerCase()] = canonical;
  for (const v of variants) {
    REVERSE_SYNONYMS[v.toLowerCase()] = canonical;
  }
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'with', 'in', 'of', 'and', 'near', 'on', 'at', 'is', 'has', 'was',
  'found', 'lost', 'small', 'one', 'two', 'inside', 'for', 'it', 'to', 'my', 'some'
]);

export function normalizeWord(word: string): string {
  let w = word.toLowerCase().trim();
  // Strip trailing s if length > 3
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) {
    w = w.slice(0, -1);
  }
  return REVERSE_SYNONYMS[w] || w;
}

export function tokenize(text: string): string[] {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t))
    .map(normalizeWord);
}

export function expandQuery(query: string): string[] {
  const tokens = tokenize(query);
  const expanded = new Set<string>();

  for (const token of tokens) {
    expanded.add(token);
    const canonical = REVERSE_SYNONYMS[token] || token;
    expanded.add(canonical);
    if (SYNONYMS[canonical]) {
      for (const synonym of SYNONYMS[canonical]) {
        expanded.add(synonym);
      }
    }
  }

  return Array.from(expanded);
}
