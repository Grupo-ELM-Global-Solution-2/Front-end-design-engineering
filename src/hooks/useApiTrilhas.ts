import { useCallback } from 'react';
import { useApiBase } from './useApiBase';
import type { TrilhaPersonalizada } from '../types/trilha';

// Hook específico para trilhas
export function useTrilhas() {
    const { loading, error, fetchApi } = useApiBase();

    const getTrilhas = useCallback(async () => {
        return await fetchApi('/trilhas');
    }, [fetchApi]);

    const getTrilhaById = useCallback(async (trilhaId: string) => {
        return await fetchApi(`/trilhas/${trilhaId}`);
    }, [fetchApi]);

    const saveTrilhaPersonalizada = useCallback(async (trilhaPersonalizada: TrilhaPersonalizada) => {
        return await fetchApi('/trilhasPersonalizadas', {
            method: 'POST',
            body: JSON.stringify(trilhaPersonalizada)
        });
    }, [fetchApi]);

    return {
        loading,
        error,
        getTrilhas,
        getTrilhaById,
        saveTrilhaPersonalizada,
    };
}
