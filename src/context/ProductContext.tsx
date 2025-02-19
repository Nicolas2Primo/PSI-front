import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  company: string;
  imageUrl?: string;
}

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  addProduct: () => {}
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Produto A", description: "Descrição do Produto A", company: "Empresa X" },
    { id: 2, name: "Produto B", description: "Descrição do Produto B", company: "Empresa Y" }
  ]);

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...product }
    ]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
