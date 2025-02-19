const CompanyDashboard = () => {
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard da Empresa</h1>
      <p className="mb-4">Veja as métricas e desempenho da sua empresa.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Avaliações Recebidas</h2>
          <p className="text-2xl">25</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Índice de Satisfação</h2>
          <p className="text-2xl">4.0</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Feedbacks Respondidos</h2>
          <p className="text-2xl">18</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
