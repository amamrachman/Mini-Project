import ensureCsrfCookie, { getXsrfToken } from "./csrf";

type RegisterPayloadType = {
  name: string;
  email: string;
  password: string;
};

type LoginPayloadType = {
  email: string;
  password: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseFetch = async (url: string, payload: unknown) => {
    await ensureCsrfCookie();

    const xsrfToken = getXsrfToken();

    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": xsrfToken ?? "",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Request Failed");
    }

    return response.json();
};

const authRegister = async (payload: RegisterPayloadType) => {
  return baseFetch(`${API_BASE_URL}/register`, payload);
};

const authLogin = async (payload: LoginPayloadType) => {
  return baseFetch(`${API_BASE_URL}/login`, payload)
};

export { authRegister, authLogin };
