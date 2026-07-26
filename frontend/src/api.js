export const API_BASE_URL = "https://wealthy-app.vercel.app";

export const apiUrl = (path) => `${API_BASE_URL}/api/v1${path.startsWith("/") ? path : `/${path}`}`;
