import { useCallback } from 'react';
import { useApiBase } from './useApiBase';

// Hook específico para sugestões
export function useSugestoes() {
    const { loading, error, fetchApi } = useApiBase();

    // Busca todas as sugestões
    const getSugestoes = useCallback(async () => {
        return await fetchApi('/sugestoes');
    }, [fetchApi]);

    return {
        loading,
        error,
        getSugestoes
    };
}
