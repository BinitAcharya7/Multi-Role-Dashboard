import './App.css';
import { AppProvider } from './context/AppContext';
import Tester from './Tester';

function App() {
  return (
    <AppProvider>
      <Tester />
    </AppProvider>
  );
}

export default App;
