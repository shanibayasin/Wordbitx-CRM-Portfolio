'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const storageEventPrefix = 'wordbitx:local-storage:';

export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const eventName = `${storageEventPrefix}${key}`;
    window.addEventListener('storage', onStoreChange);
    window.addEventListener(eventName, onStoreChange);
    return () => {
      window.removeEventListener('storage', onStoreChange);
      window.removeEventListener(eventName, onStoreChange);
    };
  }, [key]);

  const getSnapshot = useCallback(() => window.localStorage.getItem(key), [key]);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const value = useMemo(() => {
    if (snapshot === null) return initialValue;
    try {
      return JSON.parse(snapshot) as T;
    } catch (error) {
      console.error(`Unable to restore ${key} from local storage`, error);
      return initialValue;
    }
  }, [initialValue, key, snapshot]);

  const setValue = useCallback<Dispatch<SetStateAction<T>>>((nextValue) => {
    const serialized = window.localStorage.getItem(key);
    let currentValue = initialValue;
    if (serialized !== null) {
      try {
        currentValue = JSON.parse(serialized) as T;
      } catch (error) {
        console.error(`Unable to restore ${key} from local storage`, error);
      }
    }
    const updatedValue = typeof nextValue === 'function'
      ? (nextValue as (previousValue: T) => T)(currentValue)
      : nextValue;

    window.localStorage.setItem(key, JSON.stringify(updatedValue));
    window.dispatchEvent(new Event(`${storageEventPrefix}${key}`));
  }, [initialValue, key]);

  return [value, setValue];
}
