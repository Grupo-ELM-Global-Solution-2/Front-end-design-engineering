import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useApiUsuarios';

export function useAuthProtection() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
}
