import { useState, useCallback } from 'react';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}



interface Assessment {
    id?: number;
    idUser: string;
    nome: string;
    email: string;
    interesse: string;
    experiencia: string;
    objetivo: string;
    disponibilidade: string;
    motivacao: string;
    habilidades: string[];
    trilha: unknown[];
}

interface UseApiReturn<T> extends ApiResponse<T> {
    request: (url: string, options?: RequestInit) => Promise<T | null>;
    get: (url: string) => Promise<T | null>;
    post: (url: string, data: unknown) => Promise<T | null>;
    patch: (url: string, data: unknown) => Promise<T | null>;
    delete: (url: string) => Promise<T | null>;
    reset: () => void;
}

const API_BASE_URL = 'http://localhost:3001';

export function useApi<T = unknown>(): UseApiReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    const request = useCallback(async (url: string, options: RequestInit = {}): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
            const response = await fetch(fullUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(errorMessage);
            console.error('API request failed:', err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const get = useCallback((url: string) => request(url, { method: 'GET' }), [request]);
    const post = useCallback((url: string, data: unknown) => request(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }), [request]);
    const patch = useCallback((url: string, data: unknown) => request(url, {
        method: 'PATCH',
        body: JSON.stringify(data)
    }), [request]);
    const deleteRequest = useCallback((url: string) => request(url, { method: 'DELETE' }), [request]);

    return {
        data,
        loading,
        error,
        request,
        get,
        post,
        patch,
        delete: deleteRequest,
        reset,
    };
}

// Hook específico para autenticação
export function useAuth() {
    const { data, loading, error, get, post, reset } = useApi<{ id: number; nome: string; email: string }>();

    const login = useCallback(async (email: string, password: string) => {
        reset();
        const users = await get('/usuarios?email=' + encodeURIComponent(email));
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
    }, [get, reset]);

    const register = useCallback(async (name: string, email: string, password: string) => {
        reset();
        // Check if email exists
        const existingUsers = await get('/usuarios?email=' + encodeURIComponent(email));
        if (existingUsers && Array.isArray(existingUsers) && existingUsers.length > 0) {
            throw new Error('Email já cadastrado');
        }

        const newUser = await post('/usuarios', { nome: name, email, password });
        if (newUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', newUser.id.toString());
            localStorage.setItem('userName', newUser.nome);
            localStorage.setItem('userEmail', newUser.email);
            return newUser;
        }
        throw new Error('Erro ao criar conta');
    }, [get, post, reset]);

    const logout = useCallback(() => {
        localStorage.clear();
        reset();
    }, [reset]);

    const isAuthenticated = useCallback(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    }, []);

    return {
        user: data,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        reset,
    };
}

// Hook específico para usuários
export function useUser() {
    const { data, loading, error, get, patch, reset } = useApi<{ id: number; nome: string; email: string; telefone?: string; biografia?: string }>();

    const getUser = useCallback(async (userId: string) => {
        reset();
        return await get(`/usuarios/${userId}`);
    }, [get, reset]);

    const updateUser = useCallback(async (userId: string, userData: Partial<{ nome: string; email: string; telefone: string; biografia: string }>) => {
        reset();
        const updatedUser = await patch(`/usuarios/${userId}`, userData);
        if (updatedUser) {
            // Update localStorage
            if (userData.nome) localStorage.setItem('userName', userData.nome);
            if (userData.email) localStorage.setItem('userEmail', userData.email);
        }
        return updatedUser;
    }, [patch, reset]);

    return {
        user: data,
        loading,
        error,
        getUser,
        updateUser,
        reset,
    };
}

// Hook específico para trilhas
export function useTrilhas() {
    const { data, loading, error, get, post, reset } = useApi<unknown[]>();

    const getTrilhas = useCallback(async () => {
        reset();
        return await get('/trilhas');
    }, [get, reset]);

    const saveAvaliacao = useCallback(async (avaliacao: Assessment) => {
        reset();
        return await post('/avaliacoes', avaliacao);
    }, [post, reset]);

    return {
        trilhas: data,
        loading,
        error,
        getTrilhas,
        saveAvaliacao,
        reset,
    };
}
