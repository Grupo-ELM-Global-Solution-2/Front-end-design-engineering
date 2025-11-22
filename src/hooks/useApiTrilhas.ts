import { useCallback } from 'react';
import { useApiBase } from './useApiBase';

// Hook específico para trilhas prontas
export function useTrilhas() {
    const { loading, error, fetchApi } = useApiBase();

    // Busca todas as TRILHAS PRONTAS
    const getTrilhas = useCallback(async () => {
        return await fetchApi('/trilha');
    }, [fetchApi]);

    // Busca uma TRILHA PRONTA específica
    const getTrilhaById = useCallback(async (trilhaId: number) => {
        return await fetchApi(`/trilha/${trilhaId}`);
    }, [fetchApi]);

    // Busca TODOS os módulos de uma vez
    const getAllModulos = useCallback(async () => {
        return await fetchApi('/modulo');
    }, [fetchApi]);

    // Busca módulos de uma trilha específica (deprecated - usar getAllModulos)
    const getModulosByTrilha = useCallback(async (trilhaId: number) => {
        return await fetchApi(`/modulo/trilha/${trilhaId}`);
    }, [fetchApi]);

    return {
        loading,
        error,
        getTrilhas,
        getTrilhaById,
        getAllModulos,
        getModulosByTrilha
    };
}
