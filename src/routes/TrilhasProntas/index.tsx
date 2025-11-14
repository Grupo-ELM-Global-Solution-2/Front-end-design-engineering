import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleAccordion from '../../components/ModuleAccordion/ModuleAccordion';
import { useTrilhasDisponiveis } from '../../hooks/useTrilhasDisponiveis';
import { useProgressoTrilha } from '../../hooks/useProgressoTrilha';
import type { TrilhaPronta } from '../../types/trilha';

const getDuracaoForTrilha = (modulos: Array<{ duracao: string }>): string => {
    const totalWeeks = modulos.reduce((total, modulo) => {
        const weeks = parseInt(modulo.duracao.split(' ')[0]) || 0;
        return total + weeks;
    }, 0); 
    return `${totalWeeks} semanas`;
};

export default function TrilhasProntas() {
    const navigate = useNavigate();
    const [selectedTrilha, setSelectedTrilha] = useState<TrilhaPronta | null>(null);

    // Hooks personalizados
    const {
        trilhasDisponiveis,
        filtroDificuldade,
        setFiltroDificuldade,
        filtroCategoria,
        setFiltroCategoria,
        loading: loadingTrilhas,
        error: errorTrilhas
    } = useTrilhasDisponiveis();

    const {
        getModuleStatus,
        handleStartModule,
        handleMarkCompleted,
        handleUnmarkCompleted,
        handleGiveUp
    } = useProgressoTrilha(selectedTrilha);

    const handleVisualizeModule = () => {
        // No tracking, just visualize
    };

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
                    <button onClick={() => navigate('/perfil')} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer">← Perfil</button>
                    {!selectedTrilha ? (
                        <>
                            {/* Filtros */}
                            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Filtrar Trilhas</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dificuldade</label>
                                        <select value={filtroDificuldade} onChange={(e) => setFiltroDificuldade(e.target.value)} className="form-input">
                                            <option value="todos">Todas as dificuldades</option>
                                            <option value="Básico">Básico</option>
                                            <option value="Intermediário">Intermediário</option>
                                            <option value="Avançado">Avançado</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                                        <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="form-input">
                                            <option value="todos">Todas as categorias</option>
                                            <option value="frontend">Frontend</option>
                                            <option value="backend">Backend</option>
                                            <option value="fullstack">Fullstack</option>
                                            <option value="datascience">Data Science</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="devops">DevOps</option>
                                            <option value="cybersecurity">Cybersecurity</option>
                                            <option value="gamedev">Game Development</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

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
                                    {trilhasDisponiveis
                                        .filter(trilha => {
                                            const nivelMatch = filtroDificuldade === 'todos' || trilha.dificuldade === filtroDificuldade;
                                            const categoriaMatch = filtroCategoria === 'todos' || trilha.nome.toLowerCase().includes(filtroCategoria);
                                            return nivelMatch && categoriaMatch;
                                        })
                                        .map((trilha) => (
                                            <div key={trilha.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => setSelectedTrilha(trilha)}>
                                                <div className="text-center mb-4">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{trilha.nome}</h3>
                                                </div>
                                                <p className="text-gray-600 text-sm mb-4">{trilha.descricao}</p>
                                                <div className="flex justify-between text-sm text-gray-500 mb-4">
                                                    <span>📅 {getDuracaoForTrilha(trilha.modulos)}</span>
                                                    <span>🎯 {trilha.dificuldade}</span>
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
                                <button onClick={() => setSelectedTrilha(null)} className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer">← Voltar às Trilhas</button>
                                <div className="text-left sm:text-right">
                                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{selectedTrilha.dificuldade}</span>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedTrilha.nome}</h2>
                                <p className="text-gray-600 max-w-lg md:max-w-2xl mx-auto text-sm md:text-base">{selectedTrilha.descricao}</p>
                                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4 text-sm text-gray-500">
                                    <span>📅 {getDuracaoForTrilha(selectedTrilha.modulos)}</span>
                                    <span>📚 {selectedTrilha.modulos.length} módulos</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Conteúdo da Trilha</h3>
                                <div className="space-y-4">
                                    {selectedTrilha.modulos.map((modulo: { id: number; titulo: string; descricao: string; duracao: string; videoUrl: string }, _index: number) => (
                                        <ModuleAccordion
                                            key={_index}
                                            index={_index}
                                            modulo={modulo}
                                            status={getModuleStatus(_index)}
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
                    )}
                </div>
            </section>
        </main>
    );
}
