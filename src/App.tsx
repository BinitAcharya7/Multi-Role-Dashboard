import './App.css';
import { AppProvider } from './context/AppContext';
import RequestList from './components/Dashboard/RequestList';
import DashboardHeader from './components/Dashboard/DashboardHeader';

function App() {
  return (
    <AppProvider>
      <DashboardHeader />
      <RequestList />
    </AppProvider>
  );
}

export default App;
