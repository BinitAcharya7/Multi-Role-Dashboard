import './App.css';
import RequestList from './components/Dashboard/RequestList';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import AgentSummaryBar from './components/Dashboard/AgentSummaryBar';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <DashboardHeader />
      <AgentSummaryBar />
      <RequestList />
    </div>
  );
}

export default App;
