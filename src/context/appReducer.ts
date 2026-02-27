import type { AppState, Action, RequestState } from '@/types';

import { mockAgents, mockRequests } from '@/mockData';

export const initialState: AppState = {
  role: 'SUPERVISOR',
  requests: mockRequests,
  agents: mockAgents,
  filter: 'ALL',
};

const agentArray = ['a1', 'a2', 'a3', 'a4', 'a5'];

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.role };

    case 'SET_FILTER':
      return { ...state, filter: action.filter };

    case 'START_REQUEST':
      return handleStartRequest(state, action.id);

    case 'COMPLETE_REQUEST':
      return handleCompleteRequest(state, action.id);

    case 'CANCEL_REQUEST':
      return handleCancelRequest(state, action.id, action.reason);

    case 'REASSIGN_REQUEST':
      return handleReassignRequest(state, action.id, action.agentId);

    case 'REQUEST_CREATED':
      return handleRequestCreated(state);

    case 'STATE_CHANGED':
      return handleStateChanged(state, action.id);

    case 'AGENT_ASSIGNED':
      return handleAgentAssigned(state);

    // case 'AUTO_ADVANCE':
    //   return handleAutoAdvance(state);

    default:
      return state;
  }
}

function handleStartRequest(state: AppState, id: string): AppState {
  return {
    ...state,
    requests: state.requests.map((req) =>
      req.id === id && req.state === 'PENDING'
        ? { ...req, state: 'ACTIVE', lastUpdated: new Date().toISOString() }
        : req,
    ),
  };
}

function handleCompleteRequest(state: AppState, id: string): AppState {
  return {
    ...state,
    requests: state.requests.map((req) =>
      req.id === id && req.state === 'ACTIVE'
        ? { ...req, state: 'COMPLETED', lastUpdated: new Date().toISOString() }
        : req,
    ),
  };
}

function handleCancelRequest(
  state: AppState,
  id: string,
  reason: string,
): AppState {
  return {
    ...state,
    requests: state.requests.map((req) =>
      req.id === id && req.state === 'PENDING'
        ? {
            ...req,
            state: 'CANCELLED',
            cancelReason: reason,
            lastUpdated: new Date().toISOString(),
          }
        : req,
    ),
  };
}

function handleReassignRequest(
  state: AppState,
  id: string,
  agentId: string,
): AppState {
  return {
    ...state,
    requests: state.requests.map((req) =>
      req.id === id && !['COMPLETED', 'CANCELLED'].includes(req.state)
        ? { ...req, agentId, lastUpdated: new Date().toISOString() }
        : req,
    ),
  };
}

function handleRequestCreated(state: AppState): AppState {
  return {
    ...state,
    requests: [
      ...state.requests,
      {
        id: crypto.randomUUID(),
        description: 'New Request',
        state: 'PENDING',
        agentId: agentArray[Math.floor(Math.random() * agentArray.length)],
        lastUpdated: new Date().toISOString(),
      },
    ],
  };
}

function handleStateChanged(state: AppState, id: string): AppState {
  return {
    ...state,
    requests: state.requests.map((req) =>
      req.id === id
        ? {
            ...req,
            state: nextState(req.state),
            lastUpdated: new Date().toISOString(),
          }
        : req,
    ),
  };

  function nextState(state: RequestState): RequestState {
    if (state === 'PENDING') return 'ACTIVE';
    if (state === 'ACTIVE') return 'COMPLETED';
    return state;
  }
}

function handleAgentAssigned(state: AppState): AppState {
  return {
    ...state,
    requests: state.requests.map((req) =>
      req.state === 'PENDING' ? { ...req, assignedTo: 'a2' } : req,
    ),
  };
}

export default appReducer;
