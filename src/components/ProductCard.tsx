import type { Product } from '../types';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  return (
    <div className="card" style={{border:'1px solid #ddd', borderRadius:6, padding:12, width:200}}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{width:'100%', height:140, objectFit:'cover', borderRadius:6}}
      />
      <h3>{product.title}</h3>
      <p>{product.description.slice(0, 80)}...</p>
      <p>S/. {product.price}</p>
      <button onClick={() => dispatch({ type: 'ADD', product })}>Agregar</button>
    </div>
  );
}
