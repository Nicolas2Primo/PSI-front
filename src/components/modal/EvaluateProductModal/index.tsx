// EvaluateProductModal.tsx
import { useState } from "react";
import { useEvaluations } from "../../../context/EvaluationContext";

interface EvaluateProductModalProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

const EvaluateProductModal: React.FC<EvaluateProductModalProps> = ({
  productId,
  productName,
  onClose,
}) => {
  const { addEvaluation } = useEvaluations();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvaluation({ productId, rating, feedback });
    setRating(0);
    setFeedback("");
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Avaliar - {productName}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="font-bold">Nota (1 a 5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Seu feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="p-2 border rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Enviar Avaliação
        </button>
      </form>
      <button
        onClick={onClose}
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Fechar
      </button>
    </div>
  );
};

export default EvaluateProductModal;
