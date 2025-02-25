import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductContext";
import { useEvaluations } from "../../context/EvaluationContext";
import { useNavigate, useLocation } from "react-router";
import CompanyProductReviews from "../CompanyProductReviews"; // novo componente para avaliações por produto

const CompanyDashboard = () => {
  const { companyName } = useAuth();
  const { products } = useProducts();
  const { evaluations } = useEvaluations();
  const navigate = useNavigate();
  const location = useLocation();

  // Lê a query param "view"
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

  // Se a query param for "reviews", renderiza a view temporária com avaliações agrupadas por produto
  if (view === "reviews") {
    return (
      <CompanyProductReviews
        companyProducts={companyProducts}
        evaluations={evaluations}
        onBack={() => navigate("/company/dashboard")}
      />
    );
  }

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard da Empresa</h1>
      <p className="mb-4">Veja as métricas e desempenho da sua empresa.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card Produtos/Serviços Criados - redireciona para /company/products */}
        <div
          onClick={() => navigate("/company/products")}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-lg font-semibold">Produtos/Serviços Criados</h2>
          <p className="text-2xl">{companyProducts.length}</p>
        </div>
        {/* Card Avaliações Recebidas - redireciona para /company/feedbacks */}
        <div
          onClick={() => navigate("/company/feedbacks")}
          className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow"
        >
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
