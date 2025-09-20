import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

describe('Header', () => {
  it('muestra el nombre de la tienda', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Mi Market/i)).toBeInTheDocument();
  });

  it('muestra link a Login cuando no está autenticado', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Header />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
