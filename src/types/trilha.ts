// Módulo de uma trilha pronta (do db.json)
export interface Modulo {
    id: number;
    titulo: string;
    descricao: string;
    duracao: string;
    videoUrl: string;
}

// Trilha Pronta (do db.json)
export interface TrilhaPronta {
    id: string;
    nome: string;
    descricao: string;
    icone: string;
    dificuldade: string;
    modulos: Modulo[];
}