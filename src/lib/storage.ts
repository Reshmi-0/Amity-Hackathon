const MINE_KEY = 'clf:mine';
const SAVED_KEY = 'clf:saved';
const ATTEMPT_PREFIX = 'clf:attempts:';

export function getMyReportedIds(): string[] {
  try {
    const raw = localStorage.getItem(MINE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addMyReportedId(id: string): void {
  try {
    const ids = getMyReportedIds();
    if (!ids.includes(id)) {
      ids.unshift(id);
      localStorage.setItem(MINE_KEY, JSON.stringify(ids));
    }
  } catch (e) {
    console.error(e);
  }
}

export function isMyReport(id: string): boolean {
  return getMyReportedIds().includes(id);
}

export function getSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleSavedId(id: string): boolean {
  try {
    const ids = getSavedIds();
    const index = ids.indexOf(id);
    let isNowSaved = false;
    if (index >= 0) {
      ids.splice(index, 1);
      isNowSaved = false;
    } else {
      ids.push(id);
      isNowSaved = true;
    }
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
    return isNowSaved;
  } catch {
    return false;
  }
}

export function getAttempts(itemId: string): number {
  try {
    const val = sessionStorage.getItem(`${ATTEMPT_PREFIX}${itemId}`);
    return val ? parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementAttempts(itemId: string): number {
  try {
    const current = getAttempts(itemId) + 1;
    sessionStorage.setItem(`${ATTEMPT_PREFIX}${itemId}`, current.toString());
    return current;
  } catch {
    return 1;
  }
}

export function resetAttempts(itemId: string): void {
  try {
    sessionStorage.removeItem(`${ATTEMPT_PREFIX}${itemId}`);
  } catch {
    // ignore
  }
}
