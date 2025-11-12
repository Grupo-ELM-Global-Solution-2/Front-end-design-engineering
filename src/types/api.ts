export interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export interface UseApiReturn<T> extends ApiResponse<T> {
    request: (url: string, options?: RequestInit) => Promise<T | null>;
    get: (url: string) => Promise<T | null>;
    post: (url: string, data: unknown) => Promise<T | null>;
    patch: (url: string, data: unknown) => Promise<T | null>;
    delete: (url: string) => Promise<T | null>;
    reset: () => void;
}

export const API_BASE_URL = 'http://localhost:3001';
