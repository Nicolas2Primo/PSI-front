import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEvaluations } from "../../context/EvaluationContext";

const CompanyDashboard = () => {
  const { companyName } = useAuth();
  const { products } = useProducts();
  const { evaluations } = useEvaluations();

  // Produtos da empresa
  const companyProducts = products.filter(
    (product) => product.company === companyName
  );
  // Avaliações para os produtos da empresa
  const companyEvaluations = evaluations.filter((ev) =>
    companyProducts.some((product) => product.id === ev.productId)
  );
  const totalEvaluations = companyEvaluations.length;
  const averageRating =
    totalEvaluations > 0
      ? (
          companyEvaluations.reduce((acc, cur) => acc + cur.rating, 0) /
          totalEvaluations
        ).toFixed(1)
      : "0";
  // Feedbacks respondidos – placeholder, pois a lógica de respostas ainda não está implementada
  const feedbacksResponded = 0;

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard da Empresa</h1>
      <p className="mb-4">Veja as métricas e desempenho da sua empresa.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Avaliações Recebidas</h2>
          <p className="text-2xl">{totalEvaluations}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Índice de Satisfação</h2>
          <p className="text-2xl">{averageRating}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Feedbacks Respondidos</h2>
          <p className="text-2xl">{feedbacksResponded}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
