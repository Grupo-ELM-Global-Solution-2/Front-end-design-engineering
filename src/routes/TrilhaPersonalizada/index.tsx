import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthProtection } from '../../hooks/useAuthProtection';
import { getUserId } from '../../utils/localStorageUtils';
import { useTrilhaPersonalizada } from '../../hooks/useApiTrilhaPersonalizada';
import TrilhaGenerator from '../../components/TrilhaGenerator/TrilhaGenerator';
import TrilhaPersonalizadaCard from '../../components/TrilhaPersonalizadaCard/TrilhaPersonalizadaCard';
import TrilhaPersonalizadaModal from '../../components/TrilhaPersonalizadaModal/TrilhaPersonalizadaModal';
import type { TrilhaPersonalizada } from '../../types/trilhaPersonalizada';

const MAX_TRILHAS = 3;

export default function TrilhaPersonalizada() {
    useAuthProtection();
    const navigate = useNavigate();
    const { getTrilhasPersonalizadas, deleteTrilhaPersonalizada } = useTrilhaPersonalizada();
    const [trilhas, setTrilhas] = useState<TrilhaPersonalizada[]>([]);
    const [showGenerator, setShowGenerator] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedTrilha, setSelectedTrilha] = useState<TrilhaPersonalizada | null>(null);
    const [showModal, setShowModal] = useState(false);

    const loadTrilhas = useCallback(async () => {
        try {
            const idUser = getUserId();
            if (!idUser) return;

            const userTrilhas = await getTrilhasPersonalizadas(idUser);
            if (userTrilhas && Array.isArray(userTrilhas)) {
                const parsedTrilhas: TrilhaPersonalizada[] = userTrilhas.map((trilha: { idTrilhaPers: string | number; jsonConteudo: string | object }) => {
                    if (typeof trilha.jsonConteudo === 'string') {
                        const parsed = JSON.parse(trilha.jsonConteudo);
                        return {
                            id: trilha.idTrilhaPers.toString(),
                            interesse: parsed.interesse,
                            dificuldade: parsed.dificuldade,
                            disponibilidade: parsed.disponibilidade,
                            respostaIA: parsed.respostaIA,
                            modulos: parsed.modulos || []
                        } as TrilhaPersonalizada;
                    }
                    return trilha as unknown as TrilhaPersonalizada;
                });
                setTrilhas(parsedTrilhas);
            } else {
                setTrilhas([]);
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

    const handleNavigateToPerfil = useCallback(() => {
        navigate('/perfil');
    }, [navigate]);

    const handleTrilhaGerada = useCallback(async () => {
        setShowGenerator(false);
        await loadTrilhas();
    }, [loadTrilhas]);

    const handleCancelGenerator = useCallback(() => {
        setShowGenerator(false);
    }, []);

    const handleAddTrilha = useCallback(() => {
        if (trilhas.length >= MAX_TRILHAS) {
            alert(`Você já possui o limite máximo de ${MAX_TRILHAS} trilhas personalizadas.`);
            return;
        }
        setShowGenerator(true);
    }, [trilhas.length]);

    const handleDeleteTrilha = useCallback(async (trilha: TrilhaPersonalizada) => {
        try {
            await deleteTrilhaPersonalizada(trilha.id!.toString());
            await loadTrilhas();
        } catch (err) {
            console.error('Erro ao excluir trilha:', err);
            alert('Erro ao excluir a trilha. Tente novamente.');
        }
    }, [deleteTrilhaPersonalizada, loadTrilhas]);

    const handleVerTrilha = useCallback((trilha: TrilhaPersonalizada) => {
        setSelectedTrilha(trilha);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setSelectedTrilha(null);
    }, []);

    const isLimitReached = useMemo(() =>
        trilhas.length >= MAX_TRILHAS,
        [trilhas.length]
    );

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
                    <button onClick={handleNavigateToPerfil} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer">← Perfil</button>

                    {showGenerator ? (
                        <TrilhaGenerator onTrilhaGerada={handleTrilhaGerada} onCancel={handleCancelGenerator} />
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Suas Trilhas Personalizadas</h2>
                                <button onClick={handleAddTrilha} disabled={isLimitReached} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Adicionar Nova Trilha</button>
                            </div>

                            {loading ? (
                                <div className="flex justify-center items-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">Carregando trilhas...</span>
                                </div>
                            ) : trilhas.length === 0 ? (
                                <div className="card-white text-center py-12">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Nenhuma trilha personalizada ainda</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">Crie sua primeira trilha personalizada baseada nas suas necessidades e objetivos.</p>
                                    <button onClick={handleAddTrilha} className="btn-primary">Criar Primeira Trilha</button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {trilhas.map((trilha) => (
                                        <TrilhaPersonalizadaCard key={trilha.id} trilha={trilha}
                                            onVerTrilha={handleVerTrilha}
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
                onClose={handleCloseModal}
            />
        </main>
    );
}
