import { useEffect, useState } from 'react';

/** useDebounce — menunda update value hingga user berhenti mengetik selama `delay` ms */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
