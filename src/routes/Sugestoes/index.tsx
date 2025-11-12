import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Sugestao {
    id: string;
    titulo: string;
    tipo: 'video' | 'artigo' | 'curso' | 'projeto';
    descricao: string;
    duracao: string;
    nivel: string;
    thumbnail: string;
    link: string;
}

const sugestoes: Sugestao[] = [
    {
        id: '1',
        titulo: 'React do Zero ao Avançado',
        tipo: 'video',
        descricao: 'Tutorial completo de React em português do canal Programador a Bordo.',
        duracao: '4 horas',
        nivel: 'Iniciante',
        thumbnail: '🎥',
        link: 'https://www.youtube.com/watch?v=0mYq5LrQN1s'
    },
    {
        id: '2',
        titulo: 'Algoritmos e Estruturas de Dados em JavaScript',
        tipo: 'artigo',
        descricao: 'Guia completo sobre algoritmos essenciais para desenvolvedores.',
        duracao: '25 min leitura',
        nivel: 'Intermediário',
        thumbnail: '📄',
        link: 'https://www.devmedia.com.br/algoritmos-e-estruturas-de-dados-em-javascript/40739'
    },
    {
        id: '3',
        titulo: 'Python do Zero ao Avançado',
        tipo: 'curso',
        descricao: 'Curso gratuito de Python completo na plataforma Alura.',
        duracao: '40 horas',
        nivel: 'Iniciante',
        thumbnail: '🎓',
        link: 'https://www.alura.com.br/curso-online-python-3-introducao-a-nova-versao-da-linguagem'
    },
    {
        id: '4',
        titulo: 'Construindo API REST com Node.js',
        tipo: 'projeto',
        descricao: 'Tutorial prático para criar uma API REST completa com Node.js.',
        duracao: '2.5 horas',
        nivel: 'Intermediário',
        thumbnail: '⚙️',
        link: 'https://www.youtube.com/watch?v=K5QaTfE5ylk'
    },
    {
        id: '5',
        titulo: 'CSS Grid vs Flexbox - Qual usar?',
        tipo: 'video',
        descricao: 'Entenda quando usar Grid ou Flexbox com exemplos práticos.',
        duracao: '18 min',
        nivel: 'Intermediário',
        thumbnail: '🎥',
        link: 'https://www.youtube.com/watch?v=x-4z_u8LcGc'
    },
    {
        id: '6',
        titulo: 'Código Limpo: Princípios e Práticas',
        tipo: 'artigo',
        descricao: 'Resumo dos conceitos de Clean Code aplicados ao desenvolvimento.',
        duracao: '15 min leitura',
        nivel: 'Avançado',
        thumbnail: '📄',
        link: 'https://www.devmedia.com.br/clean-code-principios-e-praticas/28793'
    },
    {
        id: '7',
        titulo: 'Machine Learning com Python',
        tipo: 'curso',
        descricao: 'Curso completo de Machine Learning na Udemy em português.',
        duracao: '42 horas',
        nivel: 'Avançado',
        thumbnail: '🎓',
        link: 'https://www.udemy.com/course/machine-learning-com-python-pt/'
    },
    {
        id: '8',
        titulo: 'React Native: App Mobile Completo',
        tipo: 'projeto',
        descricao: 'Crie seu primeiro aplicativo mobile com React Native.',
        duracao: '3.5 horas',
        nivel: 'Intermediário',
        thumbnail: '📱',
        link: 'https://www.youtube.com/watch?v=1-0W3-8Y5s'
    },
    {
        id: '9',
        titulo: 'Formação Full Stack JavaScript',
        tipo: 'curso',
        descricao: 'Currículo completo para se tornar desenvolvedor full-stack.',
        duracao: '200 horas',
        nivel: 'Iniciante',
        thumbnail: '🎓',
        link: 'https://www.alura.com.br/formacao-js-fullstack'
    },
    {
        id: '10',
        titulo: 'Como Contribuir para Open Source',
        tipo: 'artigo',
        descricao: 'Guia prático para começar a contribuir com projetos open source.',
        duracao: '12 min leitura',
        nivel: 'Intermediário',
        thumbnail: '📄',
        link: 'https://www.alura.com.br/artigos/como-contribuir-com-projetos-open-source'
    },
    {
        id: '11',
        titulo: 'Criando Portfólio Responsivo',
        tipo: 'projeto',
        descricao: 'Desenvolva um portfólio pessoal moderno com HTML, CSS e JS.',
        duracao: '5 horas',
        nivel: 'Iniciante',
        thumbnail: '💼',
        link: 'https://www.youtube.com/watch?v=KErtfknVy0I'
    },
    {
        id: '12',
        titulo: 'Conceitos Avançados de JavaScript',
        tipo: 'video',
        descricao: 'Closures, prototypes, async/await explicados em português.',
        duracao: '50 min',
        nivel: 'Avançado',
        thumbnail: '🎥',
        link: 'https://www.youtube.com/watch?v=i6Oi-YtXnAU'
    }
];

export default function Sugestoes() {
    const navigate = useNavigate();
    const [filtroTipo, setFiltroTipo] = useState<string>('todos');
    const [filtroNivel, setFiltroNivel] = useState<string>('todos');

    const tipos = [
        { value: 'todos', label: 'Todos os tipos' },
        { value: 'video', label: 'Vídeos' },
        { value: 'artigo', label: 'Artigos' },
        { value: 'curso', label: 'Cursos' },
        { value: 'projeto', label: 'Projetos' }
    ];

    const niveis = [
        { value: 'todos', label: 'Todos os níveis' },
        { value: 'Iniciante', label: 'Iniciante' },
        { value: 'Intermediário', label: 'Intermediário' },
        { value: 'Avançado', label: 'Avançado' }
    ];

    const sugestoesFiltradas = sugestoes.filter(sugestao => {
        const tipoMatch = filtroTipo === 'todos' || sugestao.tipo === filtroTipo;
        const nivelMatch = filtroNivel === 'todos' || sugestao.nivel === filtroNivel;
        return tipoMatch && nivelMatch;
    });

    const getTipoIcon = (tipo: string) => {
        switch (tipo) {
            case 'video': return '🎥';
            case 'artigo': return '📄';
            case 'curso': return '🎓';
            case 'projeto': return '⚙️';
            default: return '📚';
        }
    };

    const getTipoLabel = (tipo: string) => {
        switch (tipo) {
            case 'video': return 'Vídeo';
            case 'artigo': return 'Artigo';
            case 'curso': return 'Curso';
            case 'projeto': return 'Projeto';
            default: return tipo;
        }
    };

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Sugestões e Dicas
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                        Conteúdo selecionado para acelerar seu aprendizado na programação
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-container">
                    <button onClick={() => navigate('/perfil')} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        ← Perfil
                    </button>
                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Filtrar Sugestões</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Conteúdo</label>
                                <select
                                    value={filtroTipo}
                                    onChange={(e) => setFiltroTipo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {tipos.map(tipo => (
                                        <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Dificuldade</label>
                                <select
                                    value={filtroNivel}
                                    onChange={(e) => setFiltroNivel(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {niveis.map(nivel => (
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
                                        <div className="text-3xl">{sugestao.thumbnail}</div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            sugestao.nivel === 'Iniciante' ? 'bg-green-100 text-green-800' :
                                            sugestao.nivel === 'Intermediário' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {sugestao.nivel}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{sugestao.titulo}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{sugestao.descricao}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span>{getTipoIcon(sugestao.tipo)}</span>
                                            <span>{getTipoLabel(sugestao.tipo)}</span>
                                            <span>•</span>
                                            <span>{sugestao.duracao}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 pb-6">
                                    <Link to={sugestao.link} target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
