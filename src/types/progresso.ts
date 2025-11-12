export interface Progresso {
    id?: number;
    idUser: number;
    status: 'em andamento' | 'concluido';
    idModulo: number;
}
