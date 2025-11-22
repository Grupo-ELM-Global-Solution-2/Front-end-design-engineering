import { useState, useEffect, useCallback } from 'react';
import { useProgresso } from './useApiProgresso';
import { getUserId } from '../utils/localStorageUtils';
import type { TrilhaPronta } from '../types/trilha';

interface ProgressoData {
    idProgresso: number;
    idModulo: number;
    status: number;
}

export function useProgressoTrilha(selectedTrilha: TrilhaPronta | null) {
    const [moduleStatuses, setModuleStatuses] = useState<Map<number, number>>(new Map());
    const [moduleProgressIds, setModuleProgressIds] = useState<Map<number, number>>(new Map());

    const { getProgress, upsertProgress, deleteProgress } = useProgresso();

    const loadProgress = useCallback(async () => {
        const idUser = getUserId();

        if (!selectedTrilha || !idUser) {
            setModuleStatuses(new Map());
            setModuleProgressIds(new Map());
            return;
        }

        try {
            const progressData = await getProgress(idUser);

            if (progressData) {
                const newStatuses = new Map<number, number>();
                const newProgressIds = new Map<number, number>();
                const trilhaModuleIds = new Set((selectedTrilha.modulos || []).map(m => m.idModulo));

                // Agrupar progresso por módulo (pegar o mais recente)
                const progressByModule = new Map<number, ProgressoData>();
                progressData.forEach((p: ProgressoData) => {
                    if (trilhaModuleIds.has(p.idModulo)) {
                        if (!progressByModule.has(p.idModulo) || (progressByModule.get(p.idModulo)?.idProgresso ?? 0) < p.idProgresso) {
                            progressByModule.set(p.idModulo, p);
                        }
                    }
                });

                // Mapear para os índices da trilha atual
                progressByModule.forEach((p) => {
                    const index = (selectedTrilha.modulos || []).findIndex(m => m.idModulo === p.idModulo);
                    if (index !== -1) {
                        newProgressIds.set(index, p.idProgresso);
                        newStatuses.set(index, p.status);
                    }
                });

                setModuleStatuses(newStatuses);
                setModuleProgressIds(newProgressIds);
                console.log('✅ Progresso carregado');
            }
        } catch (error) {
            console.error('Erro ao carregar progresso:', error);
        }
    }, [selectedTrilha, getProgress]);

    useEffect(() => {
        loadProgress();
    }, [loadProgress]);

    const updateStatus = async (index: number, newStatus: number) => {
        const idUser = getUserId();

        if (!idUser) {
            alert("Você precisa estar logado para salvar seu progresso!");
            return;
        }

        if (!selectedTrilha) return;
        const modulo = selectedTrilha.modulos?.[index];
        if (!modulo) return;

        setModuleStatuses(prev => new Map(prev).set(index, newStatus));

        const existingProgressId = moduleProgressIds.get(index);

        // Se status for 0, deletamos o progresso
        if (newStatus === 0) {
            if (existingProgressId) {
                const result = await deleteProgress(existingProgressId);
                if (result !== null) {
                    setModuleProgressIds(prev => {
                        const newMap = new Map(prev);
                        newMap.delete(index);
                        return newMap;
                    });
                }
            }
            return;
        }

        // Caso contrário, fazemos upsert
        const result = await upsertProgress({
            idProgresso: existingProgressId,
            idUser,
            idModulo: modulo.idModulo,
            status: newStatus
        });

        if (result && result.idProgresso) {
            setModuleProgressIds(prev => new Map(prev).set(index, result.idProgresso));
        } else if (result) {
            console.warn('⚠️ Upsert sem ID, recarregando...');
            await loadProgress();
        } else {
            console.error('Erro ao salvar progresso');
            // Reverter
            setModuleStatuses(prev => {
                const newMap = new Map(prev);
                newMap.delete(index);
                return newMap;
            });
        }
    };

    return {
        getModuleStatus: (index: number) => moduleStatuses.get(index) || 0,
        handleStartModule: (index: number) => updateStatus(index, 50),
        handleMarkCompleted: (index: number) => updateStatus(index, 100),
        handleUnmarkCompleted: (index: number) => updateStatus(index, 0),
        handleGiveUp: (index: number) => updateStatus(index, 0)
    };
}
