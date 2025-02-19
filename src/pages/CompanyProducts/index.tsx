import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Serviço A", description: "Descrição do Serviço A" },
  { id: 2, name: "Serviço B", description: "Descrição do Serviço B" },
];

const CompanyProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: "", description: "" });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id: nextId, ...newProduct }]);
    setNewProduct({ name: "", description: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos/Serviços</h1>
      <div className="mb-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow mb-2">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            {/* Aqui podem ser adicionadas ações de edição ou remoção */}
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Cadastrar novo produto/serviço</h2>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome do produto/serviço"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Descrição do produto/serviço"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="p-2 bg-black text-white rounded hover:bg-gray-800">
            Cadastrar Produto/Serviço
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProducts;
