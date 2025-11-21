import type { TrilhaPronta } from '../types/trilha';

export const getDuracaoForTrilha = (modulos: Array<{ duracao: string }>): string => {
    const totalWeeks = modulos.reduce((total, modulo) => {
        const duracao = modulo.duracao.toLowerCase();
        const valor = parseInt(duracao) || 0;

        if (duracao.includes('mes') || duracao.includes('mês')) {
            return total + (valor * 4);
        } else if (duracao.includes('hora')) {
            return total + Math.ceil(valor / 20);
        }
        return total + valor;
    }, 0);
    return `${totalWeeks} semanas`;
};

export const categoriasOptions = [
    { value: 'todos', label: 'Todas as categorias' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'datascience', label: 'Data Science' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'devops', label: 'DevOps' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'gamedev', label: 'Game Development' },
];

export const dificuldades = [
    { value: 'todos', label: 'Todas as dificuldades' },
    { value: 'facil', label: 'Fácil' },
    { value: 'medio', label: 'Médio' },
    { value: 'dificil', label: 'Difícil' }
];

export const filtrarTrilhas = (trilhas: TrilhaPronta[], filtroDificuldade: string, filtroCategoria: string): TrilhaPronta[] => {
    return trilhas.filter(trilha => {
        const nivelMatch = filtroDificuldade === 'todos' || trilha.dificuldade === filtroDificuldade;

        const categoriaMatch = filtroCategoria === 'todos' ||
            (trilha.nome && trilha.nome.toLowerCase().includes(filtroCategoria.toLowerCase()));

        return nivelMatch && categoriaMatch;
    });
};
