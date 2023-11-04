//debounce - delay a function(trigger a function, but only once per use case).

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debounceValue;
}