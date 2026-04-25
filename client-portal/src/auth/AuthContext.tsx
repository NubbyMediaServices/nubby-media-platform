import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login as loginApi, register as registerApi } from "@/api/auth";
import { tokenStorage } from "@/lib/storage";

type User = {
  id?: number;
  userId?: number;
  email: string;
  fullName?: string;
  roles?: string[];
};

type LoginInput = {
  usernameOrEmail: string;
  password: string;
};

type RegisterInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = tokenStorage.get();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        tokenStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(input: LoginInput) {
    const response = await loginApi(input);

    if (response.token) {
      tokenStorage.set(response.token);
    }

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser({
        userId: response.userId,
        email: response.email,
        fullName: response.fullName,
        roles: response.roles,
      });
    }
  }

  async function register(input: RegisterInput) {
    // Register only. Do not auto-login and do not call /users/me here.
    await registerApi(input);
  }

  function logout() {
    tokenStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
