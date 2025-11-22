import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthProtection } from '../../hooks/useAuthProtection';
import FiltroBar from '../../components/FiltroBar/FiltroBar';
import { useTrilhasDisponiveis } from '../../hooks/useTrilhasDisponiveis';
import { getDuracaoForTrilha, categoriasOptions, filtrarTrilhas, dificuldades } from '../../utils/trilhaUtils';
import type { TrilhaPronta } from '../../types/trilha';

export default function TrilhasProntas() {
useAuthProtection();
const navigate = useNavigate();
const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos');
const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');

// Hooks personalizados
const {
    trilhasDisponiveis,
    loading: loadingTrilhas,
    error: errorTrilhas
} = useTrilhasDisponiveis();

// Handlers memoizados
const handleNavigateToPerfil = useCallback(() => {
    navigate('/perfil');
}, [navigate]);

const handleDificuldadeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroDificuldade(e.target.value);
}, [setFiltroDificuldade]);

const handleCategoriaChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFiltroCategoria(e.target.value);
}, [setFiltroCategoria]);

const handleSelectTrilha = useCallback((trilha: TrilhaPronta) => {
    navigate(`/trilha/${trilha.idTrilha}`);
}, [navigate]);

// Filtragem local memoizada
const trilhasFiltradas = useMemo(() =>
    filtrarTrilhas(trilhasDisponiveis, filtroDificuldade, filtroCategoria),
    [trilhasDisponiveis, filtroDificuldade, filtroCategoria]
);



return (
    <main className="main-bg min-h-screen">
        <section className="hero-section">
            <div className="max-container">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">Trilhas Pré-Definidas</h1>
                <p className="text-lg md:text-xl text-indigo-100 max-w-lg md:max-w-2xl mx-auto">Escolha uma carreira e siga um caminho estruturado para o sucesso</p>
            </div>
        </section>

        <section className="section-padding">
            <div className="max-container">
                <button onClick={handleNavigateToPerfil} className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center cursor-pointer">← Perfil</button>
                <>
                    <FiltroBar
                        filtroDificuldade={filtroDificuldade}
                        onDificuldadeChange={handleDificuldadeChange}
                        dificuldadeOptions={dificuldades}
                        segundoFiltroValor={filtroCategoria}
                        onSegundoFiltroChange={handleCategoriaChange}
                        segundoFiltroLabel="Categoria"
                        segundoFiltroOptions={categoriasOptions}
                    />

                    {errorTrilhas && (
                        <div className="text-red-600 dark:text-red-400 text-center bg-red-50 dark:bg-red-900/20 p-4 rounded mb-6">
                            {errorTrilhas}
                        </div>
                    )}
                    {loadingTrilhas ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">Carregando trilhas...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trilhasFiltradas.map((trilha) => {
                                const duracao = getDuracaoForTrilha(trilha.modulos || []);
                                const modulosCount = (trilha.modulos || []).length;

                                return (
                                    <div key={trilha.idTrilha} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => handleSelectTrilha(trilha)}>
                                        <div className="text-center mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{trilha.nome}</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{trilha.descricao}</p>
                                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            <span>📅 {duracao}</span>
                                            <span>🎯 {trilha.dificuldade}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                                                {modulosCount} módulos
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            </div>
        </section>
    </main >
);
}
