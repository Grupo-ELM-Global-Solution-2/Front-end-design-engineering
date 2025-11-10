import { useState } from 'react';

export default function Avaliacao() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        interesse: '',
        experiencia: '',
        objetivo: '',
        disponibilidade: '',
        motivacao: '',
        habilidades: [] as string[]
    });
    const [trilha, setTrilha] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillToggle = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            habilidades: prev.habilidades.includes(skill)
                ? prev.habilidades.filter(s => s !== skill)
                : [...prev.habilidades, skill]
        }));
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const gerarTrilha = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        let trilhaMock: string[] = [];
        if (formData.interesse === 'frontend') {
            trilhaMock = [
                'Fundamentos Web (HTML/CSS)',
                'JavaScript Moderno',
                'React & Ecossistema',
                'TypeScript',
                'Ferramentas de Build',
                'Testes e Qualidade',
                'Projetos Práticos Avançados'
            ];
        } else if (formData.interesse === 'backend') {
            trilhaMock = [
                'Python Fundamentals',
                'Django Framework',
                'APIs REST com Django REST',
                'Banco de Dados (PostgreSQL)',
                'Autenticação & Segurança',
                'Deploy & DevOps',
                'Microserviços'
            ];
        } else if (formData.interesse === 'dados') {
            trilhaMock = [
                'Estatística & Probabilidade',
                'Python para Ciência de Dados',
                'SQL Avançado',
                'Machine Learning com Scikit-learn',
                'Deep Learning com TensorFlow',
                'Big Data com Spark',
                'Visualização de Dados'
            ];
        } else {
            trilhaMock = [
                'Lógica de Programação',
                'Estruturas de Dados',
                'Algoritmos',
                'Orientação a Objetos',
                'Padrões de Projeto',
                'Arquitetura de Software',
                'Projetos Integradores'
            ];
        }
        setTrilha(trilhaMock);
        setIsLoading(false);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome Completo:</label>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Digite seu nome completo" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">E-mail:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="seu@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Qual é sua principal motivação para aprender programação?</label>
                            <select name="motivacao" value={formData.motivacao} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                                <option value="">Selecione</option>
                                <option value="carreira">Mudar de carreira</option>
                                <option value="evolucao">Evoluir na carreira atual</option>
                                <option value="empreendedorismo">Criar meu próprio negócio</option>
                                <option value="conhecimento">Aprender por curiosidade</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Área de Interesse:</label>
                            <select name="interesse" value={formData.interesse} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                                <option value="">Selecione</option>
                                <option value="frontend">Frontend (Interfaces Web)</option>
                                <option value="backend">Backend (Servidores e APIs)</option>
                                <option value="dados">Ciência de Dados</option>
                                <option value="fullstack">Full Stack (Ambos)</option>
                                <option value="mobile">Desenvolvimento Mobile</option>
                                <option value="outro">Outro/Ainda não sei</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Nível de Experiência Atual:</label>
                            <select name="experiencia" value={formData.experiencia} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                                <option value="">Selecione</option>
                                <option value="nenhuma">Nenhuma experiência</option>
                                <option value="basica">Conhecimentos básicos (HTML/CSS, lógica)</option>
                                <option value="intermediario">Intermediário (uma linguagem, projetos simples)</option>
                                <option value="avancado">Avançado (múltiplas linguagens, projetos complexos)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-4">Quais tecnologias você já conhece? (selecione todas que se aplicam)</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C#', 'React', 'Node.js', 'SQL', 'Git', 'Linux'].map(skill => (
                                    <button key={skill} onClick={() => handleSkillToggle(skill)}
                                        className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                                            formData.habilidades.includes(skill)
                                                ? 'bg-blue-100 border-blue-500 text-blue-700'
                                                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Objetivo Principal:</label>
                            <select name="objetivo" value={formData.objetivo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                                <option value="">Selecione</option>
                                <option value="emprego">Encontrar primeiro emprego em tech</option>
                                <option value="promocao">Conseguir promoção na empresa atual</option>
                                <option value="freelance">Trabalhar como freelancer</option>
                                <option value="startup">Criar minha própria startup</option>
                                <option value="consultoria">Oferecer consultoria</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Quanto tempo você pode dedicar aos estudos por semana?</label>
                            <select name="disponibilidade" value={formData.disponibilidade} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
                                <option value="">Selecione</option>
                                <option value="5-10">5-10 horas</option>
                                <option value="10-20">10-20 horas</option>
                                <option value="20-30">20-30 horas</option>
                                <option value="30+">Mais de 30 horas</option>
                            </select>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="text-center space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-900 mb-4">Confirme seus dados</h3>
                            <div className="text-left space-y-2 text-sm">
                                <p><strong>Nome:</strong> {formData.nome}</p>
                                <p><strong>E-mail:</strong> {formData.email}</p>
                                <p><strong>Área:</strong> {formData.interesse}</p>
                                <p><strong>Experiência:</strong> {formData.experiencia}</p>
                                <p><strong>Objetivo:</strong> {formData.objetivo}</p>
                                <p><strong>Disponibilidade:</strong> {formData.disponibilidade}</p>
                            </div>
                        </div>
                        <button onClick={gerarTrilha} disabled={isLoading} className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Analisando seu perfil...</span>
                                </div>
                            ) : (
                                'Gerar Minha Trilha Personalizada'
                            )}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="bg-gray-50 text-gray-900 min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Avaliação de Perfil</h1>
                <p className="text-center text-lg mb-12">Complete seu perfil para receber uma trilha de aprendizado personalizada com IA.</p>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map(step => (
                            <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                                }`}>
                                    {step}
                                </div>
                                {step < 4 && (
                                    <div className={`flex-1 h-1 mx-2 ${
                                        step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Informações Pessoais</span>
                        <span>Experiência & Habilidades</span>
                        <span>Objetivos</span>
                        <span>Confirmação</span>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md mb-8 hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-2xl font-semibold mb-6">
                        {currentStep === 1 && 'Informações Pessoais'}
                        {currentStep === 2 && 'Sua Experiência Atual'}
                        {currentStep === 3 && 'Seus Objetivos'}
                        {currentStep === 4 && 'Pronto para começar!'}
                    </h2>

                    {renderStepContent()}

                    {currentStep < 4 && (
                        <div className="flex justify-between mt-8">
                            <button onClick={prevStep} disabled={currentStep === 1} className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                                Anterior
                            </button>
                            <button onClick={nextStep} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md">
                                Próximo
                            </button>
                        </div>
                    )}
                </div>

                {trilha.length > 0 && (
                    <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold text-green-900">Sua Trilha Personalizada Está Pronta!</h2>
                            <p className="text-gray-600 mt-2">Baseada na sua avaliação, criamos um roadmap sob medida para você.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {trilha.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-200">
                                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="text-lg font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-linear-to-r from-blue-50 to-purple-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quer acessar trilhas completas?</h3>
                            <p className="text-gray-600 mb-4">Com acompanhamento gamificado, projetos reais e mentoria personalizada.</p>
                            <button className="bg-linear-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg">
                                Começar Minha Jornada Gratuitamente
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
