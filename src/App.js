import './App.css';
import { AuthProvider } from './AuthContext';
import LoginComponent from './LoginComponent';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <LoginComponent />
      </div>
    </AuthProvider>
  );
}

export default App;
