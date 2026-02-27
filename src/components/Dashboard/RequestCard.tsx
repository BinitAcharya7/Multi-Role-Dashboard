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
  const agent = state.agents.find((a) => a.id === req.agentId); // Deriving agent for agent name

  return (
    <div
      key={req.id}
      className="border-purple-700 p-4 border-2 rounded-4xl flex-col text-left shadow-black"
    >
      <div className="text-center text-blue-600">
        <strong>{req.description}</strong>
      </div>
      <div>
        <span className="text-purple-800 font-bold">ID:</span> {req.id}
      </div>
      <div>
        <span className="text-purple-800 font-bold">State:</span> {req.state}
      </div>
      <div>
        <span className="text-purple-800 font-bold">Agent:</span>{' '}
        {agent?.name ?? 'Unknown'}
      </div>
      <div>
        <span className="text-purple-800 font-bold">Last Updated:</span>{' '}
        {new Date(req.lastUpdated).toLocaleString()}
      </div>

      {req.state === 'CANCELLED' && (
        <div>
          <span className="text-purple-800 font-bold">Reason:</span>{' '}
          {req.cancelReason || 'No Reason Given'}
        </div>
      )}

      {/* Supervisor-only Reassign Dropdown */}
      {state.role === 'SUPERVISOR' &&
        !['COMPLETED', 'CANCELLED'].includes(req.state) && (
          <div className="text-center mt-2">
            <div className="text-l text-purple-950 font-bold">
              Reassign Agent
            </div>
            {
              <select
                className="text-center"
                value={req.agentId ?? ''}
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
            }
          </div>
        )}

      {/* Action Buttons */}
      <div className="flex mt-2 gap-2 justify-center">
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
              {req.state === 'PENDING' && req.agentId !== null && (
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
    </div>
  );
}

export default RequestCard;
