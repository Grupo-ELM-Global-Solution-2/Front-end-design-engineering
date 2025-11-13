import { useCallback } from 'react';
import { useApiBase } from './useApiBase';

// Hook específico para trilhas prontas
export function useTrilhas() {
    const { loading, error, fetchApi } = useApiBase();

    // Busca todas as TRILHAS PRONTAS
    const getTrilhas = useCallback(async () => {
        return await fetchApi('/trilhas');
    }, [fetchApi]);

    // Busca uma TRILHA PRONTA específica
    const getTrilhaById = useCallback(async (trilhaId: string) => {
        return await fetchApi(`/trilhas/${trilhaId}`);
    }, [fetchApi]);

    return {
        loading,
        error,
        getTrilhas,
        getTrilhaById
    };
}
