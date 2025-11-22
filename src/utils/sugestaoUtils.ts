import type { Sugestao } from '../types/sugestao';

export const tipos = [
    { value: 'todos', label: 'Todos os tipos' },
    { value: 'vídeo', label: 'Vídeos' },
    { value: 'artigo', label: 'Artigos' },
    { value: 'curso', label: 'Cursos' },
    { value: 'projeto', label: 'Projetos' }
];

export const dificuldades = [
    { value: 'todos', label: 'Todos os níveis' },
    { value: 'facil', label: 'Fácil' },
    { value: 'medio', label: 'Médio' },
    { value: 'dificil', label: 'Difícil' }
];

export const formatarDificuldade = (dificuldade: string) => {
    const map: Record<string, string> = {
        'facil': 'Fácil',
        'medio': 'Médio',
        'dificil': 'Difícil'
    };
    return map[dificuldade?.toLowerCase()] || dificuldade;
};

export const getTipoIcon = (tipo: string) => {
    const tipoLower = tipo?.toLowerCase() || '';
    switch (tipoLower) {
        case 'vídeo': return '🎥';
        case 'artigo': return '📄';
        case 'curso': return '🎓';
        case 'projeto': return '⚙️';
        case 'documentação': return '📚';
        default: return '📚';
    }
};

export const getTipoLabel = (tipo: string) => {
    const tipoLower = tipo?.toLowerCase() || '';
    switch (tipoLower) {
        case 'vídeo': return 'Vídeo';
        case 'artigo': return 'Artigo';
        case 'curso': return 'Curso';
        case 'projeto': return 'Projeto';
        case 'documentação': return 'Documentação';
        default: return tipo;
    }
};

export const filtrarSugestoes = (sugestoes: Sugestao[], filtroTipo: string, filtroDificuldade: string): Sugestao[] => {
    return sugestoes.filter(sugestao => {
        const tipoMatch = filtroTipo === 'todos' || (sugestao.tipo && sugestao.tipo.toLowerCase() === filtroTipo.toLowerCase());
        const nivelMatch = filtroDificuldade === 'todos' || (sugestao.dificuldade && sugestao.dificuldade.toLowerCase() === filtroDificuldade.toLowerCase());
        return tipoMatch && nivelMatch;
    });
};
