import { useState } from "react";
import { useProducts, Product } from "../../context/ProductContext";
import Modal from "../../components/modal";
import ProductEvaluationsViewModal from "../../components/modal/EvaluateViewModal";

const ProductEvaluationsPage = () => {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h1 className="mb-4 text-2xl font-bold">Avaliações</h1>
      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex flex-wrap gap-3">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="w-64 p-4 mb-2 bg-white rounded shadow cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            {product.imageUrl ? (
              <img
                className="object-cover w-full h-40 border rounded-md"
                src={product.imageUrl}
                alt={product.name}
              />
            ) : (
              <div className="w-full h-40 bg-gray-500 border rounded-md" />
            )}
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p className="text-sm">Empresa: {product.company}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <Modal onClose={() => setSelectedProduct(null)}>
          <ProductEvaluationsViewModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductEvaluationsPage;
