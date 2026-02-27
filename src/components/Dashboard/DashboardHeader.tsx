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
    <div
      style={{
        padding: '16px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {/* Role Switcher */}
      <div>
        <label style={{ marginRight: 8, fontWeight: 'bold' }}>Role:</label>
        <select
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

      <button
        className={`
    px-4 py-2 rounded font-semibold transition-colors duration-300 text-white
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

      {/* Filter + Stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Filter */}
        <div>
          <label style={{ marginRight: 8, fontWeight: 'bold' }}>Filter:</label>
          <select
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

        {/* Summary*/}
        <div style={{ display: 'flex', gap: '12px', fontSize: 14 }}>
          <span>🟡 {counts.PENDING}</span>
          <span>🔵 {counts.ACTIVE}</span>
          <span>🟢 {counts.COMPLETED}</span>
          <span>🔴 {counts.CANCELLED}</span>
        </div>
      </div>
    </div>
  );
}
