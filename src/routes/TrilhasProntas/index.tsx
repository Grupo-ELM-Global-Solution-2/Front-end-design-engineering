import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleAccordion from '../../components/ModuleAccordion/ModuleAccordion';
import { useTrilhas } from '../../hooks/useApiTrilhas';
import { useProgresso } from '../../hooks/useApiProgresso';
import type { Trilha, TrilhaAPI } from '../../types/trilha';

const getDuracaoForTrilha = (modulos: Array<{ duracao: string }>): string => {
    const totalWeeks = modulos.reduce((total, modulo) => {
        const weeks = parseInt(modulo.duracao.split(' ')[0]) || 0;
        return total + weeks;
    }, 0);
    return `${totalWeeks} semanas`;
};

export default function TrilhasProntas() {
    const navigate = useNavigate();
    const [selectedTrilha, setSelectedTrilha] = useState<Trilha | null>(null);
    const [trilhasDisponiveis, setTrilhasDisponiveis] = useState<Trilha[]>([]);
    const [startedModules, setStartedModules] = useState<Set<number>>(new Set());

    // Hooks personalizados
    const { getTrilhas, loading: loadingTrilhas, error: errorTrilhas } = useTrilhas();
    const { startModule, markCompleted, giveUp } = useProgresso();

    useEffect(() => {
        const fetchTrilhas = async () => {
            const trilhasAPI = await getTrilhas();

            if (trilhasAPI) {
                const trilhas: Trilha[] = trilhasAPI.map((trilhaAPI: TrilhaAPI) => ({
                    id: trilhaAPI.id,
                    titulo: trilhaAPI.nome,
                    descricao: trilhaAPI.descricao,
                    duracao: getDuracaoForTrilha(trilhaAPI.modulos),
                    nivel: trilhaAPI.nivel,
                    modulos: trilhaAPI.modulos,
                    icone: trilhaAPI.icone
                }));

                setTrilhasDisponiveis(trilhas);
            }
        };

        fetchTrilhas();
    }, [getTrilhas]);

    const handleStartModule = async (index: number) => {
        setStartedModules(prev => new Set(prev).add(index));
        const result = await startModule(1, (index + 1));

        if (!result) {
            console.error('Erro ao salvar progresso');
            // Reverter o estado em caso de erro
            setStartedModules(prev => {
                const newSet = new Set(prev);
                newSet.delete(index);
                return newSet;
            });
        }
    };

    const handleVisualizeModule = () => {
        // No tracking, just visualize
    };

    const handleMarkCompleted = async (index: number) => {
        const result = await markCompleted(1, (index + 1));

        if (!result) {
            console.error('Erro ao salvar conclusão');
        }
    };

    const handleGiveUp = async (index: number) => {
        setStartedModules(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
        });

        const result = await giveUp(1, (index + 1));

        if (!result) {
            console.error('Erro ao salvar desistência');
        }
    };

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                        Trilhas Pré-Definidas
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-lg md:max-w-2xl mx-auto">
                        Escolha uma carreira e siga um caminho estruturado para o sucesso
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-container">

                    <button onClick={() => navigate('/perfil')} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer">
                        ← Perfil
                    </button>

                    {!selectedTrilha ? (
                        <>
                            {errorTrilhas && (
                                <div className="text-red-600 text-center bg-red-50 p-4 rounded mb-6">
                                    {errorTrilhas}
                                </div>
                            )}
                            {loadingTrilhas ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Carregando trilhas...</p>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {trilhasDisponiveis.map((trilha) => (
                                        <div key={trilha.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => setSelectedTrilha(trilha)}>
                                            <div className="text-center mb-4">
                                                <div className="text-4xl mb-2">{trilha.icone}</div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {trilha.titulo}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-4">{trilha.descricao}</p>
                                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                                                <span>📅 {trilha.duracao}</span>
                                                <span>🎯 {trilha.nivel}</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                                    {trilha.modulos.length} módulos
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                                <button onClick={() => setSelectedTrilha(null)} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                                    ← Voltar às Trilhas
                                </button>
                                <div className="text-left sm:text-right">
                                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {selectedTrilha.nivel}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <div className="text-4xl md:text-6xl mb-4">{selectedTrilha.icone}</div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedTrilha.titulo}</h2>
                                <p className="text-gray-600 max-w-lg md:max-w-2xl mx-auto text-sm md:text-base">{selectedTrilha.descricao}</p>
                                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 text-sm text-gray-500">
                                    <span>📅 {selectedTrilha.duracao}</span>
                                    <span>📚 {selectedTrilha.modulos.length} módulos</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Conteúdo da Trilha</h3>
                                <div className="space-y-4">
                                    {selectedTrilha.modulos.map((modulo, _index) => (
                                        <ModuleAccordion
                                            key={_index}
                                            index={_index}
                                            modulo={modulo}
                                            started={startedModules.has(_index)}
                                            onStart={handleStartModule}
                                            onVisualize={handleVisualizeModule}
                                            onMarkCompleted={handleMarkCompleted}
                                            onGiveUp={handleGiveUp}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
