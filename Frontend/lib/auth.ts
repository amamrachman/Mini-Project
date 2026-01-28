const API_URL = "http://localhost:8000";

export async function getCsrfCookie() {
  console.log("Getting CSRF cookie...");
  await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
  console.log("CSRF cookie obtained");
}

export async function login(email: string, password: string) {
  console.log("Login attempt for:", email);
  await getCsrfCookie();

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    console.error("Login failed with status:", res.status);
    throw new Error("Login gagal");
  }
  console.log("Login successful");
}

export async function getUser() {
  console.log("Fetching user data...");
  const res = await fetch(`${API_URL}/api/user`, {
    credentials: "include",
  });

  if (!res.ok) {
    console.warn("Failed to fetch user");
    return null;
  }
  console.log("User data retrieved");
  return res.json();
}
