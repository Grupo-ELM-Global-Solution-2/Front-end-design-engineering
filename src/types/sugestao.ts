export interface Sugestao {
    idSugestoes: number;
    titulo: string;
    tipo: 'video' | 'artigo' | 'curso' | 'projeto';
    descricao: string;
    duracao: string;
    dificuldade: string;
    link: string;
}
