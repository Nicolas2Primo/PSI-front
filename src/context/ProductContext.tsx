import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  company: string;
  imageUrl?: string;
  category?: string;
  location?: string;
  origin: "user" | "company"; // Indica quem criou o produto
}

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, updatedProduct: Partial<Product>) => void;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  updateProduct: () => {},
});

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Produto A",
      description: "Descrição do Produto A",
      company: "Empresa X",
      category: "Eletrônicos",
      location: "São Paulo",
      origin: "company",
    },
    {
      id: 2,
      name: "Produto B",
      description: "Descrição do Produto B",
      company: "Empresa Y",
      category: "Vestuário",
      location: "Rio de Janeiro",
      origin: "company",
    },
  ]);

  const addProduct = (newProduct: Omit<Product, "id">) => {
    // Normaliza os dados para comparação
    const normalizedNewName = newProduct.name.trim().toLowerCase();
    const normalizedCompany = newProduct.company.trim().toLowerCase();
    const normalizedCategory = newProduct.category
      ? newProduct.category.trim().toLowerCase()
      : "";
    const normalizedLocation = newProduct.location
      ? newProduct.location.trim().toLowerCase()
      : "";

    // Procura duplicata considerando nome, empresa, categoria e localização
    const duplicateProduct = products.find(
      (product) =>
        product.name.trim().toLowerCase() === normalizedNewName &&
        product.company.trim().toLowerCase() === normalizedCompany &&
        (product.category ? product.category.trim().toLowerCase() : "") ===
          normalizedCategory &&
        (product.location ? product.location.trim().toLowerCase() : "") ===
          normalizedLocation
    );

    if (duplicateProduct) {
      if (newProduct.origin === "user") {
        // Usuário não pode criar produto duplicado para a mesma empresa e mesmas informações
        alert(
          `Produto "${newProduct.name}" já existe (criado por ${duplicateProduct.company}).`
        );
        return;
      } else if (
        newProduct.origin === "company" &&
        duplicateProduct.origin === "user"
      ) {
        // Se a empresa criar um produto que já foi criado por um usuário,
        // remove o produto do usuário e notifica (idealmente via contexto de notificações)
        setProducts((prev) => prev.filter((p) => p.id !== duplicateProduct.id));
        alert(
          `O produto "${duplicateProduct.name}" criado pelo usuário foi substituído por uma criação da empresa.`
        );
      } else {
        // Caso já exista um produto com os mesmos dados e mesma origem, não permite criação
        alert(`Produto "${newProduct.name}" já existe.`);
        return;
      }
    }

    setProducts((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...newProduct },
    ]);
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, removeProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
