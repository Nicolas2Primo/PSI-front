// CompanySettings.tsx
import { useState } from "react";

const CompanySettings = () => {
  const [responseTime, setResponseTime] = useState("");
  const [criteria, setCriteria] = useState("");

  const handleSave = () => {
    // Aqui você pode integrar com um backend ou armazenar em um contexto específico
    alert("Configurações salvas!");
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Configurações da Empresa</h1>
      <div className="flex flex-col gap-4 max-w-lg">
        <input
          type="text"
          placeholder="Tempo de Resposta (ex: 24h)"
          value={responseTime}
          onChange={(e) => setResponseTime(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Critérios de Feedback"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default CompanySettings;
