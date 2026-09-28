export type ItemType = 'lost' | 'found';

export type Category = 
  | 'Electronics'
  | 'Documents'
  | 'Accessories'
  | 'Books'
  | 'Bags'
  | 'Other';

export interface Item {
  id: string;
  type: ItemType;
  name: string;
  category: Category;
  location: string;
  date: string;
  description: string;
  contact: string;
  question: string;
  answer: string;
  returned: boolean;
  created_at: string;
  images?: string[];
}

export interface Match {
  item: Item;
  score: number;
}

export interface ReportInput {
  type: ItemType;
  name: string;
  category: Category;
  location: string;
  date: string;
  description: string;
  contact: string;
  question: string;
  answer: string;
}

export type PriorityLevel = 'All' | 'High' | 'Medium' | 'Low';
export type DateRange = 'any' | 'today' | '7days' | '30days';
export type SortOption = 'newest' | 'oldest' | 'match';

export interface FilterState {
  q: string;
  status: 'All' | 'Lost' | 'Found';
  category: 'All' | Category;
  priority: PriorityLevel;
  location: string;
  range: DateRange;
  sort: SortOption;
}
