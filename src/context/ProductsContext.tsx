import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';
import { apiFetch } from '../services/api';

type ProductsContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<{ products: Product[] }>('https://dummyjson.com/products?limit=100')
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProductsContext debe usarse dentro de un ProductsProvider');
  return ctx;
}
