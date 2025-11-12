import { useState, useCallback } from 'react';

const API_URL = 'http://localhost:3001';

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

      if (response.status === 404 && endpoint.includes('/usuarios/')) {
        return null;
      }

      if (!response.ok) {
        const errorBody = await response.text();
        if (!(response.status === 404 && endpoint.includes('/usuarios/'))) {
          console.error(`Erro ${response.status} em ${endpoint}: ${errorBody}`);
        }
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
      if (endpoint.includes('usuarios')) return null;
      if (endpoint.includes('trilhas')) return [];
      if (endpoint.includes('progresso')) return [];
      if (endpoint.includes('trilhasPersonalizadas')) return [];
      if (options?.method === 'DELETE') return false;
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
