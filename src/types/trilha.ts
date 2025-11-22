
export interface Modulo {
    idModulo: number;
    nome: string;
    duracao: string;
    link: string;
    idTrilha: number;
}

export interface TrilhaPronta {
    idTrilha?: number;
    nome: string;
    descricao: string;
    dificuldade: string;
    modulos?: Modulo[];
}
