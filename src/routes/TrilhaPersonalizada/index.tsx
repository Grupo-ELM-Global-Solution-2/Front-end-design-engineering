import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrilhaPersonalizada() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        objetivo: '',
        experiencia: '',
        tempoDisponivel: '',
        preferencias: [] as string[]
    });
    const [trilhaGerada, setTrilhaGerada] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePreferenceToggle = (preference: string) => {
        setFormData(prev => ({
            ...prev,
            preferencias: prev.preferencias.includes(preference)
                ? prev.preferencias.filter(p => p !== preference)
                : [...prev.preferencias, preference]
        }));
    };

    const gerarTrilha = async () => {
        setIsLoading(true);

        try {
            // Save assessment to JSON-server
            const assessmentData: {
                nome: string;
                email: string;
                interesse: string;
                experiencia: string;
                objetivo: string;
                disponibilidade: string;
                motivacao: string;
                habilidades: string[];
                trilha: Array<{id: string, title: string, description: string, duration: string, resources: string[]}>;
            } = {
                nome: localStorage.getItem('userName') || 'Usuário',
                email: localStorage.getItem('userEmail') || '',
                interesse: formData.objetivo,
                experiencia: formData.experiencia,
                objetivo: 'emprego', // Default
                disponibilidade: formData.tempoDisponivel,
                motivacao: 'carreira', // Default
                habilidades: [], // Default empty
                trilha: [] // Will be populated below
            };

            // Generate trail based on objective
            let trilhaSteps: Array<{id: string, title: string, description: string, duration: string, resources: string[]}> = [];

            if (formData.objetivo === 'frontend') {
                trilhaSteps = [
                    {
                        id: '1',
                        title: 'HTML5 e CSS3 Avançado',
                        description: 'Aprenda os conceitos avançados de HTML e CSS',
                        duration: '2 semanas',
                        resources: ['MDN Web Docs', 'CSS Tricks']
                    },
                    {
                        id: '2',
                        title: 'JavaScript ES6+',
                        description: 'Domine JavaScript moderno',
                        duration: '4 semanas',
                        resources: ['JavaScript.info', 'Eloquent JavaScript']
                    },
                    {
                        id: '3',
                        title: 'React.js e Ecossistema',
                        description: 'Construa aplicações com React',
                        duration: '6 semanas',
                        resources: ['React Docs', 'React Router']
                    },
                    {
                        id: '4',
                        title: 'TypeScript',
                        description: 'Adicione tipagem ao seu JavaScript',
                        duration: '3 semanas',
                        resources: ['TypeScript Handbook']
                    },
                    {
                        id: '5',
                        title: 'Ferramentas de Build',
                        description: 'Aprenda Vite, Webpack e outras ferramentas',
                        duration: '2 semanas',
                        resources: ['Vite Docs', 'Webpack Docs']
                    },
                    {
                        id: '6',
                        title: 'Testes e Qualidade',
                        description: 'Escreva testes e garanta qualidade',
                        duration: '3 semanas',
                        resources: ['Jest Docs', 'Testing Library']
                    },
                    {
                        id: '7',
                        title: 'Deploy e Otimização',
                        description: 'Implante e otimize suas aplicações',
                        duration: '2 semanas',
                        resources: ['Vercel Docs', 'Netlify Docs']
                    }
                ];
            } else if (formData.objetivo === 'backend') {
                trilhaSteps = [
                    {
                        id: '1',
                        title: 'Python Fundamentals',
                        description: 'Aprenda Python do zero',
                        duration: '3 semanas',
                        resources: ['Python Docs', 'Automate the Boring Stuff']
                    },
                    {
                        id: '2',
                        title: 'Django Framework',
                        description: 'Crie aplicações web com Django',
                        duration: '5 semanas',
                        resources: ['Django Docs', 'Django for Beginners']
                    },
                    {
                        id: '3',
                        title: 'APIs REST com Django REST',
                        description: 'Construa APIs RESTful',
                        duration: '4 semanas',
                        resources: ['DRF Docs']
                    },
                    {
                        id: '4',
                        title: 'Banco de Dados PostgreSQL',
                        description: 'Trabalhe com bancos de dados relacionais',
                        duration: '3 semanas',
                        resources: ['PostgreSQL Docs']
                    },
                    {
                        id: '5',
                        title: 'Autenticação e Segurança',
                        description: 'Implemente autenticação segura',
                        duration: '2 semanas',
                        resources: ['Django Auth Docs']
                    },
                    {
                        id: '6',
                        title: 'Docker e Containers',
                        description: 'Containerize suas aplicações',
                        duration: '2 semanas',
                        resources: ['Docker Docs']
                    },
                    {
                        id: '7',
                        title: 'Deploy na Nuvem',
                        description: 'Implante na nuvem',
                        duration: '2 semanas',
                        resources: ['Heroku Docs', 'AWS Docs']
                    }
                ];
            } else if (formData.objetivo === 'fullstack') {
                trilhaSteps = [
                    {
                        id: '1',
                        title: 'Fundamentos Web',
                        description: 'HTML, CSS e JavaScript básico',
                        duration: '3 semanas',
                        resources: ['MDN Web Docs', 'freeCodeCamp']
                    },
                    {
                        id: '2',
                        title: 'JavaScript Full Stack',
                        description: 'JavaScript para frontend e backend',
                        duration: '4 semanas',
                        resources: ['Node.js Docs', 'Express Docs']
                    },
                    {
                        id: '3',
                        title: 'React.js',
                        description: 'Framework frontend moderno',
                        duration: '5 semanas',
                        resources: ['React Docs']
                    },
                    {
                        id: '4',
                        title: 'Node.js e Express',
                        description: 'Backend com Node.js',
                        duration: '4 semanas',
                        resources: ['Node.js Docs', 'Express Docs']
                    },
                    {
                        id: '5',
                        title: 'Banco de Dados',
                        description: 'SQL e NoSQL databases',
                        duration: '3 semanas',
                        resources: ['SQLZoo', 'MongoDB Docs']
                    },
                    {
                        id: '6',
                        title: 'APIs e Integração',
                        description: 'Conecte frontend e backend',
                        duration: '3 semanas',
                        resources: ['REST API Docs']
                    },
                    {
                        id: '7',
                        title: 'Autenticação',
                        description: 'Implemente login e segurança',
                        duration: '2 semanas',
                        resources: ['JWT.io', 'Passport.js']
                    },
                    {
                        id: '8',
                        title: 'Deploy Full Stack',
                        description: 'Implante aplicações completas',
                        duration: '2 semanas',
                        resources: ['Vercel Docs', 'Railway Docs']
                    }
                ];
            } else {
                trilhaSteps = [
                    {
                        id: '1',
                        title: 'Lógica de Programação',
                        description: 'Fundamentos da programação',
                        duration: '2 semanas',
                        resources: ['Khan Academy', 'Codecademy']
                    },
                    {
                        id: '2',
                        title: 'Estruturas de Dados',
                        description: 'Organize e manipule dados',
                        duration: '4 semanas',
                        resources: ['GeeksforGeeks', 'LeetCode']
                    },
                    {
                        id: '3',
                        title: 'Algoritmos',
                        description: 'Resolva problemas eficientemente',
                        duration: '4 semanas',
                        resources: ['CLRS Book', 'Algorithm Visualizer']
                    },
                    {
                        id: '4',
                        title: 'Banco de Dados',
                        description: 'Armazene e consulte dados',
                        duration: '3 semanas',
                        resources: ['SQLZoo', 'Database Design']
                    },
                    {
                        id: '5',
                        title: 'Desenvolvimento Web',
                        description: 'Crie aplicações web',
                        duration: '5 semanas',
                        resources: ['MDN Web Docs', 'freeCodeCamp']
                    },
                    {
                        id: '6',
                        title: 'Ferramentas e Versionamento',
                        description: 'Git, GitHub e ferramentas de desenvolvimento',
                        duration: '2 semanas',
                        resources: ['Git Docs', 'GitHub Guides']
                    },
                    {
                        id: '7',
                        title: 'Projetos Práticos',
                        description: 'Aplique o conhecimento em projetos reais',
                        duration: '4 semanas',
                        resources: ['Project Ideas', 'Portfolio Sites']
                    }
                ];
            }

            assessmentData.trilha = trilhaSteps;

            // Save to JSON-server
            const response = await fetch('http://localhost:3001/assessments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assessmentData),
            });

            if (response.ok) {
                const savedAssessment = await response.json();
                console.log('Assessment saved:', savedAssessment);
            }

            // Set generated trail for display
            setTrilhaGerada(trilhaSteps.map(step => step.title));

        } catch (err) {
            console.error('Erro ao gerar trilha:', err);
            // Fallback to simulated generation
            let trilha: string[] = [];
            if (formData.objetivo === 'frontend') {
                trilha = ['HTML5 e CSS3', 'JavaScript', 'React.js', 'TypeScript'];
            } else if (formData.objetivo === 'backend') {
                trilha = ['Python', 'Django', 'PostgreSQL', 'APIs'];
            } else {
                trilha = ['Lógica', 'Estruturas de Dados', 'Algoritmos', 'Projetos'];
            }
            setTrilhaGerada(trilha);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="main-bg min-h-screen">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Trilha Personalizada com IA
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                        Nossa inteligência artificial cria um roadmap sob medida para você
                    </p>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-container">
                    <button onClick={() => navigate('/perfil')} className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center">
                        ← Perfil
                    </button>
                    
                    {!trilhaGerada.length ? (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure sua Trilha</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo Principal</label>
                                    <select
                                        name="objetivo"
                                        value={formData.objetivo}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="frontend">Desenvolvimento Frontend</option>
                                        <option value="backend">Desenvolvimento Backend</option>
                                        <option value="fullstack">Full Stack</option>
                                        <option value="dados">Ciência de Dados</option>
                                        <option value="mobile">Desenvolvimento Mobile</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Experiência</label>
                                    <select
                                        name="experiencia"
                                        value={formData.experiencia}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="iniciante">Iniciante</option>
                                        <option value="intermediario">Intermediário</option>
                                        <option value="avancado">Avançado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tempo Disponível por Semana</label>
                                    <select
                                        name="tempoDisponivel"
                                        value={formData.tempoDisponivel}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Selecione</option>
                                        <option value="5-10">5-10 horas</option>
                                        <option value="10-20">10-20 horas</option>
                                        <option value="20-30">20-30 horas</option>
                                        <option value="30+">Mais de 30 horas</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">Preferências de Aprendizado</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {['Vídeos', 'Artigos', 'Projetos Práticos', 'Cursos Online', 'Livros', 'Mentoria'].map(pref => (
                                            <button
                                                key={pref}
                                                onClick={() => handlePreferenceToggle(pref)}
                                                className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    formData.preferencias.includes(pref)
                                                        ? 'bg-blue-100 border-blue-500 text-blue-700'
                                                        : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                                }`}
                                            >
                                                {pref}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={gerarTrilha}
                                    disabled={isLoading || !formData.objetivo || !formData.experiencia || !formData.tempoDisponivel}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Gerando sua trilha com IA...</span>
                                        </div>
                                    ) : (
                                        'Gerar Trilha Personalizada'
                                    )}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-green-900">Sua Trilha Está Pronta!</h2>
                                <p className="text-gray-600 mt-2">Baseada nas suas respostas, criamos um roadmap personalizado</p>
                            </div>

                            <div className="space-y-4 mb-8">
                                {trilhaGerada.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item}</h3>
                                            <p className="text-sm text-gray-600">Duração estimada: 2-3 semanas</p>
                                        </div>
                                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                                            Começar
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setTrilhaGerada([])}
                                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                                >
                                    Refazer Trilha
                                </button>
                                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                    Salvar Trilha
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
