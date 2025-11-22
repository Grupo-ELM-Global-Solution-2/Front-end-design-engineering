import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '../../hooks/useApiUsuarios';
import { useAuthProtection } from '../../hooks/useAuthProtection';
import { getUserId } from '../../utils/localStorageUtils';
import Card from '../../components/Card/Card';

export default function Perfil() {
    useAuthProtection();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { loading, error, getUser, updateUser } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({ nome: '', email: '', senha: '' });
    const [showPassword, setShowPassword] = useState(false);

    const loadUserData = useCallback(async () => {
        const idUser = getUserId();
        if (!idUser) return;

        const user = await getUser(idUser);
        if (user) {
            setUserInfo({
                nome: user.nome || '',
                email: user.email || '',
                senha: user.senha || ''
            });
        }
    }, [getUser]);

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        const idUser = getUserId();
        if (!idUser) return;

        const updatedUser = await updateUser(idUser, {
            nome: userInfo.nome,
            email: userInfo.email,
            senha: userInfo.senha
        });

        if (updatedUser) {
            setIsEditing(false);
        }
    }, [userInfo, updateUser]);

    const handleCancel = useCallback(async () => {
        setIsEditing(false);
        await loadUserData();
    }, [loadUserData]);

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Meu Perfil</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Gerencie suas informações e acesse suas ferramentas de aprendizado</p>
                </div>
            </section>

            {/* Profile Info Section */}
            <section className="section-padding">
                <div className="max-container">
                    <div className="card-white mb-8">
                        <div className="flex flex-col items-stretch gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Informações Pessoais</h2>
                            {!isEditing ? (
                                <button onClick={() => setIsEditing(true)} className="btn-primary w-full sm:w-auto cursor-pointer whitespace-nowrap">Editar Perfil</button>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                                    <button onClick={handleSave} className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex-1 sm:flex-none cursor-pointer">Salvar</button>
                                    <button onClick={handleCancel} className="btn-secondary flex-1 sm:flex-none cursor-pointer">Cancelar</button>
                                </div>
                            )}
                        </div>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">Carregando...</span>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome</label>
                                    {isEditing ? (
                                        <input type="text" name="nome" value={userInfo.nome} onChange={handleInputChange} className="form-input" required />
                                    ) : (
                                        <p className="form-input break-all">{userInfo.nome || 'Não informado'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                                    {isEditing ? (
                                        <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="form-input" required />
                                    ) : (
                                        <p className="form-input break-all">{userInfo.email || 'Não informado'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Senha</label>
                                    {isEditing ? (
                                        <div className="relative">
                                            <input type={showPassword ? "text" : "password"} name="senha" value={userInfo.senha} onChange={handleInputChange} className="form-input pr-10" />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">{showPassword ? '🙈' : '👁️'}</button>
                                        </div>
                                    ) : (
                                        <p className="form-input">•••••</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dashboard Options */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link to="/trilha-personalizada" className="block">
                            <Card icon="🤖" iconClassName="bg-blue-100 text-blue-600 w-16 h-16 rounded-full group-hover:bg-blue-200 transition-colors" title="Criar Trilha Personalizada" description="Use IA para gerar um roadmap adaptado às suas necessidades" className="shadow-lg hover:shadow-xl transition-shadow group p-6" />
                        </Link>

                        <Link to="/trilhas-prontas" className="block">
                            <Card icon="📚" iconClassName="bg-green-100 text-green-600 w-16 h-16 rounded-full group-hover:bg-green-200 transition-colors" title="Trilhas Pré-Definidas" description="Acesse roteiros completos para diferentes carreiras tech" className="shadow-lg hover:shadow-xl transition-shadow group p-6" />
                        </Link>

                        <Link to="/sugestoes" className="block">
                            <Card icon="💡" iconClassName="bg-purple-100 text-purple-600 w-16 h-16 rounded-full group-hover:bg-purple-200 transition-colors" title="Sugestões e Dicas" description="Vídeos, artigos e dicas para acelerar seu aprendizado" className="shadow-lg hover:shadow-xl transition-shadow group p-6" />
                        </Link>

                        <button onClick={() => { logout(); navigate('/login'); }} className="bg-red-50 border-2 border-red-200 rounded-lg shadow-lg p-6 hover:shadow-xl hover:bg-red-100 transition-all group cursor-pointer">
                            <div className="text-center">
                                <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                                    <span className="text-2xl">🚪</span>
                                </div>
                                <h3 className="text-xl font-semibold text-red-900 mb-2">Sair</h3>
                                <p className="text-red-600">Encerrar sessão e voltar ao login</p>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
