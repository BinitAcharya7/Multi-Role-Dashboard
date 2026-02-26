import type { Agent, Request } from '@/types';

export const mockAgents: Agent[] = [
  { id: 'a1', name: 'Mac' },
  { id: 'a2', name: 'Dee' },
  { id: 'a3', name: 'Dennis' },
  { id: 'a4', name: 'Charlie' },
  { id: 'a5', name: 'Frank' },
];

export const mockRequests: Request[] = [
  {
    id: 'r1',
    state: 'PENDING',
    agentId: 'a1',
    description: 'Fix login bug',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r2',
    state: 'ACTIVE',
    agentId: 'a5',
    description: 'Upgrade database schema',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r3',
    state: 'COMPLETED',
    agentId: 'a2',
    description: 'Refactor payment module',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r4',
    state: 'CANCELLED',
    agentId: 'a3',
    description: 'Remove legacy endpoint',
    lastUpdated: new Date().toISOString(),
    cancelReason: 'No longer needed',
  },
  {
    id: 'r5',
    state: 'COMPLETED',
    agentId: 'a2',
    description: 'Fix API requests',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r6',
    state: 'ACTIVE',
    agentId: 'a5',
    description: 'Update documentation',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r7',
    state: 'COMPLETED',
    agentId: 'a1',
    description: 'Implement checkout page',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r8',
    state: 'CANCELLED',
    agentId: 'a2',
    description: 'Connect to Stripe',
    lastUpdated: new Date().toISOString(),
    cancelReason: 'Opted for a different service',
  },
  {
    id: 'r9',
    state: 'CANCELLED',
    agentId: 'a3',
    description: 'Fix CSS for landing page',
    lastUpdated: new Date().toISOString(),
    cancelReason: 'No longer needed',
  },
  {
    id: 'r10',
    state: 'ACTIVE',
    agentId: 'a5',
    description: 'Connect to Paypal',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r11',
    state: 'ACTIVE',
    agentId: 'a4',
    description: 'Update Docker Files',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'r12',
    state: 'PENDING',
    agentId: 'a2',
    description: 'Write new tests',
    lastUpdated: new Date().toISOString(),
  },
];
