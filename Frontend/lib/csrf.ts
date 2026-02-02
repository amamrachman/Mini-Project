const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function getXsrfToken(): string | null {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const ensureCsrfCookie = async () => {
    await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
    });
}

export default ensureCsrfCookie