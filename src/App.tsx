import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { EvaluationProvider } from "./context/EvaluationContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <EvaluationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </EvaluationProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
