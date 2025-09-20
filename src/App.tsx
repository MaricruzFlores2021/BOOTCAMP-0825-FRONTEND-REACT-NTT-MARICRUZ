import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { withAuth } from './routes/withAuth';

import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import Summary from './pages/Summary';

const HomeProtected = withAuth(Home);
const SummaryProtected = withAuth(Summary);

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomeProtected />} />
              <Route path="/summary" element={<SummaryProtected />} />
              
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

