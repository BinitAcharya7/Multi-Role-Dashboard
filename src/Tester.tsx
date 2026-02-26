import { useApp } from './context/AppContext';

export default function Tester() {
  const { state, dispatch } = useApp();

  return (
    <div style={{ padding: 20 }}>
      <h2>Tester</h2>

      <button onClick={() => dispatch({ type: 'AUTO_ADVANCE' })}>
        Auto Advance
      </button>

      <button onClick={() => dispatch({ type: 'SET_ROLE', role: 'AGENT' })}>
        Switch to AGENT
      </button>

      <button
        onClick={() => dispatch({ type: 'SET_ROLE', role: 'SUPERVISOR' })}
      >
        Switch to SUPERVISOR
      </button>

      <hr />

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
