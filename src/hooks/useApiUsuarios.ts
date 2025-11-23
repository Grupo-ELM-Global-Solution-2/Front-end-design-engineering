import { useCallback } from 'react';
import { useApiBase } from './useApiBase';
import type { User } from '../types/user';

// Hook específico para autenticação
export function useAuth() {
    const { loading, error, fetchApi } = useApiBase();

    const login = useCallback(async (email: string, password: string) => {
        const normalizedEmail = email.toLowerCase();
        const user = await fetchApi(`/usuario/email/${normalizedEmail}`);
        if (user && user.senha === password) {
            if (!user.idUser) {
                throw new Error('Erro ao fazer login: ID do usuário inválido');
            }
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUser', user.idUser.toString());
            localStorage.setItem('userName', user.nome);
            localStorage.setItem('userEmail', user.email);
            return user;
        }
        throw new Error('Email ou senha incorretos');
    }, [fetchApi]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        const normalizedEmail = email.toLowerCase();
        const existingUser = await fetchApi(`/usuario/email/${normalizedEmail}`);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const newUser = await fetchApi('/usuario', {
            method: 'POST',
            body: JSON.stringify({ nome: name, email: normalizedEmail, senha: password })
        });

        if (newUser) {
            // Tenta diferentes formatos de resposta da API
            let userId = newUser.idUser;

            // Se o ID não vier na resposta, busca o usuário recém-criado
            if (!userId) {
                const fetchedUser = await fetchApi(`/usuario/email/${normalizedEmail}`);
                if (fetchedUser && fetchedUser.idUser) {
                    userId = fetchedUser.idUser;
                } else {
                    throw new Error('Erro ao criar conta: ID do usuário não retornado');
                }
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUser', userId.toString());
            localStorage.setItem('userName', newUser.nome || name);
            localStorage.setItem('userEmail', newUser.email || normalizedEmail);
            return newUser;
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
        return await fetchApi(`/usuario/${idUser}`) as User;
    }, [fetchApi]);

    const updateUser = useCallback(async (idUser: number, userData: Partial<{ nome: string; email: string; senha: string }>) => {
        // Normaliza o email se estiver presente
        const normalizedData = {
            ...userData,
            ...(userData.email && { email: userData.email.toLowerCase() })
        };

        const updatedUser = await fetchApi(`/usuario/${idUser}`, {
            method: 'PUT',
            body: JSON.stringify(normalizedData)
        });
        if (updatedUser) {
            if (normalizedData.nome !== undefined) localStorage.setItem('userName', normalizedData.nome);
            if (normalizedData.email !== undefined) localStorage.setItem('userEmail', normalizedData.email);
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
