import { useCart } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { useDistricts } from '../hooks/useDistricts';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../context/CartContext';

type FormData = {
  nombres: string;
  apellidos: string;
  distrito: string;
  direccion: string;
  referencia: string;
  celular: string;
};

export default function Summary() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const items: CartItem[] = Object.values(state.items);
  const total = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const districts = useDistricts();

  const onSubmit = (data: FormData) => {
    alert('Pedido registrado con éxito');
    console.log({ cliente: data, carrito: items });
    dispatch({ type: 'CLEAR' });
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Resumen de compra</h2>

      {items.length === 0 ? (
        <div>No hay productos en el carrito.</div>
      ) : (
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Producto</th>
                <th style={{ padding: '8px' }}>Nombre</th>
                <th style={{ padding: '8px' }}>Cantidad</th>
                <th style={{ padding: '8px' }}>Precio</th> 
                <th style={{ padding: '8px' }}>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px' }}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                    />
                  </td>
                  <td style={{ padding: '8px' }}>{item.product.title}</td>
                  <td style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => dispatch({ type: 'DECREMENT', id: item.product.id })}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => dispatch({ type: 'INCREMENT', id: item.product.id })}>+</button>
                    </div>
                  </td>
                  <td style={{ padding: '8px' }}>
                    S/. {(item.product.price * item.qty).toFixed(2)}
                  </td>
                  <td style={{ padding: '8px' }}>
                    <button onClick={() => dispatch({ type: 'REMOVE', id: item.product.id })}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ textAlign: 'right', marginTop: 16 }}>Total: S/. {total.toFixed(2)}</h3>
        </div>
      )}

      {/* Formulario estilo */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            maxWidth: 500,
            width: '100%',
            padding: 16,
            border: '1px solid #ccc',
            borderRadius: 8,
            backgroundColor: '#f1f1f1',
          }}
        >
          <label>Nombres</label>
          <input {...register('nombres', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
          {errors.nombres && <div style={{ color: 'red' }}>Nombres inválidos</div>}

          <label>Apellidos</label>
          <input {...register('apellidos', { required: true, pattern: /^[A-Za-z\s]+$/ })} />
          {errors.apellidos && <div style={{ color: 'red' }}>Apellidos inválidos</div>}

          <label>Distrito</label>
          <select {...register('distrito', { required: true })}>
            <option value="">Seleccione</option>
            {districts.map((distrito) => (
              <option key={distrito} value={distrito}>
                {distrito}
              </option>
            ))}
          </select>
          {errors.distrito && <div style={{ color: 'red' }}>Seleccione un distrito</div>}

          <label>Dirección</label>
          <input {...register('direccion', { required: true })} />
          {errors.direccion && <div style={{ color: 'red' }}>Campo obligatorio</div>}

          <label>Referencia</label>
          <input {...register('referencia', { required: true })} />
          {errors.referencia && <div style={{ color: 'red' }}>Campo obligatorio</div>}

          <label>Celular</label>
          <input {...register('celular', { required: true, pattern: /^[0-9]{9}$/ })} />
          {errors.celular && <div style={{ color: 'red' }}>Ingrese 9 dígitos</div>}

          <button type="submit" style={{ marginTop: 12 }}>Comprar</button>
        </form>
      </div>
    </div>
  );
}
