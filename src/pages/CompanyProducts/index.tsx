import { useState } from "react";
import { Product, useProducts } from "../../context/ProductContext";
import { useEvaluations } from "../../context/EvaluationContext";
import Modal from "../../components/modal";
import ProductRegistrationModal from "../../components/modal/ProductRegistrationModal";
import ViewEvaluationsModal from "../../components/modal/ViewEvaluationsModal";
import EditProductModal from "../../components/modal/EditProductModal";
import { useAuth } from "../../context/AuthContext";

const CompanyProducts = () => {
  const { products, removeProduct } = useProducts();
  const { evaluations } = useEvaluations();
  const { companyName } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "high" para melhor avaliados, "low" para menos avaliados
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [selectedProductToView, setSelectedProductToView] =
    useState<Product | null>(null);
  const [selectedProductToEdit, setSelectedProductToEdit] =
    useState<Product | null>(null);

  // Filtra apenas os produtos que pertencem à empresa logada
  const companyProducts = products.filter(
    (product) => product.company === companyName
  );

  // Função auxiliar para calcular a média das avaliações de um produto
  const getAvgRating = (product: Product): number => {
    const productEvaluations = evaluations.filter(
      (ev) => ev.productId === product.id
    );
    if (productEvaluations.length > 0) {
      return (
        productEvaluations.reduce((acc, ev) => acc + ev.rating, 0) /
        productEvaluations.length
      );
    }
    return 0;
  };

  // Filtra os produtos pela busca, categoria e localização
  const filteredProducts = companyProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = categoryFilter
      ? product.category?.toLowerCase() === categoryFilter.toLowerCase()
      : true;
    const matchesLocation = locationFilter
      ? product.location?.toLowerCase() === locationFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Ordena os produtos se houver valor em sortOrder
  const sortedProducts =
    sortOrder === "high"
      ? [...filteredProducts].sort((a, b) => getAvgRating(b) - getAvgRating(a))
      : sortOrder === "low"
      ? [...filteredProducts].sort((a, b) => getAvgRating(a) - getAvgRating(b))
      : filteredProducts;

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Produtos/Serviços</h1>
        <button
          onClick={() => setIsRegistrationModalOpen(true)}
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Adicionar Produto
        </button>
      </div>

      <div className="flex flex-col gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Filtrar por Categoria"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Filtrar por Localização"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Ordenar por avaliação</option>
            <option value="high">Mais bem avaliados</option>
            <option value="low">Menos bem avaliados</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {sortedProducts.map((product) => {
          const avgRating = getAvgRating(product);
          return (
            <div
              key={product.id}
              className="w-64 p-4 mb-2 bg-white rounded shadow"
            >
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
              <p className="text-sm">Categoria: {product.category}</p>
              <p className="text-sm">Localização: {product.location}</p>
              <p className="text-sm">Descrição: {product.description}</p>
              <p className="text-sm">
                Média: {avgRating ? avgRating.toFixed(1) : "N/A"}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setSelectedProductToView(product)}
                  className="flex-1 p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Ver Avaliações
                </button>
                <button
                  onClick={() => setSelectedProductToEdit(product)}
                  className="flex-1 p-2 text-white bg-blue-700 rounded hover:bg-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="flex-1 p-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isRegistrationModalOpen && (
        <Modal onClose={() => setIsRegistrationModalOpen(false)}>
          <ProductRegistrationModal
            onClose={() => setIsRegistrationModalOpen(false)}
          />
        </Modal>
      )}

      {selectedProductToView && (
        <Modal onClose={() => setSelectedProductToView(null)}>
          <ViewEvaluationsModal
            productId={selectedProductToView.id}
            productName={selectedProductToView.name}
            onClose={() => setSelectedProductToView(null)}
          />
        </Modal>
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
};

export default CompanyProducts;
