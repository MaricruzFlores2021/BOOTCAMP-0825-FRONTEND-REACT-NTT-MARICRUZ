// src/context/CartContext.test.tsx
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { mockProduct } from '../test-utils/mockProduct';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  it('añade productos al carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct());
    });

    expect(result.current.cart).toHaveLength(1);
  });

  it('elimina productos del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      const product = mockProduct();
      result.current.addToCart(product);
      result.current.removeFromCart(product.id);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('limpia el carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct());
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
