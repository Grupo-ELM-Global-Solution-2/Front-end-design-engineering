import { useState, useEffect } from 'react';
import { useProgresso } from './useApiProgresso';
import { useApiBase } from './useApiBase';
import type { TrilhaPronta } from '../types/trilha';

type ModuleStatus = 'nao-iniciado' | 'em-andamento' | 'concluido';

export function useProgressoTrilha(selectedTrilha: TrilhaPronta | null) {
    const [moduleStatuses, setModuleStatuses] = useState<Map<number, ModuleStatus>>(new Map());

    const { startModule, markCompleted, giveUp } = useProgresso();
    const { fetchApi } = useApiBase();

    // Carregar progresso dos módulos quando uma trilha é selecionada
    useEffect(() => {
        const loadProgress = async () => {
            if (selectedTrilha) {
                try {
                    const userId = localStorage.getItem('userId');
                    const progressData = await fetchApi(`/progresso?idUser=${userId}`);
                    if (progressData) {
                        const newStatuses = new Map<number, ModuleStatus>();

                        // Inicializar todos os módulos como não-iniciados
                        selectedTrilha.modulos.forEach((_, index) => {
                            newStatuses.set(index, 'nao-iniciado');
                        });

                        // Filtrar progresso apenas para os módulos da trilha atual
                        const trilhaModuleIds = new Set(selectedTrilha.modulos.map((modulo: { id: number }) => modulo.id));

                        // Agrupar progresso por módulo para pegar o status mais recente
                        const progressByModule = new Map<number, { id: number; idModulo: number; status: string }>();

                        progressData.forEach((progress: { id: number; idModulo: number; status: string }) => {
                            const moduleId = progress.idModulo;
                            // Só considerar progresso para módulos desta trilha
                            if (trilhaModuleIds.has(moduleId)) {
                                // Se já existe um registro para este módulo, mantém o mais recente
                                if (!progressByModule.has(moduleId) || (progressByModule.get(moduleId)?.id ?? 0) < progress.id) {
                                    progressByModule.set(moduleId, progress);
                                }
                            }
                        });

                        // Aplicar os status mais recentes apenas para módulos desta trilha
                        progressByModule.forEach((progress) => {
                            // Encontrar o índice do módulo na trilha atual
                            const moduleIndex = selectedTrilha.modulos.findIndex((modulo: { id: number }) => modulo.id === progress.idModulo);
                            if (moduleIndex !== -1) {
                                if (progress.status === 'em andamento') {
                                    newStatuses.set(moduleIndex, 'em-andamento');
                                } else if (progress.status === 'concluido') {
                                    newStatuses.set(moduleIndex, 'concluido');
                                }
                            }
                        });

                        setModuleStatuses(newStatuses);
                    }
                } catch (error) {
                    console.error('Erro ao carregar progresso:', error);
                }
            } else {
                // Limpar status quando nenhuma trilha está selecionada
                setModuleStatuses(new Map());
            }
        };

        loadProgress();
    }, [selectedTrilha, fetchApi]);

    const handleStartModule = async (index: number) => {
        setModuleStatuses(prev => new Map(prev).set(index, 'em-andamento'));
        const result = await startModule(1, (index + 1));

        if (!result) {
            console.error('Erro ao salvar progresso');
            // Reverter o estado em caso de erro
            setModuleStatuses(prev => {
                const newMap = new Map(prev);
                newMap.set(index, 'nao-iniciado');
                return newMap;
            });
        }
    };

    const handleMarkCompleted = async (index: number) => {
        const result = await markCompleted(1, (index + 1));

        if (result) {
            setModuleStatuses(prev => new Map(prev).set(index, 'concluido'));
            console.log('Módulo marcado como concluído com sucesso');
        } else {
            console.error('Erro ao salvar conclusão');
        }
    };

    const handleUnmarkCompleted = async (index: number) => {
        // Primeiro, atualizamos o estado local para não-iniciado
        setModuleStatuses(prev => new Map(prev).set(index, 'nao-iniciado'));

        // Implementar lógica para desmarcar no backend
        // Como não temos um endpoint específico para desmarcar,
        // podemos deletar o registro de progresso concluído
        try {
            const result = await giveUp(1, (index + 1));
            if (result) {
                console.log('Módulo desmarcado como concluído com sucesso');
            } else {
                console.error('Erro ao desmarcar módulo concluído');
                // Reverter o estado local em caso de erro
                setModuleStatuses(prev => new Map(prev).set(index, 'concluido'));
            }
        } catch (error) {
            console.error('Erro ao desmarcar módulo concluído:', error);
            // Reverter o estado local em caso de erro
            setModuleStatuses(prev => new Map(prev).set(index, 'concluido'));
        }
    };

    const handleGiveUp = async (index: number) => {
        setModuleStatuses(prev => new Map(prev).set(index, 'nao-iniciado'));

        const result = await giveUp(1, (index + 1));

        if (!result) {
            console.error('Erro ao salvar desistência');
        }
    };

    const getModuleStatus = (index: number): ModuleStatus => {
        return moduleStatuses.get(index) || 'nao-iniciado';
    };

    return {
        getModuleStatus,
        handleStartModule,
        handleMarkCompleted,
        handleUnmarkCompleted,
        handleGiveUp
    };
}
