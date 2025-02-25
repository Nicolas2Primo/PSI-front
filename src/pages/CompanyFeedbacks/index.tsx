// CompanyFeedbacks.tsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEvaluations, Evaluation } from "../../context/EvaluationContext";
import Modal from "../../components/modal";
import CompanyFeedbackModal from "../../components/modal/CompanyFeedbackModal";

const CompanyFeedbacks = () => {
  const { companyName } = useAuth();
  const { products } = useProducts();
  const { evaluations, updateEvaluation } = useEvaluations();
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<Evaluation | null>(null);
  const [productFilter, setProductFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  // Filtra os produtos da empresa
  const companyProducts = products.filter(
    (product) => product.company === companyName
  );

  // Filtra as avaliações que pertencem a esses produtos e que já possuem uma resposta da empresa
  let feedbackEvaluations = evaluations.filter(
    (evaluation) =>
      companyProducts.some((product) => product.id === evaluation.productId) &&
      evaluation.companyResponse
  );

  // Aplica filtro por nome do produto
  if (productFilter) {
    feedbackEvaluations = feedbackEvaluations.filter((evaluation) => {
      const product = companyProducts.find(
        (p) => p.id === evaluation.productId
      );
      return product
        ? product.name.toLowerCase().includes(productFilter.toLowerCase())
        : false;
    });
  }

  // Aplica filtro por nota se definido
  if (ratingFilter) {
    const ratingValue = Number(ratingFilter);
    feedbackEvaluations = feedbackEvaluations.filter(
      (evaluation) => evaluation.rating === ratingValue
    );
  }

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Feedbacks Respondidos</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por produto..."
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Filtrar por Nota</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      {feedbackEvaluations.length === 0 ? (
        <p className="text-gray-600">Nenhum feedback respondido.</p>
      ) : (
        feedbackEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white p-4 rounded shadow mb-2">
            <div className="flex items-center mb-1">
              <span className="mr-2 font-semibold">
                Nota: {evaluation.rating}
              </span>
            </div>
            <p className="mb-2">
              <strong>Avaliação:</strong> {evaluation.feedback}
            </p>
            <p className="mb-2">
              <strong>Sua Resposta:</strong> {evaluation.companyResponse}
            </p>
            <button
              onClick={() => setSelectedEvaluation(evaluation)}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Editar Resposta
            </button>
          </div>
        ))
      )}
      {selectedEvaluation && (
        <Modal onClose={() => setSelectedEvaluation(null)}>
          <CompanyFeedbackModal
            evaluation={selectedEvaluation}
            onClose={() => setSelectedEvaluation(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CompanyFeedbacks;
