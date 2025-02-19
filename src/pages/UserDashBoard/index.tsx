const UserDashboard = () => {
  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard do Usuário</h1>
      <p className="mb-4">Bem-vindo ao seu painel. Aqui você pode acompanhar suas avaliações e feedbacks.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total de Avaliações</h2>
          <p className="text-2xl">10</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Média de Avaliação</h2>
          <p className="text-2xl">4.2</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Feedbacks Pendentes</h2>
          <p className="text-2xl">2</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
