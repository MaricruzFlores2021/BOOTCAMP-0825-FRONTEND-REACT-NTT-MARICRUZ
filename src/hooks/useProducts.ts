import { useProductsContext } from '../context/ProductsContext';

export function useProducts() {
  const { products, loading, error } = useProductsContext();
  return { products, loading, error };
}
