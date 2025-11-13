import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrilhaPersonalizada } from '../../hooks/useApiTrilhaPersonalizada';
import TrilhaGenerator from '../../components/TrilhaGenerator/TrilhaGenerator';
import TrilhaPersonalizadaCard from '../../components/TrilhaPersonalizadaCard/TrilhaPersonalizadaCard';
import TrilhaPersonalizadaModal from '../../components/TrilhaPersonalizadaModal/TrilhaPersonalizadaModal';
import type { TrilhaPersonalizada } from '../../types/trilhaPersonalizada';

export default function TrilhaPersonalizada() {
    const navigate = useNavigate();
    const { getTrilhasPersonalizadas, deleteTrilhaPersonalizada } = useTrilhaPersonalizada();
    const [trilhas, setTrilhas] = useState<TrilhaPersonalizada[]>([]);
    const [showGenerator, setShowGenerator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedTrilha, setSelectedTrilha] = useState<TrilhaPersonalizada | null>(null);
    const [showModal, setShowModal] = useState(false);

    const loadTrilhas = useCallback(async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const userTrilhas = await getTrilhasPersonalizadas(userEmail);
                setTrilhas(userTrilhas || []);
            }
        } catch (err) {
            console.error('Erro ao carregar trilhas:', err);
        } finally {
            setLoading(false);
        }
    }, [getTrilhasPersonalizadas]);

    useEffect(() => {
        loadTrilhas();
    }, [loadTrilhas]);

    const handleTrilhaGerada = async () => {
        setShowGenerator(false);
        await loadTrilhas(); // Recarrega as trilhas após gerar uma nova
    };

    const handleAddTrilha = () => {
        if (trilhas.length >= 3) {
            alert('Você já possui o limite máximo de 3 trilhas personalizadas.');
            return;
        }
        setShowGenerator(true);
    };

    const handleDeleteTrilha = async (trilha: TrilhaPersonalizada) => {
        try {
            await deleteTrilhaPersonalizada(trilha.id!.toString());
            await loadTrilhas(); // Recarrega as trilhas após excluir
        } catch (err) {
            console.error('Erro ao excluir trilha:', err);
            alert('Erro ao excluir a trilha. Tente novamente.');
        }
    };

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Trilha Personalizada com IA</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Nossa inteligência artificial cria um roadmap sob medida para você</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-container">
                    <button onClick={() => navigate('/perfil')} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer">← Perfil</button>

                    {showGenerator ? (
                        <TrilhaGenerator onTrilhaGerada={handleTrilhaGerada} onCancel={() => setShowGenerator(false)} />
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Suas Trilhas Personalizadas</h2>
                                <button onClick={handleAddTrilha} disabled={trilhas.length >= 3} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Adicionar Nova Trilha
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <span className="ml-2 text-gray-600">Carregando trilhas...</span>
                                </div>
                            ) : trilhas.length === 0 ? (
                                <div className="card-white text-center py-12">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma trilha personalizada ainda</h3>
                                    <p className="text-gray-600 mb-6">Crie sua primeira trilha personalizada baseada nas suas necessidades e objetivos.</p>
                                    <button onClick={handleAddTrilha} className="btn-primary">Criar Primeira Trilha</button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {trilhas.map((trilha) => (
                                        <TrilhaPersonalizadaCard key={trilha.id} trilha={trilha}
                                            onVerTrilha={(trilha) => {
                                                setSelectedTrilha(trilha);
                                                setShowModal(true);
                                            }}
                                            onDeleteTrilha={handleDeleteTrilha}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <TrilhaPersonalizadaModal
                trilha={selectedTrilha}
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedTrilha(null);
                }}
            />
        </main>
    );
}
