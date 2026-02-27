import './App.css';
import RequestList from './components/Dashboard/RequestList';
import DashboardHeader from './components/Dashboard/DashboardHeader';

function App() {
  return (
    <div className="bg-black min-h-screen px-8 py-4">
      <DashboardHeader />
      <RequestList />
    </div>
  );
}

export default App;
