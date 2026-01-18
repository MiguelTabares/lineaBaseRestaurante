import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login';

import MenuPage from './pages/Menu';

// Actualizamos Dashboard para tener navegación simple
const Dashboard = () => {
  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1>Dashboard Principal</h1>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: '2rem' }}>
        <Link to="/menu" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center', color: 'white' }}>
            <h3>🍽 Menú Digital</h3>
          </div>
        </Link>
      </div>
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
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
