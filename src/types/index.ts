
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;      
  thumbnail?: string;  
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
