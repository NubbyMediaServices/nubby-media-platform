import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getCurrentUser, login as loginRequest, register as registerRequest } from "@/api/auth";
import { tokenStorage } from "@/lib/storage";
import type { CurrentUser } from "@/types/api";

type AuthContextValue = {
  user: CurrentUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (input: { usernameOrEmail: string; password: string }) => Promise<void>;
  register: (input: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getTokenFromResponse(data: Record<string, unknown>) {
  return (
    (typeof data.token === "string" && data.token) ||
    (typeof data.jwt === "string" && data.jwt) ||
    (typeof data.accessToken === "string" && data.accessToken) ||
    ""
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(tokenStorage.get());
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  async function refreshUser() {
    const nextUser = await getCurrentUser();
    setUser(nextUser);
  }

  useEffect(() => {
    async function bootstrap() {
      const existingToken = tokenStorage.get();
      if (!existingToken) {
        setIsBootstrapping(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        tokenStorage.clear();
        setToken(null);
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    }

    void bootstrap();
  }, []);

  async function login(input: { usernameOrEmail: string; password: string }) {
    const data = await loginRequest(input);
    const nextToken = getTokenFromResponse(data as Record<string, unknown>);
    if (!nextToken) {
      throw new Error("No token returned from login.");
    }

    tokenStorage.set(nextToken);
    setToken(nextToken);
    await refreshUser();
  }

  async function register(input: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const data = await registerRequest(input);
    const nextToken = getTokenFromResponse(data as Record<string, unknown>);
    if (nextToken) {
      tokenStorage.set(nextToken);
      setToken(nextToken);
      await refreshUser();
    }
  }

  function logout() {
    tokenStorage.clear();
    setToken(null);
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isBootstrapping,
      login,
      register,
      logout,
      refreshUser
    }),
    [user, token, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return value;
}
