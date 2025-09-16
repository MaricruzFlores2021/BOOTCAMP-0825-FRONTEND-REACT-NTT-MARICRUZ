import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { usePagination } from '../hooks/usePagination';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [warning, setWarning] = useState('');
  const [category, setCategory] = useState('todos');

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filtered = products.filter((p) => {
    const matchCategory = category === 'todos' || p.category === category;
    const matchSearch =
      !search.trim() ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const { current, page, totalPages, goTo } = usePagination(filtered, 6);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() && value.trim().length < 3) {
      setWarning('Ingrese mínimo son 3 caracteres');
    } else {
      setWarning('');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar productos</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Productos</h2>

      {/* Búsqueda y categoría estilos */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 16,
          flexWrap: 'wrap'
        }}
      >
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={handleSearchChange}
          style={{ padding: 8, width: 250, maxWidth: '80%' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="todos">Todos</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {warning && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>
          {warning}
        </div>
      )}

      {/* Productos estilos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 200px)',
          justifyContent: 'center',
          gap: 16
        }}
      >
        {current.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          No se encontraron productos.
        </div>
      )}

      {/* Paginación*/}
      <div
        style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'center',
          gap: 8
        }}
      >
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i + 1)}
            style={{
              background: page === i + 1 ? '#333' : '#ccc',
              color: page === i + 1 ? '#fff' : '#000',
              padding: '4px 8px'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
