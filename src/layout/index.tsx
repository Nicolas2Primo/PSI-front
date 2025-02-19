import { Outlet } from "react-router";
import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { role } = useAuth();
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-200 ">
      <Navbar />

      <main className={` w-full h-screen flex pb-20  `}>
        {role && <Sidebar />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
