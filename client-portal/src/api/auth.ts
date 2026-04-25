import { api } from "@/api/client";
import type { AuthResponse, CurrentUser } from "@/types/api";

export type LoginInput = {
  usernameOrEmail: string;
  password: string;
};

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function login(input: LoginInput): Promise<AuthResponse> {
  const payload = {
    username: input.usernameOrEmail,
    email: input.usernameOrEmail,
    password: input.password
  };

  const { data } = await api.post("/auth/login", payload)
  return data;
}

export async function register(input: RegisterInput): Promise<AuthResponse> {
  const { data } = await api.post("/auth/register", input);
  return data;
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get("/users/me");
  return data;
}
