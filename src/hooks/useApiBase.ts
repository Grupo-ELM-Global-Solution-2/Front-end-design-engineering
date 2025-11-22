import { useState, useCallback } from 'react';

const API_URL = 'https://reintegrai-api.onrender.com';

export const useApiBase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = useCallback(async (endpoint: string, options?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...options?.headers,
        },
      });

      if (response.status === 404 && (endpoint.includes('/usuario/') || endpoint.includes('/trilhapersonalizada/'))) {
        return null;
      }

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Erro ${response.status} em ${endpoint}: ${errorBody}`);
        throw new Error(`Erro ${response.status} ao ${options?.method || 'buscar'} dados.`);
      }

      // Se a resposta for 204 No Content (DELETE), retorna true
      if (response.status === 204) {
        return options?.method === 'DELETE' ? true : null;
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido na API';
      setError(message);
      console.error(message, err);

      // Retornar valores padrão apropriados
      if (endpoint.includes('usuario') || endpoint.includes('usuarios')) return null;

      // Para POST/PUT/DELETE, retornar null (falha)
      if (options?.method === 'POST' || options?.method === 'PUT' || options?.method === 'DELETE') {
        return null;
      }

      // Para GET que retornam listas
      if (endpoint.includes('trilhas')) return [];
      if (endpoint.includes('progresso')) return [];
      if (endpoint.includes('trilhapersonalizada')) return [];
      return []; // Para listas
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchApi,
  };
};
