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
    idUser?: number;
    interesse: string;
    experiencia: string;
    disponibilidade: string;
    preferenciasAprendizado: string[];
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
