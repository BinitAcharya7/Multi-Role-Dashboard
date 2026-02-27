import { useApp } from '@/context/AppContext';
import type { Agent } from '@/types';

interface Props {
  onClose: () => void;
}

export default function AgentSummaryModal({ onClose }: Props) {
  const { state } = useApp();

  const summaries = state.agents.map((agent: Agent) => {
    const agentRequests = state.requests.filter((r) => r.agentId === agent.id);
    return {
      agent,
      PENDING: agentRequests.filter((r) => r.state === 'PENDING').length,
      ACTIVE: agentRequests.filter((r) => r.state === 'ACTIVE').length,
      COMPLETED: agentRequests.filter((r) => r.state === 'COMPLETED').length,
      CANCELLED: agentRequests.filter((r) => r.state === 'CANCELLED').length,
      total: agentRequests.length,
    };
  });

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-purple-700 rounded-lg p-6 w-full max-w-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-pink-300 text-xl font-bold m-auto">
            Agent Summary
          </h2>
          <button
            className="text-gray-400 hover:text-white text-lg font-bold"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {summaries.map(
            ({ agent, PENDING, ACTIVE, COMPLETED, CANCELLED, total }) => (
              <div
                key={agent.id}
                className="flex items-center justify-between bg-gray-800 rounded-md px-4 py-3"
              >
                <span className="text-pink-300 font-semibold w-24">
                  {agent.name}
                </span>

                <div className="flex gap-4 text-sm">
                  <span className="text-yellow-400">🟡 {PENDING} Pending</span>
                  <span className="text-blue-400">🔵 {ACTIVE} Active</span>
                  <span className="text-green-400">🟢 {COMPLETED} Done</span>
                  <span className="text-yellow-500">
                    🔴 {CANCELLED} Cancelled
                  </span>
                </div>

                <span className="text-gray-400 text-sm">{total} total</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
