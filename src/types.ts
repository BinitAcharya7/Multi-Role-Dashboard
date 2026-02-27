export type RequestState = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export type UserRole = 'SUPERVISOR' | 'AGENT';

export interface Agent {
  id: string;
  name: string;
}

export interface Request {
  id: string;
  state: RequestState;
  agentId: string;
  // agentName: string,
  description: string;
  lastUpdated: string;
  cancelReason?: string;
}

export interface RequestStats {
  total: number;
  pending: number;
  cancelled: number;
  completed: number;
  active: number;
}

export interface AppState {
  role: UserRole;
  requests: Request[];
  agents: Agent[];
  filter: RequestState | 'ALL';
}

export type Action =
  | { type: 'SET_ROLE'; role: 'SUPERVISOR' | 'AGENT' }
  | { type: 'SET_FILTER'; filter: RequestState | 'ALL' }
  | { type: 'START_REQUEST'; id: string }
  | { type: 'COMPLETE_REQUEST'; id: string }
  | { type: 'CANCEL_REQUEST'; id: string; reason: string }
  | { type: 'REASSIGN_REQUEST'; id: string; agentId: string }
  | { type: 'AUTO_ADVANCE' }
  | { type: 'REQUEST_CREATED' }
  | { type: 'STATE_CHANGED' }
  | { type: 'AGENT_ASSIGNED' };
