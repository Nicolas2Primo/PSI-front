import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useAuth } from "../../context/AuthContext";

const CompanyProducts = () => {
  const { products, addProduct } = useProducts();
  const { companyName } = useAuth();
  const [newProduct, setNewProduct] = useState({ name: "", description: "" });

  // Filtra os produtos que pertencem à empresa logada
  const companyProducts = products.filter(
    (product) => product.company === companyName
  );

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      company: companyName,
      imageUrl: "", // Aqui pode ser integrado com upload de imagem
    });
    setNewProduct({ name: "", description: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Produtos/Serviços</h1>
      <div className="mb-6">
        {companyProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow mb-2">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">
          Cadastrar novo produto/serviço
        </h2>
        <form onSubmit={handleAddProductSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome do produto/serviço"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Descrição do produto/serviço"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="p-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Cadastrar Produto/Serviço
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProducts;
