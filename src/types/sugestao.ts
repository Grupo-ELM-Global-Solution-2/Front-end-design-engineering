export interface Sugestao {
    id: number;
    titulo: string;
    tipo: 'video' | 'artigo' | 'curso' | 'projeto';
    descricao: string;
    duracao: string;
    dificuldade: string;
    thumbnail: string;
    link: string;
}

export const tipos = [
    { value: 'todos', label: 'Todos os tipos' },
    { value: 'video', label: 'Vídeos' },
    { value: 'artigo', label: 'Artigos' },
    { value: 'curso', label: 'Cursos' },
    { value: 'projeto', label: 'Projetos' }
];

export const dificuldades = [
    { value: 'todos', label: 'Todos os níveis' },
    { value: 'Iniciante', label: 'Iniciante' },
    { value: 'Intermediário', label: 'Intermediário' },
    { value: 'Avançado', label: 'Avançado' }
];

export const getTipoIcon = (tipo: string) => {
    switch (tipo) {
        case 'video': return '🎥';
        case 'artigo': return '📄';
        case 'curso': return '🎓';
        case 'projeto': return '⚙️';
        default: return '📚';
    }
};

export const getTipoLabel = (tipo: string) => {
    switch (tipo) {
        case 'video': return 'Vídeo';
        case 'artigo': return 'Artigo';
        case 'curso': return 'Curso';
        case 'projeto': return 'Projeto';
        default: return tipo;
    }
};

export const filtrarSugestoes = (sugestoes: Sugestao[], filtroTipo: string, filtroDificuldade: string): Sugestao[] => {
    return sugestoes.filter(sugestao => {
        const tipoMatch = filtroTipo === 'todos' || sugestao.tipo === filtroTipo;
        const nivelMatch = filtroDificuldade === 'todos' || sugestao.dificuldade === filtroDificuldade;
        return tipoMatch && nivelMatch;
    });
};
