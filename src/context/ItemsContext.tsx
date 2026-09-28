import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { Item, Match } from '../types';
import { fetchItems, markReturned as apiMarkReturned } from '../lib/api';
import { getMatches } from '../lib/match';

interface ItemsContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addLocal: (item: Item) => void;
  markReturnedLocal: (id: string) => Promise<void>;
  matchesFor: (id: string) => Match[];
  totalMatches: number;
  newReportId: string | null;
  setNewReportId: (id: string | null) => void;
  unlockedContacts: Record<string, string>;
  unlockContact: (id: string, contact: string) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newReportId, setNewReportId] = useState<string | null>(null);
  const [unlockedContacts, setUnlockedContacts] = useState<Record<string, string>>({});

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load listings. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Refetch on window focus
    const onFocus = () => {
      loadData();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [loadData]);

  const addLocal = useCallback((newItem: Item) => {
    setItems(prev => [newItem, ...prev.filter(i => i.id !== newItem.id)]);
    setNewReportId(newItem.id);
    // Remove pulse after 4 seconds
    setTimeout(() => {
      setNewReportId(null);
    }, 4000);
  }, []);

  const markReturnedLocal = useCallback(async (id: string) => {
    try {
      await apiMarkReturned(id);
      setItems(prev => prev.map(item => (item.id === id ? { ...item, returned: true } : item)));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const unlockContact = useCallback((id: string, contact: string) => {
    setUnlockedContacts(prev => ({ ...prev, [id]: contact }));
  }, []);

  // Compute matches map once
  const matchesMap = useMemo(() => {
    const map = new Map<string, Match[]>();
    for (const item of items) {
      map.set(item.id, getMatches(item, items));
    }
    return map;
  }, [items]);

  const matchesFor = useCallback((id: string): Match[] => {
    return matchesMap.get(id) || [];
  }, [matchesMap]);

  const totalMatches = useMemo(() => {
    let count = 0;
    for (const [, list] of matchesMap.entries()) {
      if (list.length > 0) count++;
    }
    return count;
  }, [matchesMap]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        loading,
        error,
        refresh: loadData,
        addLocal,
        markReturnedLocal,
        matchesFor,
        totalMatches,
        newReportId,
        setNewReportId,
        unlockedContacts,
        unlockContact
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export function useItems(): ItemsContextType {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
}
