import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

type Status = 'CONNECTED' | 'RECONNECTING';

export function useRequestStream(enabled: boolean) {
  const { dispatch } = useApp();
  const [status, setStatus] = useState<Status>('CONNECTED');

  useEffect(() => {
    if (!enabled) return;

    let interval: number;
    let disconnectTimer: number;

    function startStream() {
      setStatus('CONNECTED');

      interval = window.setInterval(() => {
        const event = Math.floor(Math.random() * 3);

        if (event === 0) dispatch({ type: 'REQUEST_CREATED' });
        if (event === 1) dispatch({ type: 'STATE_CHANGED' });
        if (event === 2) dispatch({ type: 'AGENT_ASSIGNED' });
      }, 5000);

      disconnectTimer = window.setTimeout(() => {
        clearInterval(interval);
        setStatus('RECONNECTING');

        setTimeout(() => {
          startStream(); // restart everything
        }, 5000);
      }, 30000);
    }

    startStream();

    return () => {
      clearInterval(interval);
      clearTimeout(disconnectTimer);
    };
  }, [enabled, dispatch]);

  return status;
}
