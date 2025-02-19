import React from "react";
import { useEvaluations } from "../../../context/EvaluationContext";
import { Product } from "../../../context/ProductContext";
import { useNavigate } from "react-router";

interface ProductEvaluationsViewModalProps {
  product: Product;
  onClose: () => void;
}

const ProductEvaluationsViewModal: React.FC<ProductEvaluationsViewModalProps> = ({ product, onClose }) => {
  const { evaluations } = useEvaluations();
  const navigate = useNavigate();
  
  // Filtra as avaliações referentes a esse produto
  const productEvaluations = evaluations.filter(ev => ev.productId === product.id);

  const handleEvaluate = () => {
    // Redireciona para a página de catálogo com filtro aplicado via query parameter
    navigate(`/user/catalog?product=${encodeURIComponent(product.name)}`);
    onClose();
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">Avaliações de {product.name}</h1>
      <div className="mb-4 overflow-auto max-h-60">
        {productEvaluations.length > 0 ? (
          productEvaluations.map(ev => (
            <div key={ev.id} className="p-2 mb-2 border-b">
              <div className="flex items-center">
                <span className="mr-2 font-semibold">Nota: {ev.rating}</span>
                <span>{ev.feedback}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma avaliação registrada.</p>
        )}
      </div>
      <button
        onClick={handleEvaluate}
        className="w-full p-2 text-white bg-black rounded hover:bg-gray-800"
      >
        Avaliar este produto
      </button>
    </div>
  );
};

export default ProductEvaluationsViewModal;
