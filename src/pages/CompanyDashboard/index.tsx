// CompanyDashboard.tsx
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEvaluations } from "../../context/EvaluationContext";
import { useNavigate, useLocation } from "react-router";

const CompanyDashboard = () => {
  const { companyName } = useAuth();
  const { products, removeProduct } = useProducts();
  const { evaluations } = useEvaluations();
  const navigate = useNavigate();
  const location = useLocation();

  // Lê a query param para ver a rota temporária
  const queryParams = new URLSearchParams(location.search);
  const view = queryParams.get("view");

  // Filtra os produtos da empresa logada
  const companyProducts = products.filter(
    (product) => product.company === companyName
  );

  // Métricas do dashboard
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
  const feedbacksResponded = 0; // placeholder

  // Se a query param for 'products', renderiza a tela temporária de produtos criados
  if (view === "products") {
    return (
      <div className="w-full h-full p-4">
        <button
          onClick={() => navigate("/company/dashboard")}
          className="mb-4 p-2 bg-gray-200 rounded"
        >
          Voltar
        </button>
        <h2 className="text-2xl font-bold mb-4">Produtos/Serviços Criados</h2>
        {companyProducts.length === 0 ? (
          <p className="text-gray-600">Nenhum produto/serviço cadastrado.</p>
        ) : (
          companyProducts.map((product) => (
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
                  onClick={() =>
                    alert(
                      `Editar produto ${product.id} (implementar modal ou edição inline)`
                    )
                  }
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
      </div>
    );
  }

  // Visão padrão do dashboard
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard da Empresa</h1>
      <p className="mb-4">Veja as métricas e desempenho da sua empresa.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card Produtos/Serviços Criados */}
        <div
          onClick={() => navigate("?view=products")}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-semibold">Produtos/Serviços Criados</h2>
          <p className="text-2xl">{companyProducts.length}</p>
        </div>
        {/* Card Avaliações Recebidas */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Avaliações Recebidas</h2>
          <p className="text-2xl">{totalEvaluations}</p>
        </div>
        {/* Card Índice de Satisfação */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Índice de Satisfação</h2>
          <p className="text-2xl">{averageRating}</p>
        </div>
        {/* Card Feedbacks Respondidos */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Feedbacks Respondidos</h2>
          <p className="text-2xl">{feedbacksResponded}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
