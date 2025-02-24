// EvaluationContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

export interface Evaluation {
  id: number;
  productId: number;
  rating: number;
  feedback: string;
  companyResponse?: string;
  userResponse?: string;
}

interface EvaluationContextProps {
  evaluations: Evaluation[];
  addEvaluation: (evaluation: Omit<Evaluation, "id">) => void;
  updateEvaluation: (id: number, updatedData: Partial<Evaluation>) => void;
  deleteEvaluation: (id: number) => void;
}

const EvaluationContext = createContext<EvaluationContextProps>({
  evaluations: [],
  addEvaluation: () => {},
  updateEvaluation: () => {},
  deleteEvaluation: () => {},
});

interface EvaluationProviderProps {
  children: ReactNode;
}

export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({
  children,
}) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const addEvaluation = (evaluation: Omit<Evaluation, "id">) => {
    setEvaluations((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...evaluation },
    ]);
  };

  const updateEvaluation = (id: number, updatedData: Partial<Evaluation>) => {
    setEvaluations((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, ...updatedData } : ev))
    );
  };

  const deleteEvaluation = (id: number) => {
    setEvaluations((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <EvaluationContext.Provider
      value={{ evaluations, addEvaluation, updateEvaluation, deleteEvaluation }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluations = () => useContext(EvaluationContext);
