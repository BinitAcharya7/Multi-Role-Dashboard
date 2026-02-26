import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export function useAutoAdvance() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const hasWork = state.requests.some(
      (r) => r.state === 'PENDING' || r.state === 'ACTIVE',
    );

    if (!hasWork) return;

    const delay = 5000 + Math.random() * 10000;

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'AUTO_ADVANCE' });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [state.requests, dispatch]);
}
