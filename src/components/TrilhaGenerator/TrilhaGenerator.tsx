import { useState } from 'react';
import { useTrilhaPersonalizada } from '../../hooks/useApiTrilhaPersonalizada';
import type { TrilhaStep } from '../../data/trilhaSteps';

interface TrilhaGeneratorProps {
    onTrilhaGerada: (trilha: TrilhaStep[]) => void;
    onCancel: () => void;
}

export default function TrilhaGenerator({ onTrilhaGerada, onCancel }: TrilhaGeneratorProps) {
    const { gerarTrilhaPersonalizada, loading } = useTrilhaPersonalizada();
    const [formData, setFormData] = useState({
        objetivo: '',
        experiencia: '',
        tempoDisponivel: '',
        preferencias: [] as string[]
    });

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
        try {
            const savedTrilha = await gerarTrilhaPersonalizada(formData);
            if (savedTrilha) {
                // Get the steps from the saved trilha
                const { getTrilhaSteps } = await import('../../data/trilhaSteps');
                const steps = getTrilhaSteps(formData.objetivo);
                onTrilhaGerada(steps);
            }
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
            onTrilhaGerada(trilha.map(title => ({ title } as TrilhaStep)));
        }
    };

    return (
        <div className="card-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configure sua Nova Trilha</h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo Principal</label>
                    <select name="objetivo" value={formData.objetivo} onChange={handleChange} className="form-input">
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
                    <select name="experiencia" value={formData.experiencia} onChange={handleChange} className="form-input">
                        <option value="">Selecione</option>
                        <option value="iniciante">Iniciante</option>
                        <option value="intermediario">Intermediário</option>
                        <option value="avancado">Avançado</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tempo Disponível por Semana</label>
                    <select name="tempoDisponivel" value={formData.tempoDisponivel} onChange={handleChange} className="form-input">
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

                <div className="flex space-x-4">
                    <button onClick={gerarTrilha} disabled={loading || !formData.objetivo || !formData.experiencia || !formData.tempoDisponivel} className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Gerando sua trilha com IA...</span>
                            </div>
                        ) : (
                            'Gerar Trilha Personalizada'
                        )}
                    </button>
                    <button onClick={onCancel} className="btn-secondary flex-1">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
