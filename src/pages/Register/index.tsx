import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"user" | "company" | "">("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      setRole(selectedRole);
      navigate(selectedRole === "user" ? "/user/dashboard" : "/company/dashboard");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Cadastro</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-xs">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as "user" | "company")}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione o tipo de cadastro</option>
          <option value="user">Usuário</option>
          <option value="company">Empresa</option>
        </select>
        <button type="submit" className="p-2 bg-black text-white rounded hover:bg-gray-800">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;
