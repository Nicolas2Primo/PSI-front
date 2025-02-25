import React, { useState, FormEvent } from "react";
import { Evaluation, useEvaluations } from "../../../context/EvaluationContext";

interface CompanyFeedbackModalProps {
  evaluation: Evaluation;
  onClose: () => void;
}

const CompanyFeedbackModal: React.FC<CompanyFeedbackModalProps> = ({
  evaluation,
  onClose,
}) => {
  const { updateEvaluation } = useEvaluations();
  const [companyResponse, setCompanyResponse] = useState(
    evaluation.companyResponse || ""
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateEvaluation(evaluation.id, { companyResponse });
    onClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editar Feedback Respondido</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <textarea
          value={companyResponse}
          onChange={(e) => setCompanyResponse(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-black text-white rounded">
          Salvar
        </button>
      </form>
      <button onClick={onClose} className="mt-4 p-2 bg-gray-300 rounded">
        Cancelar
      </button>
    </div>
  );
};

export default CompanyFeedbackModal;
