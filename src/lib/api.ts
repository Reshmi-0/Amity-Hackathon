import { Item, ReportInput } from '../types';

const STORAGE_KEY = 'clf:all_items';

// Exact seed data specified in PRD Section 8 & Mockups
export const SEED_ITEMS: Item[] = [
  {
    id: 'seed-1',
    type: 'lost',
    name: 'Black Wallet',
    category: 'Accessories',
    location: 'Canteen',
    date: '2026-09-27',
    description: 'Black leather wallet with college ID inside.',
    contact: '+91 98765 43210, abc123@college.edu',
    question: 'Whose name is on the college ID inside?',
    answer: 'rahul',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'seed-2',
    type: 'found',
    name: 'White Earphones',
    category: 'Electronics',
    location: 'Library',
    date: '2026-09-25',
    description: 'White wireless earphones (left one has a small scratch).',
    contact: '+91 99887 76655, finder.audio@college.edu',
    question: 'Which earphone has the scratch, left or right?',
    answer: 'left',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'seed-3',
    type: 'lost',
    name: 'Blue Backpack',
    category: 'Bags',
    location: 'Block A',
    date: '2026-09-24',
    description: 'Blue backpack with a denim keychain.',
    contact: '+91 98112 34567, pack.owner@college.edu',
    question: 'What kind of keychain hangs on the zip?',
    answer: 'denim',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'seed-4',
    type: 'found',
    name: 'Student ID Card',
    category: 'Documents',
    location: 'Main Gate',
    date: '2026-09-22',
    description: 'College ID card (R. Sharma).',
    contact: '+91 91234 56780, gate.security@college.edu',
    question: 'Which course is printed on the card?',
    answer: 'bca',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'seed-5',
    type: 'lost',
    name: 'Water Bottle',
    category: 'Other',
    location: 'Gym',
    date: '2026-09-20',
    description: 'Blue steel water bottle with sticker.',
    contact: '+91 95555 12345, sports.user@college.edu',
    question: 'What is on the sticker?',
    answer: 'panda',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'seed-6',
    type: 'found',
    name: 'Books',
    category: 'Books',
    location: 'Library',
    date: '2026-09-18',
    description: 'Two textbooks (Data Structures & OS).',
    contact: '+91 97777 88888, books.found@college.edu',
    question: 'Whose name is on the first page?',
    answer: 'ankit',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'seed-7',
    type: 'lost',
    name: 'Keys',
    category: 'Accessories',
    location: 'Canteen',
    date: '2026-09-16',
    description: 'Car keys with a blue keychain.',
    contact: '+91 90000 11111, campus.keys@college.edu',
    question: 'Which car brand is the key for?',
    answer: 'hyundai',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
  },
  {
    id: 'seed-8',
    type: 'found',
    name: 'Mobile Phone',
    category: 'Electronics',
    location: 'Block B',
    date: '2026-09-15',
    description: 'iPhone (black cover).',
    contact: '+91 92222 33333, blockb.helpdesk@college.edu',
    question: 'What is on the lock-screen wallpaper?',
    answer: 'sunset',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'seed-9',
    type: 'found',
    name: 'Brown Wallet',
    category: 'Accessories',
    location: 'Library',
    date: '2026-09-24',
    description: 'Brown wallet with cash and cards.',
    contact: '+91 98888 22222, brown.wallet@college.edu',
    question: 'How much cash is inside?',
    answer: '500',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
  {
    id: 'seed-10',
    type: 'found',
    name: 'Ladies Wallet',
    category: 'Accessories',
    location: 'Block A',
    date: '2026-09-20',
    description: 'Small black wallet with zipper.',
    contact: '+91 93333 44444, admin.lostfound@college.edu',
    question: 'What colour is the zipper pull?',
    answer: 'gold',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
  },
  {
    id: 'seed-11',
    type: 'lost',
    name: 'Student ID Wallet',
    category: 'Documents',
    location: 'Main Gate',
    date: '2026-09-22',
    description: 'Wallet with student ID and college cards.',
    contact: '+91 94444 55555, student.rep@college.edu',
    question: 'Which department is printed on the ID?',
    answer: 'commerce',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
  },
  {
    id: 'seed-12',
    type: 'lost',
    name: 'White AirPods',
    category: 'Electronics',
    location: 'Library',
    date: '2026-09-24',
    description: 'White wireless earbuds in a small case.',
    contact: '+91 96666 77777, airpods.lost@college.edu',
    question: 'What sticker is on the case?',
    answer: 'star',
    returned: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
  }
];

function loadStoredItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ITEMS));
      return SEED_ITEMS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ITEMS));
      return SEED_ITEMS;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to load items from storage:', e);
    return SEED_ITEMS;
  }
}

function saveStoredItems(items: Item[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save items to storage:', e);
  }
}

export async function fetchItems(): Promise<Item[]> {
  // Simulate network delay for realistic smooth loading experience
  await new Promise(resolve => setTimeout(resolve, 80));
  const items = loadStoredItems();
  return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function reportItem(input: ReportInput): Promise<Item> {
  await new Promise(resolve => setTimeout(resolve, 150));
  const newItem: Item = {
    id: crypto.randomUUID ? crypto.randomUUID() : `item-${Date.now()}`,
    type: input.type,
    name: input.name.trim(),
    category: input.category,
    location: input.location.trim(),
    date: input.date,
    description: input.description.trim(),
    contact: input.contact.trim(),
    question: input.question.trim(),
    answer: input.answer.trim().toLowerCase(),
    returned: false,
    created_at: new Date().toISOString(),
  };

  const current = loadStoredItems();
  const updated = [newItem, ...current];
  saveStoredItems(updated);
  return newItem;
}

export async function claimItem(id: string, answer: string): Promise<string | null> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const items = loadStoredItems();
  const item = items.find(i => i.id === id);
  if (!item) return null;

  const normalizedUserGuess = answer.trim().toLowerCase();
  const normalizedActual = (item.answer || '').trim().toLowerCase();

  if (!normalizedActual || !normalizedUserGuess) return null;

  // Verification matching logic (as per SQL function claim_item):
  // Exact match, or if length >= 3 substring match either direction
  const isMatch =
    normalizedUserGuess === normalizedActual ||
    (normalizedUserGuess.length >= 3 && normalizedActual.includes(normalizedUserGuess)) ||
    (normalizedActual.length >= 3 && normalizedUserGuess.includes(normalizedActual));

  if (isMatch) {
    return item.contact;
  }
  return null;
}

export async function markReturned(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const items = loadStoredItems();
  const updated = items.map(item => {
    if (item.id === id) {
      return { ...item, returned: true };
    }
    return item;
  });
  saveStoredItems(updated);
}
