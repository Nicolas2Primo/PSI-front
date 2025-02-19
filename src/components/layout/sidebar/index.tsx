import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Sidebar = () => {
  const { role } = useAuth();

  return (
    <div className="flex flex-col items-center w-40 h-full pt-4 text-white bg-black shadow-md">
      <div className="flex flex-col gap-8 text-sm">
        {role === "user" && (
          <>
            <Link to="/user/dashboard" className="hover:text-yellow-400">
              Dashboard
            </Link>
            <Link to="/user/evaluations" className="hover:text-yellow-400">
              Avaliações
            </Link>
            <Link to="/user/catalog" className="hover:text-yellow-400">
              Catálogo
            </Link>
          </>
        )}
        {role === "company" && (
          <>
            <Link to="/company/dashboard" className="hover:text-yellow-400">
              Dashboard
            </Link>
            <Link to="/company/reviews" className="hover:text-yellow-400">
              Avaliações
            </Link>
            <Link to="/company/feedbacks" className="hover:text-yellow-400">
              Feedbacks
            </Link>
            <Link to="/company/products" className="hover:text-yellow-400">
              Produtos/Serviços
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
