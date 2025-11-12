export interface Modulo {
    id: number;
    titulo: string;
    descricao: string;
    duracao: string;
    videoUrl: string;
}

export interface TrilhaAPI {
    id: number;
    nome: string;
    descricao: string;
    icone: string;
    nivel: string;
    modulos: Modulo[];
}

export interface TrilhaPersonalizada {
    id?: number;
    idUser: number;
    nome: string;
    email: string;
    interesse: string;
    experiencia: string;
    objetivo: string;
    disponibilidade: string;
    motivacao: string;
    habilidades: string[];
    respostaIA?: string;
    modulos: Modulo[];
}

export interface Trilha {
    id: number;
    titulo: string;
    descricao: string;
    duracao: string;
    nivel: string;
    modulos: Modulo[];
    icone: string;
}
