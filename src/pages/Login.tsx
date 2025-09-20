import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validación: no espacios vacíos
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Complete todos los campos.');
      return;
    }

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });

      if (!res.ok) {
        if (res.status === 400) {
          setErrorMsg('Credenciales incorrectas.');
        } else {
          setErrorMsg('Algo salió mal, inténtelo más tarde.');
        }
        return;
      }

      const data = await res.json();
      // Login con el nombre del usuario
      login(data.firstName + ' ' + data.lastName);
      navigate('/');
    } catch {
      setErrorMsg('Algo salió mal, inténtelo más tarde.');
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMsg('');

    // Validación email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      setForgotMsg('Ingrese un correo válido');
      return;
    }

    // Envío
    setForgotMsg('Enviado correctamente');
  };

  return (
    <div style={{ maxWidth: 320, margin: '40px auto' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuario</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMsg && (
          <div style={{ color: 'red', marginTop: 8 }}>{errorMsg}</div>
        )}
        <button type="submit" style={{ marginTop: 12, width: '100%' }}>
          Entrar
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          onClick={() => setShowForgot(true)}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          Olvidé Contraseña
        </button>
      </div>

      {/* Olvidar contraseña */}
      {showForgot && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ background: '#fff', padding: 20, borderRadius: 6, width: 300 }}>
            <h3>Recuperar contraseña</h3>
            <form onSubmit={handleForgot}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                style={{ width: '100%' }}
              />
              {forgotMsg && (
                <div style={{ color: forgotMsg === 'Enviado correctamente' ? 'green' : 'red', marginTop: 8 }}>
                  {forgotMsg}
                </div>
              )}
              <button type="submit" style={{ marginTop: 12 }}>
                Enviar
              </button>
            </form>
            <button
              type="button"
              onClick={() => { setShowForgot(false); setForgotMsg(''); setForgotEmail(''); }}
              style={{ marginTop: 8 }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
