// src/test-utils/mockProduct.ts
import type { Product } from '../types';

export const mockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: 'Producto Mock',
  description: 'Descripción de producto mock',
  price: 50,
  category: 'Categoría Mock',
  image: 'https://via.placeholder.com/150',
  ...overrides,
});
