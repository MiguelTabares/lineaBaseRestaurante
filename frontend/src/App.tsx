import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/Login';
import MenuPage from './pages/Menu';
import OrderCreate from './pages/OrderCreate';
import Kitchen from './pages/Kitchen';
import Reservations from './pages/Reservations';
import Reports from './pages/Reports';

// Actualizamos Dashboard
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
        <Link to="/orders/new" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center', color: 'white' }}>
            <h3>📝 Nuevo Pedido</h3>
          </div>
        </Link>
        <Link to="/kitchen" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center', color: 'white' }}>
            <h3>👨‍🍳 Cocina</h3>
          </div>
        </Link>
        <Link to="/reservations" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center', color: 'white' }}>
            <h3>📅 Reservas</h3>
          </div>
        </Link>
        <Link to="/reports" style={{ textDecoration: 'none' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center', color: 'white' }}>
            <h3>📈 Reportes</h3>
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
          <Route path="/orders/new" element={<OrderCreate />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
