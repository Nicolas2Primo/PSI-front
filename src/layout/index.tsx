import { Outlet } from "react-router";
import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/sidebar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="p-4 pt-20 ml-24 ">
        {/* Aqui serão renderizadas as páginas filhas */}
        <Outlet />
      </main>

      <footer>{/* Conteúdo do rodapé */}</footer>
    </div>
  );
};

export default Layout;
