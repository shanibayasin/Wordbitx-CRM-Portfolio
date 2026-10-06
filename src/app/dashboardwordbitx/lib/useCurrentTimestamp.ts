'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (onStoreChange: () => void) => {
  const intervalId = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(intervalId);
};

const getSnapshot = () => Math.floor(Date.now() / 60_000);

export function useCurrentTimestamp(): number {
  return useSyncExternalStore(subscribe, getSnapshot, () => 0) * 60_000;
}
