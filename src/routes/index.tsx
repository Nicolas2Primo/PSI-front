import { Routes, Route } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* A rota raiz renderiza o Layout que por sua vez renderiza as rotas filhas via Outlet */}
      <Route path="/" element={<Layout />}>
        {/* Página inicial */}
        <Route index element={<Home />} />
        {/* Outras rotas podem ser definidas aqui */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
