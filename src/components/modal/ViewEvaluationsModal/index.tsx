// ViewEvaluationsModal.tsx
import { useEvaluations } from "../../../context/EvaluationContext";

interface ViewEvaluationsModalProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

const ViewEvaluationsModal: React.FC<ViewEvaluationsModalProps> = ({
  productId,
  productName,
  onClose,
}) => {
  const { evaluations } = useEvaluations();
  const productEvaluations = evaluations.filter(
    (ev) => ev.productId === productId
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 ">Avaliações - {productName}</h2>
      {productEvaluations.length === 0 ? (
        <p className="text-gray-600">
          Nenhuma avaliação cadastrada para este produto.
        </p>
      ) : (
        productEvaluations.map((ev) => (
          <div key={ev.id} className="p-2 border-b ">
            <div className="flex items-center mb-1 ">
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
            <p className="text-sm">{ev.feedback}</p>
          </div>
        ))
      )}
      <button
        onClick={onClose}
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Fechar
      </button>
    </div>
  );
};

export default ViewEvaluationsModal;
