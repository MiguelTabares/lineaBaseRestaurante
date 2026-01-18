import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login';

// Componente placeholder para dashboard protegido
const Dashboard = () => {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1>Dashboard Principal</h1>
      <p style={{ marginTop: '1rem' }}>Bienvenido al sistema SIGR.</p>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
