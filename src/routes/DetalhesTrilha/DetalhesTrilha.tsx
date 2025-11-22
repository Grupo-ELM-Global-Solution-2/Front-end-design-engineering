import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthProtection } from '../../hooks/useAuthProtection';
import ModuleAccordion from '../../components/ModuleAccordion/ModuleAccordion';
import { useTrilhas } from '../../hooks/useApiTrilhas';
import { useProgressoTrilha } from '../../hooks/useProgressoTrilha';
import { getDuracaoForTrilha } from '../../utils/trilhaUtils';
import type { TrilhaPronta, Modulo } from '../../types/trilha';

export default function DetalhesTrilha() {
    useAuthProtection();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getTrilhaById, getAllModulos, loading: loadingApi, error: errorApi } = useTrilhas();

    const [trilha, setTrilha] = useState<TrilhaPronta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        getModuleStatus,
        handleStartModule,
        handleMarkCompleted,
        handleUnmarkCompleted,
        handleGiveUp
    } = useProgressoTrilha(trilha);

    useEffect(() => {
        const fetchTrilhaDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const trilhaData = await getTrilhaById(Number(id));

                if (trilhaData) {
                    // Fetch all modules to filter for this trilha
                    // Ideally the API would return modules with the trilha, but following existing pattern
                    const allModulos = await getAllModulos();
                    const modulosDaTrilha = allModulos
                        ? allModulos.filter((m: Modulo) => m.idTrilha === Number(id))
                        : [];

                    setTrilha({
                        ...trilhaData,
                        modulos: modulosDaTrilha
                    });
                } else {
                    setError('Trilha não encontrada');
                }
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar detalhes da trilha');
            } finally {
                setLoading(false);
            }
        };

        fetchTrilhaDetails();
    }, [id, getTrilhaById, getAllModulos]);

    const handleBack = () => {
        navigate('/trilhas-prontas');
    };

    const handleVisualizeModule = useCallback((index: number) => {
        console.log(`Visualizando módulo ${index}`);
    }, []);

    const trilhaDuracao = useMemo(() =>
        trilha ? getDuracaoForTrilha(trilha.modulos || []) : '',
        [trilha]
    );

    const modulosCount = useMemo(() =>
        trilha ? (trilha.modulos || []).length : 0,
        [trilha]
    );

    if (loading || loadingApi) {
        return (
            <div className="main-bg min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Carregando detalhes...</p>
                </div>
            </div>
        );
    }

    if (error || errorApi || !trilha) {
        return (
            <div className="main-bg min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Ops!</h2>
                    <p>{error || errorApi || 'Trilha não encontrada'}</p>
                    <button
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Voltar para Trilhas
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="main-bg min-h-screen section-padding">
            <div className="max-container">
                <button onClick={handleBack} className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center cursor-pointer">
                    ← Voltar às Trilhas
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <div className="text-left">
                            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                                {trilha.dificuldade}
                            </span>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{trilha.nome}</h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-lg md:max-w-2xl mx-auto text-sm md:text-base">{trilha.descricao}</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
                            <span>📅 {trilhaDuracao}</span>
                            <span>📚 {modulosCount} módulos</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Conteúdo da Trilha</h3>
                        <div className="space-y-4">
                            {(trilha.modulos || []).map((modulo, index: number) => (
                                <ModuleAccordion
                                    key={modulo.idModulo}
                                    index={index}
                                    modulo={modulo}
                                    status={getModuleStatus(index)}
                                    onStart={handleStartModule}
                                    onVisualize={handleVisualizeModule}
                                    onMarkCompleted={handleMarkCompleted}
                                    onUnmarkCompleted={handleUnmarkCompleted}
                                    onGiveUp={handleGiveUp}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
