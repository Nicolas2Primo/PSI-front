import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const { role, setRole } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <div className="fixed flex items-center justify-between w-screen h-16 text-white bg-black px-7 shadow-md z-10">
      <Link to="/" className="text-xl font-bold">TrustScore</Link>
      <div className="relative flex gap-8">
        {role === null ? (
          <>
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
            <Link to="/register" className="hover:text-yellow-400">Register</Link>
          </>
        ) : (
          <>
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsUserOpen(false);
                }}
                className="hover:text-yellow-400"
              >
                Notificações
              </button>
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-20">
                  <div className="p-2">
                    <p className="text-sm">Nenhuma notificação</p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => {
                  setIsUserOpen(!isUserOpen);
                  setIsNotifOpen(false);
                }}
                className="hover:text-yellow-400"
              >
                Usuário
              </button>
              {isUserOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-20">
                  <div className="p-2 border-b">
                    <p className="text-sm">Informações do usuário</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left p-2 text-sm hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
