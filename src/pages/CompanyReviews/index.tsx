// CompanyReviews.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEvaluations, Evaluation } from "../../context/EvaluationContext";
import Modal from "../../components/modal";

const CompanyReviews = () => {
  const { companyName } = useAuth();
  const { products } = useProducts();
  const { evaluations, updateEvaluation } = useEvaluations();
  const [respondingEvaluation, setRespondingEvaluation] =
    useState<Evaluation | null>(null);
  const [companyResponse, setCompanyResponse] = useState("");

  const companyProducts = products.filter(
    (product) => product.company === companyName
  );

  const reviewsByProduct: { [key: number]: Evaluation[] } = {};
  companyProducts.forEach((product) => {
    reviewsByProduct[product.id] = evaluations.filter(
      (ev) => ev.productId === product.id
    );
  });

  const handleRespond = () => {
    if (respondingEvaluation) {
      updateEvaluation(respondingEvaluation.id, { companyResponse });
      setRespondingEvaluation(null);
    }
  };

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
                {review.companyResponse && (
                  <div className="mt-2 p-2 border rounded bg-gray-100">
                    <strong>Sua Resposta:</strong>
                    <p>{review.companyResponse}</p>
                  </div>
                )}
                {!review.companyResponse && (
                  <button
                    onClick={() => {
                      setRespondingEvaluation(review);
                      setCompanyResponse("");
                    }}
                    className="mt-2 text-blue-500"
                  >
                    Responder
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              Nenhuma avaliação para este produto.
            </p>
          )}
        </div>
      ))}
      {respondingEvaluation && (
        <Modal onClose={() => setRespondingEvaluation(null)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Responder Avaliação</h2>
            <textarea
              value={companyResponse}
              onChange={(e) => setCompanyResponse(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            ></textarea>
            <button
              onClick={handleRespond}
              className="p-2 bg-black text-white rounded"
            >
              Enviar Resposta
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CompanyReviews;
