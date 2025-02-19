import { useState } from "react";
import { useProducts, Product } from "../../context/ProductContext";
import Modal from "../../components/modal";
import ProductRegistrationModal from "../../components/modal/ProductRegistrationModal";
import EvaluateFeedbackModal from "../../components/modal/EvaluateFeedbackModal";

const ProductCatalog = () => {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [evaluationModalProduct, setEvaluationModalProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h1 className="mb-4 text-2xl font-bold">Catálogo de Produtos/Serviços</h1>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={() => setIsRegistrationModalOpen(true)}
          className="p-2 ml-4 text-white bg-black rounded hover:bg-gray-800"
        >
          Cadastrar Novo Produto
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-64 p-4 mb-2 bg-white rounded shadow">
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
            <p>{product.description}</p>
            <button
              onClick={() => setEvaluationModalProduct(product)}
              className="w-full p-2 mt-2 text-white bg-black rounded hover:bg-gray-800"
            >
              Avaliar / Dar Feedback
            </button>
          </div>
        ))}
      </div>
      {isRegistrationModalOpen && (
        <Modal onClose={() => setIsRegistrationModalOpen(false)}>
          <ProductRegistrationModal onClose={() => setIsRegistrationModalOpen(false)} />
        </Modal>
      )}
      {evaluationModalProduct && (
        <Modal onClose={() => setEvaluationModalProduct(null)}>
          <EvaluateFeedbackModal
            productId={evaluationModalProduct.id}
            productName={evaluationModalProduct.name}
            onClose={() => setEvaluationModalProduct(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductCatalog;
