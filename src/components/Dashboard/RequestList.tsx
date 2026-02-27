import { useApp } from '@/context/AppContext';
import RequestCard from './RequestCard';

export default function RequestList() {
  const { state } = useApp();

  // Hardcode the current logged-in Agent
  const currentAgentId = 'a2';

  // Filter requests based on role and selected filter
  const visibleRequests = state.requests.filter((req) => {
    // Agents only see their own requests
    if (state.role === 'AGENT' && req.agentId !== currentAgentId) return false;

    // Apply state filter
    if (state.filter !== 'ALL' && req.state !== state.filter) return false;

    return true;
  });

  // no requests in filter, for agent or supervisor handler:
  if (visibleRequests.length === 0) {
    let message = '';

    if (state.filter !== 'ALL') {
      message = 'No requests match this filter.';
    } else if (state.role === 'AGENT') {
      message = 'Nothing assigned to you right now.';
    } else {
      message = 'No requests in the system.';
    }

    return (
      <div style={{ padding: 20 }}>
        <h2>
          {state.role === 'SUPERVISOR' ? 'Supervisor View' : 'Agent View'}
        </h2>

        <div
          style={{
            marginTop: 40,
            textAlign: 'center',
            color: '#777',
            fontSize: 18,
          }}
        >
          {message}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{state.role === 'SUPERVISOR' ? 'Supervisor View' : 'Agent View'}</h2>

      {visibleRequests.map((req) => (
        <RequestCard key={req.id} req={req} currentAgentId={currentAgentId} />
      ))}
    </div>
  );
}
