import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { distinctCount } = useCart(); // Obtener contador

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 24px', background: '#eee' }}>
      <h1>
        <img
          src="/store-front.png"
          style={{ width: '50px', verticalAlign: 'middle' }}
          alt="icono"
        />{' '}
        Mi Market
      </h1>

      <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/">Inicio</Link>
        <Link to="/summary">Carrito ({distinctCount})</Link> {/* Contador */}
        {isAuthenticated ? (
          <>
            <span>Hola, {user}</span>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
