import React, { createContext, useState, useContext } from "react";

export type Role = "user" | "company" | null;

interface AuthContextProps {
  role: Role;
  setRole: (role: Role) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  role: null,
  setRole: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
