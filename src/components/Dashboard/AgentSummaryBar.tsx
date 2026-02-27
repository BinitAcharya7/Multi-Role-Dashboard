import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import AgentSummaryModal from '@/components/Modals/AgentSummaryModal';

export default function AgentSummaryBar() {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const summaries = state.agents.map((agent) => {
    const agentRequests = state.requests.filter((r) => r.agentId === agent.id);
    const active = agentRequests.filter((r) => r.state === 'ACTIVE').length;
    const pending = agentRequests.filter((r) => r.state === 'PENDING').length;
    return { agent, active, pending, total: agentRequests.length };
  });

  return (
    <>
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-2 flex gap-4 overflow-x-auto">
        {summaries.map(({ agent, active, pending, total }) => (
          <button
            key={agent.id}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-md px-3 py-1.5 text-sm text-white shrink-0 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="font-semibold text-purple-400">{agent.name}</span>
            <span className="text-blue-400">{active} active</span>
            <span className="text-yellow-400">{pending} pending</span>
            <span className="text-gray-400">/ {total}</span>
          </button>
        ))}

        <button
          className="ml-auto shrink-0 text-xs text-purple-400 hover:text-purple-300 underline"
          onClick={() => setIsOpen(true)}
        >
          Full summary →
        </button>
      </div>

      {isOpen && <AgentSummaryModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
