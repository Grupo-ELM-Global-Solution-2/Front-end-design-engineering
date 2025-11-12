import { useCallback } from 'react';
import { useApiBase } from './useApiBase';

// Hook específico para autenticação
export function useAuth() {
    const { loading, error, fetchApi } = useApiBase();

    const login = useCallback(async (email: string, password: string) => {
        const users = await fetchApi('/usuarios?email=' + encodeURIComponent(email));
        if (users && Array.isArray(users) && users.length > 0) {
            const user = users[0];
            if (user.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', user.id.toString());
                localStorage.setItem('userName', user.nome);
                localStorage.setItem('userEmail', user.email);
                return user;
            }
        }
        throw new Error('Email ou senha incorretos');
    }, [fetchApi]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        // Check if email exists
        const existingUsers = await fetchApi('/usuarios?email=' + encodeURIComponent(email));
        if (existingUsers && Array.isArray(existingUsers) && existingUsers.length > 0) {
            throw new Error('Email já cadastrado');
        }

        const newUser = await fetchApi('/usuarios', {
            method: 'POST',
            body: JSON.stringify({ nome: name, email, password })
        });
        if (newUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', newUser.id.toString());
            localStorage.setItem('userName', newUser.nome);
            localStorage.setItem('userEmail', newUser.email);
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

    return {
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
    };
}

// Hook específico para usuários
export function useUser() {
    const { loading, error, fetchApi } = useApiBase();

    const getUser = useCallback(async (userId: string) => {
        return await fetchApi(`/usuarios/${userId}`);
    }, [fetchApi]);

    const updateUser = useCallback(async (userId: string, userData: Partial<{ nome: string; email: string; telefone: string; biografia: string }>) => {
        const updatedUser = await fetchApi(`/usuarios/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(userData)
        });
        if (updatedUser) {
            // Update localStorage
            if (userData.nome !== undefined) localStorage.setItem('userName', userData.nome);
            if (userData.email !== undefined) localStorage.setItem('userEmail', userData.email);
            // Note: telefone and biografia are not stored in localStorage, but can be added if needed
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
