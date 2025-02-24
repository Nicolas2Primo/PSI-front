// Login.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { setRole, setUserEmail } = useAuth();
  const [selectedRole, setSelectedRole] = useState<"user" | "company" | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação simulada – integrar com backend conforme necessário
    if (selectedRole && email && password) {
      setRole(selectedRole);
      setUserEmail(email);
      navigate(
        selectedRole === "user" ? "/user/dashboard" : "/company/dashboard"
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <select
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(e.target.value as "user" | "company")
          }
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Selecione o tipo de usuário</option>
          <option value="user">Usuário</option>
          <option value="company">Empresa</option>
        </select>
        <button
          type="submit"
          className="p-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
