import { useState, useEffect } from 'react';
import { useTrilhas } from './useApiTrilhas';
import type { TrilhaPronta } from '../types/trilha';

export function useTrilhasDisponiveis() {
    const [trilhasDisponiveis, setTrilhasDisponiveis] = useState<TrilhaPronta[]>([]);
    const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos');
    const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');

    const { getTrilhas, loading, error } = useTrilhas();

    useEffect(() => {
        const fetchTrilhas = async () => {
            const trilhasAPI = await getTrilhas();

            if (trilhasAPI) {
                const trilhas: TrilhaPronta[] = trilhasAPI.map((trilhaAPI: TrilhaPronta) => ({
                    id: trilhaAPI.id,
                    nome: trilhaAPI.nome,
                    descricao: trilhaAPI.descricao,
                    dificuldade: trilhaAPI.dificuldade,
                    modulos: trilhaAPI.modulos,
                    icone: trilhaAPI.icone
                }));

                setTrilhasDisponiveis(trilhas);
            }
        };

        fetchTrilhas();
    }, [getTrilhas]);

    const trilhasFiltradas = trilhasDisponiveis.filter(trilha => {
        const nivelMatch = filtroDificuldade === 'todos' || trilha.dificuldade === filtroDificuldade;
        const categoriaMatch = filtroCategoria === 'todos' || trilha.nome.toLowerCase().includes(filtroCategoria);
        return nivelMatch && categoriaMatch;
    });

    return {
        trilhasDisponiveis: trilhasFiltradas,
        filtroDificuldade,
        setFiltroDificuldade,
        filtroCategoria,
        setFiltroCategoria,
        loading,
        error
    };
}
