import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSugestoes } from '../../hooks/useApiSugestoes';
import type { Sugestao } from '../../types/sugestao';
import { tipos, dificuldades, filtrarSugestoes, getTipoIcon, getTipoLabel } from '../../types/sugestao';

export default function Sugestoes() {
    const navigate = useNavigate();
    const { getSugestoes } = useSugestoes();
    const [filtroTipo, setFiltroTipo] = useState<string>('todos');
    const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos');
    const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);

    useEffect(() => {
        const loadSugestoes = async () => {
            const data = await getSugestoes() as Sugestao[];
            if (data) {
                setSugestoes(data);
            }
        };
        loadSugestoes();
    }, [getSugestoes]);

    const sugestoesFiltradas = filtrarSugestoes(sugestoes, filtroTipo, filtroDificuldade);

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
                    <button onClick={() => navigate('/perfil')} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer">
                        ← Perfil
                    </button>
                    {/* Filtros */}
                    <div className="card-white mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Filtrar Sugestões</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Conteúdo</label>
                                <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="form-input">
                                    {tipos.map(tipo => (
                                        <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Dificuldade</label>
                                <select value={filtroDificuldade} onChange={(e) => setFiltroDificuldade(e.target.value)} className="form-input">
                                    {dificuldades.map(nivel => (
                                        <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Sugestões */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sugestoesFiltradas.map((sugestao) => (
                            <div key={sugestao.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="text-3xl">{getTipoIcon(sugestao.tipo)}</div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            sugestao.dificuldade === 'Iniciante' ? 'bg-green-100 text-green-800' :
                                            sugestao.dificuldade === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {sugestao.dificuldade}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{sugestao.titulo}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{sugestao.descricao}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>{getTipoIcon(sugestao.tipo)}</span>
                                            <span>{getTipoLabel(sugestao.tipo)}</span>
                                            <span>-</span>
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
                        ))}
                    </div>

                    {sugestoesFiltradas.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma sugestão encontrada</h3>
                            <p className="text-gray-600">Tente ajustar os filtros para ver mais resultados.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
