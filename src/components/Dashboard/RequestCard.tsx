import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';
import CancelModal from '../Modals/CancelModal';
import { useState } from 'react';
import type { Request } from '@/types';

interface RequestCardProps {
  req: Request;
  currentAgentId?: string | null;
}

function RequestCard({ req, currentAgentId }: RequestCardProps) {
  const { state, dispatch } = useApp();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
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
      <div>Last Updated: {new Date(req.lastUpdated).toLocaleString()}</div>

      {req.state === 'CANCELLED' && <div>Reason: {req.cancelReason}</div>}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {/* Agent buttons */}
        {state.role === 'AGENT' &&
          req.agentId === currentAgentId &&
          req.state === 'PENDING' && (
            <Button
              onClick={() => dispatch({ type: 'START_REQUEST', id: req.id })}
            >
              Start
            </Button>
          )}
        {state.role === 'AGENT' &&
          req.agentId === currentAgentId &&
          req.state === 'ACTIVE' && (
            <Button
              onClick={() => dispatch({ type: 'COMPLETE_REQUEST', id: req.id })}
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
              {req.state === 'PENDING' && (
                <Button onClick={() => setIsCancelOpen(true)}>Cancel</Button>
              )}
            </>
          )}
      </div>
      <CancelModal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        onConfirm={(reason) => {
          dispatch({
            type: 'CANCEL_REQUEST',
            id: req.id,
            reason: reason,
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
}

export default RequestCard;
