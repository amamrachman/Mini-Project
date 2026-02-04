import { LoginPayload, RegisterPayload } from "@/types/Auth";
import ensureCsrfCookie, { getXsrfToken } from "./csrf";

type FetchOptions = {
  method?: string;
  body?: unknown;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (url: string, options: FetchOptions = {}) => {
  await ensureCsrfCookie();
  const xsrfToken = getXsrfToken();

  const config: RequestInit = {
    method: options.method || "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
    },
  };

  if (options.body !== undefined) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  return response.json();
};

export const getCurrentUser = async () => {
  await ensureCsrfCookie();
  const res = await fetch(`${API_BASE_URL}/api/user`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

const authRegister = async (payload: RegisterPayload) => {
  return apiFetch(`${API_BASE_URL}/register`, {
    method: "POST",
    body: payload,
  });
};

const authLogin = async (payload: LoginPayload) => {
  return apiFetch(`${API_BASE_URL}/login`, {
    method: "POST",
    body: payload,
  });
};

export { authRegister, authLogin };
