import './App.css';
import RequestList from './components/Dashboard/RequestList';
import DashboardHeader from './components/Dashboard/DashboardHeader';
import { useAutoAdvance } from './hooks/useAutoAdvance';

function App() {
  useAutoAdvance();
  return (
    <>
      <DashboardHeader />
      <RequestList />
    </>
  );
}

export default App;
