// CompanyProductReviews.tsx
import React, { useState } from "react";
import { Product } from "../../context/ProductContext";
import { Evaluation } from "../../context/EvaluationContext";

interface CompanyProductReviewsProps {
  companyProducts: Product[];
  evaluations: Evaluation[];
  onBack: () => void;
}

const CompanyProductReviews: React.FC<CompanyProductReviewsProps> = ({
  companyProducts,
  evaluations,
  onBack,
}) => {
  const [productFilter, setProductFilter] = useState("");

  // Filtra os produtos com base no filtro de nome
  const filteredProducts = companyProducts.filter((product) =>
    product.name.toLowerCase().includes(productFilter.toLowerCase())
  );

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <button onClick={onBack} className="mb-4 p-2 bg-gray-200 rounded">
        Voltar
      </button>
      <h2 className="text-2xl font-bold mb-4">Avaliações por Produto</h2>
      <input
        type="text"
        placeholder="Filtrar por produto..."
        value={productFilter}
        onChange={(e) => setProductFilter(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">Nenhum produto encontrado.</p>
      ) : (
        filteredProducts.map((product) => {
          const productEvals = evaluations.filter(
            (ev) => ev.productId === product.id
          );
          return (
            <div key={product.id} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              {productEvals.length === 0 ? (
                <p className="text-gray-600">
                  Nenhuma avaliação para este produto.
                </p>
              ) : (
                productEvals.map((ev) => (
                  <div key={ev.id} className="p-4 border rounded mb-2">
                    <div className="flex items-center mb-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={
                            i < ev.rating ? "text-yellow-500" : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p>{ev.feedback}</p>
                  </div>
                ))
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default CompanyProductReviews;
