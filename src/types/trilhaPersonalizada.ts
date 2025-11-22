export interface ModuloPersonalizado {
    id: number;
    nome: string;
    descricao: string;
    duracao: string;
}

export interface TrilhaPersonalizada {
    id?: string;
    interesse: string;
    dificuldade: string;
    disponibilidade: string;
    respostaIA: string;
    modulos: ModuloPersonalizado[];
}
