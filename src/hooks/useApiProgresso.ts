import { useCallback } from 'react';
import { useApiBase } from './useApiBase';
import type { Progresso } from '../types/progresso';

// Hook específico para progresso dos módulos
export function useProgresso() {
    const { loading, error, fetchApi } = useApiBase();

    const startModule = useCallback(async (userId: number, moduleId: number) => {
        const progressoData: Progresso = {
            idUser: userId,
            status: 'em andamento',
            idModulo: moduleId
        };
        return await fetchApi('/progresso', {
            method: 'POST',
            body: JSON.stringify(progressoData)
        });
    }, [fetchApi]);

    const getProgress = useCallback(async (userId: number, moduleId?: number) => {
        const query = moduleId
            ? `/progresso?idUser=${userId}&idModulo=${moduleId}`
            : `/progresso?idUser=${userId}`;
        return await fetchApi(query);
    }, [fetchApi]);

    const markCompleted = useCallback(async (userId: number, moduleId: number) => {
        // Buscar o progresso existente
        const progressoList = await fetchApi(`/progresso?idUser=${userId}&idModulo=${moduleId}`) as Progresso[];

        if (progressoList && progressoList.length > 0) {
            const progressoId = progressoList[0].id;
            return await fetchApi(`/progresso/${progressoId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'concluido' })
            });
        }
        return null;
    }, [fetchApi]);

    const giveUp = useCallback(async (userId: number, moduleId: number) => {
        // Buscar o progresso existente
        const progressoList = await fetchApi(`/progresso?idUser=${userId}&idModulo=${moduleId}`) as Progresso[];

        if (progressoList && progressoList.length > 0) {
            const progressoId = progressoList[0].id;
            return await fetchApi(`/progresso/${progressoId}`, {
                method: 'DELETE'
            });
        }
        return null;
    }, [fetchApi]);

    return {
        loading,
        error,
        startModule,
        getProgress,
        markCompleted,
        giveUp,
    };
}
