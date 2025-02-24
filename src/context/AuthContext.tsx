// AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

export type Role = "user" | "company" | null;

export interface AuthContextProps {
  role: Role;
  companyName: string;
  userEmail: string;
  setRole: (role: Role) => void;
  setCompanyName: (name: string) => void;
  setUserEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: null,
  companyName: "",
  userEmail: "",
  setRole: () => {},
  setCompanyName: () => {},
  setUserEmail: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        role,
        companyName,
        userEmail,
        setRole,
        setCompanyName,
        setUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
