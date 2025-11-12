export interface User {
    id: number;
    nome: string;
    email: string;
    password?: string;
    telefone?: string;
    biografia?: string;
}

export interface AuthUser {
    id: number;
    nome: string;
    email: string;
}
