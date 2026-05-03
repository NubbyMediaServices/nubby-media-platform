import { apiRequest } from "./api";

export type UserRole = "ADMIN" | "STAFF" | "CLIENT" | "USER";

export interface LoginRequest {
  usernameOrEmail: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: AuthUser;
}

export interface BackendRoleObject {
  name?: string;
  authority?: string;
  role?: string;
}

export interface AuthUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  role?: string | BackendRoleObject;
  roles?: Array<string | BackendRoleObject>;
  authorities?: Array<string | BackendRoleObject>;
}

export async function login(
  usernameOrEmail: string,
  password: string
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      usernameOrEmail,
      email: usernameOrEmail,
      password,
    }),
  });
}

export async function getCurrentUser(): Promise<AuthUser> {
  return apiRequest<AuthUser>("/api/users/me", {
    method: "GET",
  });
}

export function saveToken(token: string): void {
  localStorage.setItem("scmsp_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("scmsp_token");
}

export function clearToken(): void {
  localStorage.removeItem("scmsp_token");
}

function roleValueToString(value: string | BackendRoleObject | undefined): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value.name || value.authority || value.role || "";
}

export function normalizeRole(
  value: string | BackendRoleObject | undefined
): UserRole | null {
  const rawRole = roleValueToString(value)
    .replace("ROLE_", "")
    .trim()
    .toUpperCase();

  if (rawRole === "ADMIN") return "ADMIN";
  if (rawRole === "STAFF") return "STAFF";
  if (rawRole === "CLIENT") return "CLIENT";
  if (rawRole === "USER") return "USER";

  return null;
}

export function getUserRoles(user: AuthUser | null): UserRole[] {
  if (!user) return [];

  const roleSources: Array<string | BackendRoleObject | undefined> = [
    user.role,
    ...(user.roles || []),
    ...(user.authorities || []),
  ];

  const normalizedRoles = roleSources
    .map((role) => normalizeRole(role))
    .filter((role): role is UserRole => Boolean(role));

  return Array.from(new Set(normalizedRoles));
}

export function getPrimaryRole(user: AuthUser | null): UserRole | null {
  const roles = getUserRoles(user);
  return roles[0] || null;
}

export function userHasRole(
  user: AuthUser | null,
  allowedRoles: UserRole[]
): boolean {
  const userRoles = getUserRoles(user);
  return userRoles.some((role) => allowedRoles.includes(role));
}
