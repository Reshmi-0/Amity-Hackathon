import { Category, PriorityLevel } from '../types';

export function priorityOf(category: Category): 'High' | 'Medium' | 'Low' {
  switch (category) {
    case 'Documents':
    case 'Electronics':
      return 'High';
    case 'Accessories':
    case 'Bags':
      return 'Medium';
    case 'Books':
    case 'Other':
    default:
      return 'Low';
  }
}

export function matchesPriority(category: Category, priority: PriorityLevel): boolean {
  if (priority === 'All') return true;
  return priorityOf(category) === priority;
}
