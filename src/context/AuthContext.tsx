import { createContext, useState, useContext, ReactNode } from "react";

export type Role = "user" | "company" | null;

interface AuthContextProps {
  role: Role;
  companyName: string;
  setRole: (role: Role) => void;
  setCompanyName: (name: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: null,
  companyName: "",
  setRole: () => {},
  setCompanyName: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [companyName, setCompanyName] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{ role, companyName, setRole, setCompanyName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
