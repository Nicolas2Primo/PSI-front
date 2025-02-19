import { useState, FormEvent } from "react";
import { useEvaluations } from "../../../context/EvaluationContext";

interface EvaluateFeedbackModalProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

const EvaluateFeedbackModal: React.FC<EvaluateFeedbackModalProps> = ({ productId, productName, onClose }) => {
  const { addEvaluation } = useEvaluations();
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addEvaluation({ productId, rating, feedback });
    onClose();
  };

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">Avaliar {productName}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-lg gap-4">
        <div>
          <label className="block mb-2">Nota:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value={0}>Selecione uma nota</option>
            <option value={1}>1 - Ruim</option>
            <option value={2}>2 - Regular</option>
            <option value={3}>3 - Bom</option>
            <option value={4}>4 - Muito Bom</option>
            <option value={5}>5 - Excelente</option>
          </select>
        </div>
        <textarea
          placeholder="Deixe seu feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 text-white bg-black rounded hover:bg-gray-800"
        >
          Enviar Avaliação e Feedback
        </button>
      </form>
    </div>
  );
};

export default EvaluateFeedbackModal;
