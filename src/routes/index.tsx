import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashBoard";
import UserReviews from "../pages/UserReviews";
import ProductCatalog from "../pages/ProductCatalog";
import ProductEvaluationsPage from "../pages/ProductEvaluations"; // Nova rota de avaliações
// Rotas para empresas
import CompanyDashboard from "../pages/CompanyDashboard";
import CompanyReviews from "../pages/CompanyReviews";
import CompanyFeedbacks from "../pages/CompanyFeedbacks";
import CompanyProducts from "../pages/CompanyProducts";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { role } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Páginas Públicas */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Rotas para Usuários */}
        <Route
          path="user"
          element={
            <ProtectedRoute>
              {role === "user" ? <Outlet /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboard />} />
          {/* Removemos "reviews" e incluímos "evaluations" */}
          <Route path="evaluations" element={<ProductEvaluationsPage />} />
          <Route path="catalog" element={<ProductCatalog />} />
          <Route path="reviews" element={<UserReviews />} />
        </Route>

        {/* Rotas para Empresas */}
        <Route
          path="company"
          element={
            <ProtectedRoute>
              {role === "company" ? <Outlet /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="reviews" element={<CompanyReviews />} />
          <Route path="feedbacks" element={<CompanyFeedbacks />} />
          <Route path="products" element={<CompanyProducts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
