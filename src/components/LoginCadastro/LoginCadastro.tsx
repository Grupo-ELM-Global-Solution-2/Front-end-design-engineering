import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useApiUsuarios';

export default function LoginCadastro() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nome: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { login, register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                // Login
                await login(formData.email, formData.password);
                navigate('/perfil');
            } else {
                // Cadastro
                await register(formData.nome, formData.email, formData.password);
                navigate('/perfil');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="flex justify-center mb-6">
                <button onClick={() => setIsLogin(true)} className={`px-4 py-2 rounded-l-lg ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Login</button>
                <button onClick={() => setIsLogin(false)} className={`px-4 py-2 rounded-r-lg ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Cadastro</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nome Completo</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">E-mail</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Senha</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
                </div>
                {error && (<div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</div>)}

                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            {isLogin ? 'Entrando...' : 'Cadastrando...'}
                        </div>
                    ) : (
                        isLogin ? 'Entrar' : 'Cadastrar'
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline ml-1">
                        {isLogin ? 'Cadastre-se' : 'Faça login'}
                    </button>
                </p>
            </div>
        </div>
    );
}