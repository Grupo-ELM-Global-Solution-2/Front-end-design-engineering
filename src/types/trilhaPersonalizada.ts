export interface ModuloPersonalizado {
    id: number;
    titulo: string;
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
