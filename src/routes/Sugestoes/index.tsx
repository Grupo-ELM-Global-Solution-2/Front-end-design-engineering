import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthProtection } from '../../hooks/useAuthProtection';
import { useSugestoes } from '../../hooks/useApiSugestoes';
import FiltroBar from '../../components/FiltroBar/FiltroBar';
import type { Sugestao } from '../../types/sugestao';
import { tipos, dificuldades, filtrarSugestoes, getTipoIcon, getTipoLabel, formatarDificuldade } from '../../utils/sugestaoUtils';

export default function Sugestoes() {
    useAuthProtection();
    const navigate = useNavigate();
    const { getSugestoes } = useSugestoes();
    const [filtroTipo, setFiltroTipo] = useState<string>('todos');
    const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos');
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
    const [loading, setLoading] = useState(true);

    const loadSugestoes = useCallback(async () => {
        setLoading(true);
        const data = await getSugestoes() as Sugestao[];
        if (data) {
            setSugestoes(data);
        }
        setLoading(false);
    }, [getSugestoes]);

    useEffect(() => {
        loadSugestoes();
    }, [loadSugestoes]);

    const handleNavigateToPerfil = useCallback(() => {
        navigate('/perfil');
    }, [navigate]);

    const handleTipoChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltroTipo(e.target.value);
    }, []);

    const handleDificuldadeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltroDificuldade(e.target.value);
    }, []);

    const sugestoesFiltradas = useMemo(() =>
        filtrarSugestoes(sugestoes, filtroTipo, filtroDificuldade),
        [sugestoes, filtroTipo, filtroDificuldade]
    );

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Sugestões e Dicas</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Conteúdo selecionado para acelerar seu aprendizado na programação</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-container">
                    <button onClick={handleNavigateToPerfil} className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center cursor-pointer">
                        ← Perfil
                    </button>
                    {/* Filtros */}
                    <FiltroBar
                        filtroDificuldade={filtroDificuldade}
                        onDificuldadeChange={handleDificuldadeChange}
                        dificuldadeOptions={dificuldades}
                        segundoFiltroValor={filtroTipo}
                        onSegundoFiltroChange={handleTipoChange}
                        segundoFiltroLabel="Tipo de Conteúdo"
                        segundoFiltroOptions={tipos}
                    />

                    {/* Lista de Sugestões */}
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                            <span className="ml-3 text-gray-600 dark:text-gray-400">Carregando sugestões...</span>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sugestoesFiltradas.map((sugestao) => {
                                    const tipoIcon = getTipoIcon(sugestao.tipo);
                                    const tipoLabel = getTipoLabel(sugestao.tipo);
                                    const dificuldadeFormatada = formatarDificuldade(sugestao.dificuldade);

                                    return (
                                        <div key={sugestao.idSugestoes} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                                        {dificuldadeFormatada}
                                                    </span>
                                                    <div className="text-3xl">{tipoIcon}</div>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{sugestao.titulo}</h3>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{sugestao.descricao}</p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span>{tipoIcon} {tipoLabel}</span>
                                                        <span>•</span>
                                                        <span>{sugestao.duracao}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-6 pb-6">
                                                <Link to={sugestao.link} target="_blank" rel="noopener noreferrer" className="block w-full btn-primary text-center">
                                                    Acessar Conteúdo
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {sugestoesFiltradas.length === 0 && !loading && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Nenhuma sugestão encontrada</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Tente ajustar os filtros para ver mais resultados.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
