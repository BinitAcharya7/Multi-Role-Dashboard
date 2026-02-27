import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

export function useAutoAdvance(enabled: boolean) {
  const { state, dispatch } = useApp();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const hasWork = state.requests.some(
      (r) => r.state === 'PENDING' || r.state === 'ACTIVE',
    );

    if (!enabled || !hasWork) {
      setIsRunning(false); // update running status
      return;
    }

    setIsRunning(true);

    const delay = 5000 + Math.random() * 10000;

    const timeoutId = setTimeout(() => {
      dispatch({ type: 'AUTO_ADVANCE' });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [state.requests, dispatch, enabled]);

  return isRunning;
}
