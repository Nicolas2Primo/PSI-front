import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEvaluations } from "../../context/EvaluationContext";

const CompanyReviews = () => {
  const { companyName } = useAuth();
  const { products } = useProducts();
  const { evaluations } = useEvaluations();

  // Filtra os produtos da empresa logada
  const companyProducts = products.filter(
    (product) => product.company === companyName
  );

  // Agrupa as avaliações por produto
  const reviewsByProduct: { [key: number]: any[] } = {};
  companyProducts.forEach((product) => {
    reviewsByProduct[product.id] = evaluations.filter(
      (ev) => ev.productId === product.id
    );
  });

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Avaliações Recebidas</h1>
      {companyProducts.map((product) => (
        <div key={product.id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          {reviewsByProduct[product.id] &&
          reviewsByProduct[product.id].length > 0 ? (
            reviewsByProduct[product.id].map((review) => (
              <div key={review.id} className="bg-white p-4 rounded shadow mb-2">
                <div className="flex items-center">
                  <span className="mr-2 font-semibold">
                    Nota: {review.rating}
                  </span>
                </div>
                <p>{review.feedback}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              Nenhuma avaliação para este produto.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompanyReviews;
