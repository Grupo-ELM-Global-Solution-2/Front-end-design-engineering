import { useCallback } from 'react';
import { useApiBase } from './useApiBase';
import type { User } from '../types/user';
import { LoginSchema, RegisterSchema, UpdateUserSchema, UserSchema } from '../schemas';

// Hook específico para autenticação
export function useAuth() {
    const { loading, error, fetchApi } = useApiBase();

    const login = useCallback(async (email: string, password: string) => {
        // Valida e normaliza os dados de entrada com Zod
        const validatedData = LoginSchema.parse({ email, senha: password });

        const user = await fetchApi(`/usuario/email/${validatedData.email}`);

        // Valida a resposta da API com Zod
        const validatedUser = UserSchema.parse(user);

        if (validatedUser && validatedUser.senha === password) {
            if (!validatedUser.idUser) {
                throw new Error('Erro ao fazer login: ID do usuário inválido');
            }
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUser', validatedUser.idUser.toString());
            localStorage.setItem('userName', validatedUser.nome);
            localStorage.setItem('userEmail', validatedData.email);
            return validatedUser;
        }
        throw new Error('Email ou senha incorretos');
    }, [fetchApi]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        // Valida e normaliza os dados de entrada com Zod
        const validatedData = RegisterSchema.parse({ nome: name, email, senha: password });

        const existingUser = await fetchApi(`/usuario/email/${validatedData.email}`);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const newUser = await fetchApi('/usuario', {
            method: 'POST',
            body: JSON.stringify({ nome: validatedData.nome, email: validatedData.email, senha: validatedData.senha })
        });

        if (newUser) {
            // Valida a resposta da API
            const validatedNewUser = UserSchema.partial({ senha: true }).parse(newUser);

            // Tenta diferentes formatos de resposta da API
            let userId = validatedNewUser.idUser;

            // Se o ID não vier na resposta, busca o usuário recém-criado
            if (!userId) {
                const fetchedUser = await fetchApi(`/usuario/email/${validatedData.email}`);
                if (fetchedUser && fetchedUser.idUser) {
                    userId = fetchedUser.idUser;
                } else {
                    throw new Error('Erro ao criar conta: ID do usuário não retornado');
                }
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUser', userId.toString());
            localStorage.setItem('userName', validatedNewUser.nome || validatedData.nome);
            localStorage.setItem('userEmail', validatedNewUser.email || validatedData.email);
            return validatedNewUser;
        }
        throw new Error('Erro ao criar conta');
    }, [fetchApi]);

    const logout = useCallback(() => {
        localStorage.clear();
    }, []);

    const isAuthenticated = useCallback(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    }, []);

    const getCurrentUserId = useCallback(() => {
        const idUser = localStorage.getItem('idUser');
        return idUser ? parseInt(idUser, 10) : null;
    }, []);

    return {
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        getCurrentUserId,
    };
}

// Hook específico para usuários
export function useUser() {
    const { loading, error, fetchApi } = useApiBase();

    const getUser = useCallback(async (idUser: number) => {
        const user = await fetchApi(`/usuario/${idUser}`);
        // Valida a resposta da API com Zod
        return UserSchema.parse(user) as User;
    }, [fetchApi]);

    const updateUser = useCallback(async (idUser: number, userData: Partial<{ nome: string; email: string; senha: string }>) => {
        // Valida os dados com Zod
        const validatedData = UpdateUserSchema.parse(userData);

        const updatedUser = await fetchApi(`/usuario/${idUser}`, {
            method: 'PUT',
            body: JSON.stringify(validatedData)
        });
        if (updatedUser) {
            if (validatedData.nome !== undefined) localStorage.setItem('userName', validatedData.nome);
            if (validatedData.email !== undefined) localStorage.setItem('userEmail', validatedData.email);
        }
        return updatedUser;
    }, [fetchApi]);

    return {
        loading,
        error,
        getUser,
        updateUser,
    };
}
