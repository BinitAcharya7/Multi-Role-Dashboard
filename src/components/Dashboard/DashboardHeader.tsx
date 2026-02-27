import { useApp } from '@/context/AppContext';
import { useRequestStream } from '@/hooks/useRequestStream';
import type { UserRole } from '@/types';
import type { RequestState } from '@/types';
// import { useState } from 'react';

export default function DashboardHeader() {
  const { state, dispatch } = useApp();

  // const isSupervisor = state.role === 'SUPERVISOR';
  const connectionStatus = useRequestStream(true);

  // Live counts for summary bar
  const counts = {
    PENDING: 0,
    ACTIVE: 0,
    COMPLETED: 0,
    CANCELLED: 0,
  };

  state.requests.forEach((r) => {
    counts[r.state]++;
  });

  return (
    <div className="px-6 flex gap-4 justify-around h-32 bg-linear-120 from-gray-950 via-purple-950 to-gray-950 items-center w-full">
      {/* Role Switcher */}
      <div>
        <label className="mr-2 font-bold text-pink-300">Role:</label>
        <select
          className="text-pink-300 bg-gray-800"
          value={state.role}
          onChange={(e) =>
            dispatch({
              type: 'SET_ROLE',
              role: e.target.value as UserRole,
            })
          }
        >
          <option value="SUPERVISOR">Supervisor</option>
          <option value="AGENT">Agent</option>
        </select>
      </div>

      {/* Filter + Stats */}
      <div className="flex items-center gap-20">
        {/* Summary*/}
        <div className="flex gap-3 text-l text-white">
          <span>
            🟡 {counts.PENDING} <span className="text-yellow-300">Pending</span>
          </span>
          <span>
            🔵 {counts.ACTIVE} <span className="text-blue-400">Active</span>
          </span>
          <span>
            🟢 {counts.COMPLETED}{' '}
            <span className="text-green-400">Completed</span>
          </span>
          <span>
            🔴 {counts.CANCELLED}{' '}
            <span className="text-red-400">Cancelled</span>
          </span>
        </div>

        {/* Connection Indicator */}
        <button
          className={`
    px-1.5 py-0.5 rounded-3xl font-semibold text-sm transition-colors duration-300 text-pink-300 cursor-auto
    ${
      connectionStatus === 'CONNECTED'
        ? 'bg-green-700 animate-pulse'
        : connectionStatus === 'RECONNECTING'
          ? 'bg-yellow-600'
          : 'bg-gray-500'
    }
  `}
        >
          {connectionStatus}
        </button>

        {/* Filter */}
        <div>
          <label className="mr-2 font-bold text-pink-300">Filter:</label>
          <select
            className="text-pink-300 bg-gray-800"
            value={state.filter}
            onChange={(e) =>
              dispatch({
                type: 'SET_FILTER',
                filter: e.target.value as RequestState,
              })
            }
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}
