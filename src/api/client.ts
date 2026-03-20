const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const errorMsg = response.status === 429 
        ? 'Límite de la API alcanzado. Espera un minuto.' 
        : `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    return await response.json() as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}