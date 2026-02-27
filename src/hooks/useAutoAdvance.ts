// import { useEffect, useState } from 'react';
// import { useApp } from '@/context/AppContext';

// export function useAutoAdvance(enabled: boolean) {
//   const { state, dispatch } = useApp();
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     const hasWork = state.requests.some(
//       (r) => r.state === 'PENDING' || r.state === 'ACTIVE',
//     );

//     if (!enabled || !hasWork) {
//       setIsRunning(false); // update running status
//       return;
//     }

//     setIsRunning(true);

//     const delay = 5000 + Math.random() * 10000;

//     const timeoutId = setTimeout(() => {
//       dispatch({ type: 'AUTO_ADVANCE' });
//     }, delay);

//     return () => clearTimeout(timeoutId);
//   }, [state.requests, dispatch, enabled]);

//   return isRunning;
// }

{
  /* Auto Advancing Toggle */
}
{
  /* <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold"> Operations Dashboard</h1>
        {isSupervisor && (
          <button
            onClick={() => setAutoAdvanceEnabled((prev) => !prev)}
            className={`
            px-4 py-2 rounded font-semibold cursor-pointer
            transition-colors duration-300
            ${isRunning ? 'bg-green-500 hover:bg-green-600 animate-pulse' : 'bg-gray-500 hover:bg-gray-600'}
            text-white
          `}
          >
            {!autoAdvanceEnabled
              ? 'Start Auto Advancing'
              : isRunning
                ? 'Auto Advancing'
                : 'All Done'}
          </button>
        )}
      </div> */
}

// const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);

// const isRunning = useAutoAdvance(autoAdvanceEnabled);

// function handleAutoAdvance(state: AppState): AppState {
//   const candidates = state.requests.filter(
//     (req) => req.state === 'PENDING' || req.state === 'ACTIVE',
//   );
//   if (candidates.length === 0) return state;

//   const randomIndex = Math.floor(Math.random() * candidates.length);
//   const request = candidates[randomIndex];

//   return {
//     ...state,
//     requests: state.requests.map((req) => {
//       if (req.id !== request.id) return req;
//       if (request.state === 'PENDING')
//         return {
//           ...req,
//           state: 'ACTIVE',
//           lastUpdated: new Date().toISOString(),
//         };
//       if (request.state === 'ACTIVE')
//         return {
//           ...request,
//           state: 'COMPLETED',
//           lastUpdated: new Date().toISOString(),
//         };
//       return req;
//     }),
//   };
// }
