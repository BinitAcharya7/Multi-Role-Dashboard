import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';
import CancelModal from '../Modals/CancelModal';

export default function RequestList() {
  const { state, dispatch } = useApp();
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Hardcode the current logged-in Agent
  const currentAgentId = 'a2';

  function handleRequestCancel(id: string) {
    dispatch({
      type: 'CANCEL_REQUEST',
      id: id,
      reason: 'Cancelled manually',
    });
    setIsCancelOpen(true);
  }

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

      {visibleRequests.map((req) => {
        const agent = state.agents.find((a) => a.id === req.agentId);

        return (
          <div
            key={req.id}
            style={{
              border: '1px solid #ccc',
              padding: 12,
              marginBottom: 10,
              borderRadius: 6,
            }}
          >
            <div>ID: {req.id}</div>
            <strong>{req.description}</strong>
            <div>State: {req.state}</div>
            <div>Agent: {agent?.name ?? 'Unknown'}</div>
            <div>
              Last Updated: {new Date(req.lastUpdated).toLocaleString()}
            </div>

            {req.state === 'CANCELLED' && <div>Reason: {req.cancelReason}</div>}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {/* Agent buttons */}
              {state.role === 'AGENT' &&
                req.agentId === currentAgentId &&
                req.state === 'PENDING' && (
                  <Button
                    onClick={() =>
                      dispatch({ type: 'START_REQUEST', id: req.id })
                    }
                  >
                    Start
                  </Button>
                )}
              {state.role === 'AGENT' &&
                req.agentId === currentAgentId &&
                req.state === 'ACTIVE' && (
                  <Button
                    onClick={() =>
                      dispatch({ type: 'COMPLETE_REQUEST', id: req.id })
                    }
                  >
                    Complete
                  </Button>
                )}

              {/* Supervisor buttons */}
              {state.role === 'SUPERVISOR' &&
                !['COMPLETED', 'CANCELLED'].includes(req.state) && (
                  <>
                    {req.state === 'PENDING' && (
                      <Button
                        onClick={() =>
                          dispatch({ type: 'START_REQUEST', id: req.id })
                        }
                      >
                        Start
                      </Button>
                    )}
                    <Button onClick={() => handleRequestCancel(req.id)}>
                      Cancel
                    </Button>
                  </>
                )}
            </div>
            <CancelModal
              isOpen={isCancelOpen}
              onClose={() => setIsCancelOpen(false)}
              onConfirm={(reason) => {
                dispatch({
                  type: 'CANCEL_REQUEST',
                  payload: { id: request.id, reason },
                });
                setIsCancelOpen(false);
              }}
            />
            {/* Supervisor-only Reassign Dropdown */}
            {state.role === 'SUPERVISOR' &&
              !['COMPLETED', 'CANCELLED'].includes(req.state) && (
                <div style={{ marginTop: 8 }}>
                  <select
                    value={req.agentId}
                    onChange={(e) =>
                      dispatch({
                        type: 'REASSIGN_REQUEST',
                        id: req.id,
                        agentId: e.target.value,
                      })
                    }
                  >
                    {state.agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}
