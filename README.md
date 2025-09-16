Tienda Virtual 
Proyecto de tienda online desarrollado con React, TypeScript y Vite. Permite la visualización de productos, búsqueda y filtrado, gestión de carrito de compras, autenticación simulada, y procesamiento de órdenes a través de un formulario validado.

Características
•	Listado paginado de productos con búsqueda y filtrado.
•	Gestión global del estado con Context API.
•	Carrito de compras con operaciones de agregar, eliminar y modificar cantidades.
•	Autenticación simulada con login/logout y protección de rutas.
•	Formulario de compra con validaciones y selección de distritos.
•	Consumo de API externa (https://dummyjson.com).

Estructura del proyecto
src/
├── components/         # Componentes reutilizables (Header, ProductCard)
├── context/            # Contextos globales (Auth, Cart, Products)
├── hooks/              # Hooks personalizados (usePagination useDistricts,useProducts)
├── pages/              # Vistas (Home, Login, Summary)
├── routes/             # Rutas (withAuth)
├── services/           # API (apiFetch)
├── styles/             # Estilos CSS globales
├── types/              # Definiciones TypeScript
├── utils/              # Mappers

Estado y flujo
•	Los productos se cargan desde la API y se almacenan en ProductsContext.
•	El carrito utiliza CartContext y un useReducer para manejar la lógica de agregar/remover.
•	La autenticación se gestiona con AuthContext, controlando acceso mediante withAuth.
•	El formulario de checkout utiliza React Hook Form para validaciones avanzadas.

Instalación y ejecución
1.	Clona el repositorio:
2.	git clone 
3.	cd tienda-react
4.	npm run dev
