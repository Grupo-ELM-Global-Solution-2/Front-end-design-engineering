import { useState, useEffect } from 'react';
import { useTrilhas } from './useApiTrilhas';
import type { TrilhaPronta, Modulo } from '../types/trilha';

export function useTrilhasDisponiveis() {
    const [trilhasDisponiveis, setTrilhasDisponiveis] = useState<TrilhaPronta[]>([]);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const { getTrilhas, getAllModulos, loading, error } = useTrilhas();

    useEffect(() => {
        const fetchTrilhas = async () => {
            const trilhasAPI = await getTrilhas();

            if (trilhasAPI) {
                // Busca TODOS os módulos de uma vez
                const todosModulos = await getAllModulos();

                // Para cada trilha, filtrar seus módulos pelo idTrilha
                const trilhasComModulos = trilhasAPI.map((trilhaAPI: TrilhaPronta) => {
                    // Filtrar módulos que pertencem a esta trilha
                    const modulosDaTrilha = todosModulos
                        ? todosModulos.filter((modulo: Modulo) => modulo.idTrilha === trilhaAPI.idTrilha)
                        : [];

                    return {
                        idTrilha: trilhaAPI.idTrilha,
                        nome: trilhaAPI.nome,
                        descricao: trilhaAPI.descricao,
                        dificuldade: trilhaAPI.dificuldade,
                        modulos: modulosDaTrilha || []
                    };
                });

                setTrilhasDisponiveis(trilhasComModulos);
            }
        };

        fetchTrilhas();
    }, [getTrilhas, getAllModulos, reloadTrigger]);

    const reload = () => {
        setReloadTrigger(prev => prev + 1);
    };

    return {
        trilhasDisponiveis,
        loading,
        error,
        reload
    };
}
