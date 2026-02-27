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
    <div className="px-6 flex gap-4 justify-around h-32 bg-linear-120 from-blue-700 via-purple-800 to-blue-800 items-center w-full rounded-2xl">
      {/* Role Switcher */}
      <div>
        <label className="mr-2 font-bold text-white">Role:</label>
        <select
          className="text-white bg-gray-800"
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
    px-4 py-2 rounded-3xl font-semibold text-l transition-colors duration-300 text-white cursor-auto
    ${
      connectionStatus === 'CONNECTED'
        ? 'bg-green-500 animate-pulse'
        : connectionStatus === 'RECONNECTING'
          ? 'bg-yellow-500'
          : 'bg-gray-500'
    }
  `}
        >
          {connectionStatus}
        </button>

        {/* Filter */}
        <div>
          <label className="mr-2 font-bold text-white">Filter:</label>
          <select
            className="text-white bg-gray-800"
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
