import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';

export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: Record<number, CartItem>;
};

type Action =
  | { type: 'ADD'; product: Product }
  | { type: 'INCREMENT'; id: number }
  | { type: 'DECREMENT'; id: number }
  | { type: 'REMOVE'; id: number }
  | { type: 'CLEAR' };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<Action>;
  distinctCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items[action.product.id];
      const qty = existing ? existing.qty + 1 : 1;
      return {
        ...state,
        items: {
          ...state.items,
          [action.product.id]: { product: action.product, qty },
        },
      };
    }
    case 'INCREMENT': {
      const item = state.items[action.id];
      if (!item) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: { ...item, qty: item.qty + 1 },
        },
      };
    }
    case 'DECREMENT': {
      const item = state.items[action.id];
      if (!item) return state;
      const newQty = item.qty - 1;
      const newItems = { ...state.items };
      if (newQty <= 0) {
        delete newItems[action.id];
      } else {
        newItems[action.id] = { ...item, qty: newQty };
      }
      return { ...state, items: newItems };
    }
    case 'REMOVE': {
      const newItems = { ...state.items };
      delete newItems[action.id];
      return { ...state, items: newItems };
    }
    case 'CLEAR':
      return { items: {} };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });
  const distinctCount = Object.keys(state.items).length;

  return (
    <CartContext.Provider value={{ state, dispatch, distinctCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de un CartProvider');
  return ctx;
}
