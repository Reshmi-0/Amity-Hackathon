import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState, PriorityLevel, Category, DateRange, SortOption, Item } from '../types';
import { matchesPriority } from '../lib/priority';
import { expandQuery } from '../lib/synonyms';

export function useFilters(allItems: Item[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const statusParam = (searchParams.get('status') || 'All') as 'All' | 'Lost' | 'Found';
  const categoryParam = (searchParams.get('category') || 'All') as 'All' | Category;
  const priorityParam = (searchParams.get('priority') || 'All') as PriorityLevel;
  const locationParam = searchParams.get('location') || '';
  const rangeParam = (searchParams.get('range') || 'any') as DateRange;
  const sortParam = (searchParams.get('sort') || 'newest') as SortOption;

  const filters: FilterState = useMemo(() => ({
    q,
    status: ['All', 'Lost', 'Found'].includes(statusParam) ? statusParam : 'All',
    category: categoryParam,
    priority: priorityParam,
    location: locationParam,
    range: rangeParam,
    sort: sortParam,
  }), [q, statusParam, categoryParam, priorityParam, locationParam, rangeParam, sortParam]);

  const updateFilters = useCallback((newPartial: Partial<FilterState>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (newPartial.q !== undefined) {
        if (newPartial.q) next.set('q', newPartial.q);
        else next.delete('q');
      }
      if (newPartial.status !== undefined) {
        if (newPartial.status !== 'All') next.set('status', newPartial.status);
        else next.delete('status');
      }
      if (newPartial.category !== undefined) {
        if (newPartial.category !== 'All') next.set('category', newPartial.category);
        else next.delete('category');
      }
      if (newPartial.priority !== undefined) {
        if (newPartial.priority !== 'All') next.set('priority', newPartial.priority);
        else next.delete('priority');
      }
      if (newPartial.location !== undefined) {
        if (newPartial.location) next.set('location', newPartial.location);
        else next.delete('location');
      }
      if (newPartial.range !== undefined) {
        if (newPartial.range !== 'any') next.set('range', newPartial.range);
        else next.delete('range');
      }
      if (newPartial.sort !== undefined) {
        if (newPartial.sort !== 'newest') next.set('sort', newPartial.sort);
        else next.delete('sort');
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(prev => {
      const next = new URLSearchParams();
      const currentQ = prev.get('q');
      if (currentQ) next.set('q', currentQ);
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  // Extract distinct locations from data
  const availableLocations = useMemo(() => {
    const set = new Set<string>();
    for (const item of allItems) {
      if (item.location) set.add(item.location.trim());
    }
    return Array.from(set).sort();
  }, [allItems]);

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let result = [...allItems];

    // Status filter
    if (filters.status !== 'All') {
      const targetType = filters.status.toLowerCase();
      result = result.filter(item => item.type === targetType);
    }

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter(item => item.category === filters.category);
    }

    // Priority filter (derived from category)
    if (filters.priority !== 'All') {
      result = result.filter(item => matchesPriority(item.category, filters.priority));
    }

    // Location filter
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(item => item.location.toLowerCase().includes(loc));
    }

    // Date range filter
    if (filters.range !== 'any') {
      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;
      result = result.filter(item => {
        if (!item.date) return true;
        const itemTime = new Date(item.date).getTime();
        const diffDays = (now - itemTime) / oneDay;
        if (filters.range === 'today') return diffDays <= 1.5;
        if (filters.range === '7days') return diffDays <= 7.5;
        if (filters.range === '30days') return diffDays <= 30.5;
        return true;
      });
    }

    // Keyword Search with synonyms
    if (filters.q.trim()) {
      const queryTokens = filters.q.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const expandedTerms = expandQuery(filters.q);

      result = result.filter(item => {
        const textTarget = `${item.name} ${item.description} ${item.category} ${item.location}`.toLowerCase();
        
        // Every word in query should match somewhere or match synonym
        return queryTokens.every(term => {
          if (textTarget.includes(term)) return true;
          // Check synonym expansion
          return expandedTerms.some(syn => textTarget.includes(syn));
        });
      });

      // Best Match sorting if sort === 'match'
      if (filters.sort === 'match') {
        const lowerQ = filters.q.toLowerCase().trim();
        result.sort((a, b) => {
          const aNameMatch = a.name.toLowerCase().includes(lowerQ) ? 3 : 0;
          const bNameMatch = b.name.toLowerCase().includes(lowerQ) ? 3 : 0;
          const aDescMatch = a.description.toLowerCase().includes(lowerQ) ? 1 : 0;
          const bDescMatch = b.description.toLowerCase().includes(lowerQ) ? 1 : 0;
          return (bNameMatch + bDescMatch) - (aNameMatch + aDescMatch);
        });
        return result;
      }
    }

    // Sorting
    if (filters.sort === 'oldest') {
      result.sort((a, b) => new Date(a.date || a.created_at).getTime() - new Date(b.date || b.created_at).getTime());
    } else if (filters.sort === 'newest') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [allItems, filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    availableLocations,
    filteredItems,
  };
}
