import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiBase } from './useApiBase';
import type { User } from '../types/user';

// Hook específico para autenticação
export function useAuth() {
    const { loading, error, fetchApi } = useApiBase();
    const navigate = useNavigate();

    const login = useCallback(async (email: string, password: string) => {
        const user = await fetchApi(`/usuario/email/${email}`);
        if (user && user.senha === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUser', user.idUser.toString());
            localStorage.setItem('userName', user.nome);
            localStorage.setItem('userEmail', user.email);
            return user;
        }
        throw new Error('Email ou senha incorretos');
    }, [fetchApi]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        const existingUser = await fetchApi(`/usuario/email/${email}`);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const newUser = await fetchApi('/usuario', {
            method: 'POST',
            body: JSON.stringify({ nome: name, email, senha: password })
        });
        if (newUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUser', (newUser as User).idUser.toString());
            localStorage.setItem('userName', (newUser as User).nome);
            localStorage.setItem('userEmail', (newUser as User).email);
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

    const requireAuth = useCallback(() => {
        useEffect(() => {
            if (!isAuthenticated()) {
                navigate('/login');
            }
        }, []);
    }, [navigate, isAuthenticated]);

    return {
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        requireAuth,
    };
}

// Hook específico para usuários
export function useUser() {
    const { loading, error, fetchApi } = useApiBase();

    const getUser = useCallback(async (idUser: number) => {
        return await fetchApi(`/usuario/${idUser}`) as User;
    }, [fetchApi]);

    const updateUser = useCallback(async (idUser: number, userData: Partial<{ nome: string; email: string; senha: string }>) => {
        const updatedUser = await fetchApi(`/usuario/${idUser}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
        if (updatedUser) {
            if (userData.nome !== undefined) localStorage.setItem('userName', userData.nome);
            if (userData.email !== undefined) localStorage.setItem('userEmail', userData.email);
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
