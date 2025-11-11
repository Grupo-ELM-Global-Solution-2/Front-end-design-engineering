import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '../../hooks/useApi';
import Card from '../../components/Card/Card';

export default function Perfil() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const { user, loading, error, getUser, updateUser } = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        nome: '',
        email: '',
        telefone: '',
        biografia: ''
    });

    // Check authentication on mount
    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        // Load user data from localStorage first
        const userName = localStorage.getItem('userName') || '';
        const userEmail = localStorage.getItem('userEmail') || '';
        const userId = localStorage.getItem('userId');

        setUserInfo(prev => ({
            ...prev,
            nome: userName,
            email: userEmail
        }));

        // Fetch latest user data from API
        if (userId) {
            getUser(userId);
        }
    }, [navigate, isAuthenticated, getUser]);

    // Update userInfo when user data is loaded
    useEffect(() => {
        if (user) {
            setUserInfo(prev => ({
                ...prev,
                nome: user.nome || prev.nome,
                email: user.email || prev.email,
                telefone: user.telefone || prev.telefone,
                biografia: user.biografia || prev.biografia
            }));
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return;
        }

        const updatedUser = await updateUser(userId, {
            nome: userInfo.nome,
            email: userInfo.email,
            telefone: userInfo.telefone,
            biografia: userInfo.biografia
        });

        if (updatedUser) {
            setIsEditing(false);
            alert('Informações salvas com sucesso!');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset to original values if needed
    };

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Meu Perfil
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                        Gerencie suas informações e acesse suas ferramentas de aprendizado
                    </p>
                </div>
            </section>

            {/* Profile Info Section */}
            <section className="section-padding">
                <div className="max-container">
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Informações Pessoais</h2>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                                >
                                    Editar Perfil
                                </button>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1 sm:flex-none"
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors flex-1 sm:flex-none"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-2 text-gray-600">Carregando...</span>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="nome"
                                            value={userInfo.nome}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{userInfo.nome || 'Não informado'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    ) : (
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{userInfo.email || 'Não informado'}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={userInfo.telefone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    ) : (
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{userInfo.telefone || 'Não informado'}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Biografia</label>
                                    {isEditing ? (
                                        <textarea
                                            name="biografia"
                                            value={userInfo.biografia}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Conte um pouco sobre você..."
                                        />
                                    ) : (
                                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{userInfo.biografia || 'Nenhuma bio adicionada ainda.'}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dashboard Options */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link to="/trilha-personalizada" className="block">
                            <Card
                                icon="🤖"
                                iconClassName="bg-blue-100 text-blue-600 w-16 h-16 rounded-full group-hover:bg-blue-200 transition-colors"
                                title="Criar Trilha Personalizada"
                                description="Use IA para gerar um roadmap adaptado às suas necessidades"
                                className="shadow-lg hover:shadow-xl transition-shadow group p-6"
                            />
                        </Link>

                        <Link to="/trilhas-prontas" className="block">
                            <Card
                                icon="📚"
                                iconClassName="bg-green-100 text-green-600 w-16 h-16 rounded-full group-hover:bg-green-200 transition-colors"
                                title="Trilhas Pré-Definidas"
                                description="Acesse roteiros completos para diferentes carreiras tech"
                                className="shadow-lg hover:shadow-xl transition-shadow group p-6"
                            />
                        </Link>

                        <Link to="/sugestoes" className="block">
                            <Card
                                icon="💡"
                                iconClassName="bg-purple-100 text-purple-600 w-16 h-16 rounded-full group-hover:bg-purple-200 transition-colors"
                                title="Sugestões e Dicas"
                                description="Vídeos, artigos e dicas para acelerar seu aprendizado"
                                className="shadow-lg hover:shadow-xl transition-shadow group p-6"
                            />
                        </Link>

                        <button
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                            className="bg-red-50 border-2 border-red-200 rounded-lg shadow-lg p-6 hover:shadow-xl hover:bg-red-100 transition-all group"
                        >
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
