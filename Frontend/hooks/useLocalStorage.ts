"use client";

import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setValue(JSON.parse(stored));
      } catch {
        setValue(initialValue);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!mounted.current) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
