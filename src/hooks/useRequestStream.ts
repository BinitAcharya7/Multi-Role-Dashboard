import { useEffect, useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';

type Status = 'CONNECTED' | 'RECONNECTING';

export function useRequestStream(enabled: boolean) {
  const { state, dispatch } = useApp();
  const [status, setStatus] = useState<Status>('CONNECTED');
  const requestsRef = useRef(state.requests);

  useEffect(() => {
    requestsRef.current = state.requests;
  }, [state.requests]);

  useEffect(() => {
    if (!enabled) return;

    let interval: number;
    let disconnectTimer: number;

    function startStream() {
      setStatus('CONNECTED');

      interval = setInterval(() => {
        const event = Math.floor(Math.random() * 3);

        if (event === 0) dispatch({ type: 'REQUEST_CREATED' });
        if (event === 1) {
          const requests = requestsRef.current.filter(
            (req) => req.state === 'PENDING' || req.state === 'ACTIVE',
          );
          if (requests.length === 0) return;
          const random = requests[Math.floor(Math.random() * requests.length)];
          dispatch({ type: 'STATE_CHANGED', id: random.id });
        }
        if (event === 2) dispatch({ type: 'AGENT_ASSIGNED' });
      }, 5000);

      disconnectTimer = setTimeout(() => {
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
