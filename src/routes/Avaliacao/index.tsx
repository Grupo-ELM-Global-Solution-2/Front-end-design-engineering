import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

export default function Avaliacao() {

    return (
        <main className="main-bg">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Avaliação de Perfil</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Complete seu perfil para receber uma trilha de aprendizado personalizada com IA</p>
                </div>
            </section>

            {/* Why Choose ReIntegrAI Section */}
            <section className="section-padding">
                <div className="max-container">
                    <h2 className="section-title">Por que escolher ReIntegrAI?</h2>
                    <p className="section-subtitle">Benefícios que fazem a diferença na sua jornada</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card icon="🎯" title="Personalização IA" description="Trilhas adaptadas ao seu perfil, experiência e objetivos específicos." className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
                        <Card icon="🚀" title="Aceleração de Carreira" description="Reduza o tempo de aprendizado com conteúdo focado e prático." className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
                        <Card icon="🏆" title="Progresso Gamificado" description="Acompanhe seu progresso com conquistas e níveis que mantêm você motivado." className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section-padding-bg">
                <div className="max-container">
                    <h2 className="section-title">Como funciona</h2>
                    <p className="section-subtitle">Três passos simples para transformar sua carreira</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card icon="1" title="Avaliação Inteligente" description="Responda algumas perguntas sobre seu perfil e experiência atual." variant="step" />
                        <Card icon="2" iconClassName="bg-purple-600 text-white" title="Trilha Personalizada" description="Receba um roadmap completo adaptado às suas necessidades." variant="step" />
                        <Card icon="3" iconClassName="bg-green-600 text-white" title="Acompanhamento" description="Acompanhe seu progresso com gamificação e mentoria." variant="step" />
                    </div>
                </div>
            </section>

            {/* Assessment Form Section */}
            <section className="section-padding">
                <div className="max-container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Pronto para decolar na carreira tech?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">Para acessar a avaliação personalizada, faça login ou cadastre-se.</p>
                        <Link to="/perfil" className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-300 shadow-lg">Clique Aqui!</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
