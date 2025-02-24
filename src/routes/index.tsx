// AppRoutes.tsx (atualizado)
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserDashboard from "../pages/UserDashBoard";
import ProductManagement from "../pages/ProductManagement";
import CompanyDashboard from "../pages/CompanyDashboard";
import CompanyReviews from "../pages/CompanyReviews";
import CompanyFeedbacks from "../pages/CompanyFeedbacks";
import CompanyProducts from "../pages/CompanyProducts";
import CompanySettings from "../pages/CompanySettings";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute"; // Importa a rota pública
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { role } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Páginas Públicas */}
        <Route
          index
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

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
          <Route path="catalog" element={<ProductManagement />} />
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
          <Route path="settings" element={<CompanySettings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
