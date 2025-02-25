import { useState } from "react";
import { useEvaluations } from "../../context/EvaluationContext";
import { useProducts, Product } from "../../context/ProductContext";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import EditProductModal from "../../components/modal/EditProductModal";
import Modal from "../../components/modal";

const UserDashboard = () => {
  const { evaluations } = useEvaluations();
  const { products, removeProduct } = useProducts();
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProductToEdit, setSelectedProductToEdit] =
    useState<Product | null>(null);

  // Lê o parâmetro de consulta 'view'
  const queryParams = new URLSearchParams(location.search);
  const view = queryParams.get("view");

  // Caso 'view' seja 'reviews', exibe as avaliações do usuário
  if (view === "reviews") {
    return (
      <div className="w-full h-full p-4">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="mb-4 p-2 bg-gray-200 rounded"
        >
          Voltar
        </button>
        <h2 className="text-2xl font-bold mb-4">Minhas Avaliações</h2>
        {evaluations.length === 0 ? (
          <p className="text-gray-600">Nenhuma avaliação cadastrada.</p>
        ) : (
          evaluations.map((evaluation) => (
            <div key={evaluation.id} className="p-4 border-b">
              <div className="flex items-center mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < evaluation.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>{evaluation.feedback}</p>
              {evaluation.companyResponse && (
                <p className="mt-1 text-sm text-green-700">
                  <strong>Feedback Recebido:</strong>{" "}
                  {evaluation.companyResponse}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    );
  }

  // Caso 'view' seja 'feedbacks', exibe os feedbacks recebidos
  if (view === "feedbacks") {
    const feedbacksReceived = evaluations.filter(
      (evaluation) =>
        evaluation.companyResponse && evaluation.companyResponse.trim() !== ""
    );
    return (
      <div className="w-full h-full p-4">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="mb-4 p-2 bg-gray-200 rounded"
        >
          Voltar
        </button>
        <h2 className="text-2xl font-bold mb-4">Feedbacks Recebidos</h2>
        {feedbacksReceived.length === 0 ? (
          <p className="text-gray-600">Nenhum feedback recebido.</p>
        ) : (
          feedbacksReceived.map((evaluation) => (
            <div key={evaluation.id} className="p-4 border-b">
              <div className="flex items-center mb-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < evaluation.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>
                <strong>Avaliação:</strong> {evaluation.feedback}
              </p>
              <p className="mt-1 text-sm text-green-700">
                <strong>Feedback Recebido:</strong> {evaluation.companyResponse}
              </p>
            </div>
          ))
        )}
      </div>
    );
  }

  // Caso 'view' seja 'products', exibe os produtos/serviços criados pelo usuário
  if (view === "products") {
    const userProducts = products.filter(
      (product) => product.origin === "user"
    );
    return (
      <div className="w-full h-full p-4">
        <button
          onClick={() => navigate("/user/dashboard")}
          className="mb-4 p-2 bg-gray-200 rounded"
        >
          Voltar
        </button>
        <h2 className="text-2xl font-bold mb-4">Produtos/Serviços Criados</h2>
        {userProducts.length === 0 ? (
          <p className="text-gray-600">Nenhum produto/serviço cadastrado.</p>
        ) : (
          userProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded mb-2 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  Categoria: {product.category}
                </p>
                <p className="text-sm text-gray-600">
                  Localização: {product.location}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProductToEdit(product)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        )}
        {selectedProductToEdit && (
          <Modal onClose={() => setSelectedProductToEdit(null)}>
            <EditProductModal
              product={selectedProductToEdit}
              onClose={() => setSelectedProductToEdit(null)}
            />
          </Modal>
        )}
      </div>
    );
  }

  // Visão padrão do dashboard
  const totalEvaluations = evaluations.length;
  const averageRating =
    totalEvaluations > 0
      ? (
          evaluations.reduce((acc, cur) => acc + cur.rating, 0) /
          totalEvaluations
        ).toFixed(1)
      : "0";
  const pendingFeedbacks = 0; // Placeholder
  const userProductsCount = products.filter(
    (product) => product.origin === "user"
  ).length;

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Usuário</h1>
      <p className="mb-4">
        Bem-vindo ao seu painel. Aqui você pode acompanhar suas avaliações,
        feedbacks e produtos/serviços criados.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card Total de Avaliações */}
        <div
          onClick={() => navigate("?view=reviews")}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-semibold">Total de Avaliações</h2>
          <p className="text-2xl">{totalEvaluations}</p>
        </div>
        {/* Card Média de Avaliação (não clicável) */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Média de Avaliação</h2>
          <p className="text-2xl">{averageRating}</p>
        </div>
        {/* Card Feedbacks Recebidos */}
        <div
          onClick={() => navigate("?view=feedbacks")}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-semibold">Feedbacks Recebidos</h2>
          <p className="text-2xl">
            {
              evaluations.filter(
                (evaluation) =>
                  evaluation.companyResponse &&
                  evaluation.companyResponse.trim() !== ""
              ).length
            }
          </p>
        </div>
        {/* Card Produtos/Serviços Criados */}
        <div
          onClick={() => navigate("?view=products")}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-semibold">Produtos/Serviços Criados</h2>
          <p className="text-2xl">{userProductsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
