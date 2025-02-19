import { createContext, useContext, useState, ReactNode } from "react";

export interface Evaluation {
  id: number;
  productId: number;
  rating: number;
  feedback: string;
}

interface EvaluationContextProps {
  evaluations: Evaluation[];
  addEvaluation: (evaluation: Omit<Evaluation, "id">) => void;
}

const EvaluationContext = createContext<EvaluationContextProps>({
  evaluations: [],
  addEvaluation: () => {}
});

interface EvaluationProviderProps {
  children: ReactNode;
}

export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const addEvaluation = (evaluation: Omit<Evaluation, "id">) => {
    setEvaluations((prev) => [
      ...prev,
      { id: prev.length ? prev[prev.length - 1].id + 1 : 1, ...evaluation }
    ]);
  };

  return (
    <EvaluationContext.Provider value={{ evaluations, addEvaluation }}>
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluations = () => useContext(EvaluationContext);
