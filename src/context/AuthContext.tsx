import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  AuthUser,
  clearToken,
  getCurrentUser,
  getPrimaryRole,
  getToken,
  login as loginRequest,
  saveToken,
  UserRole,
} from "../services/authService";

interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(getToken());
  const [isLoading, setIsLoading] = useState(true);

  const role = getPrimaryRole(user);

  async function refreshUser() {
    const existingToken = getToken();

    if (!existingToken) {
      setUser(null);
      setToken(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setToken(existingToken);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      clearToken();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(usernameOrEmail: string, password: string) {
    const response = await loginRequest(usernameOrEmail, password);

    if (!response.token) {
      throw new Error("No token returned from login.");
    }

    saveToken(response.token);
    setToken(response.token);

    if (response.user) {
      setUser(response.user);
    } else {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
  }

  function logout() {
    clearToken();
    setUser(null);
    setToken(null);
    window.location.href = "/";
  }

  useEffect(() => {
    refreshUser();
  }, []);

  const value: AuthContextValue = {
    user,
    role,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}