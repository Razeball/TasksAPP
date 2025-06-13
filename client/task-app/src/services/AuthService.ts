import api from "./api";
import type { AuthPayload } from "../types";

// Throws error if registration fails
export async function register(user: AuthPayload): Promise<void> {
  await api.post(`/auth/register`, user);
}

// Returns token on success, throws error on failure
export async function log(user: AuthPayload): Promise<string> {
  const response = await api.post<{ token: string }>(`/auth/login`, user);
  return response.data.token;
}

// Returns true on success, throws error on failure
export async function checkUser(user: AuthPayload): Promise<boolean> {
  const res = await api.post('/auth/check', user);
  return res.status === 200;
}

export async function editUser(user: AuthPayload): Promise<void> {
  await api.put('/auth/update', user);
}