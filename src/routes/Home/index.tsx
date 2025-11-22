import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';

export default function Home() {

    return (
        <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

            {/* Hero Section */}
            <section className="bg-indigo-50 dark:bg-gray-800 py-24 px-6 text-center transition-colors duration-300">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">Sua nova carreira em tech começa aqui</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">Plataforma inteligente que identifica seu perfil, cria trilhas personalizadas e acelera sua entrada no mercado digital</p>
                <div className="flex justify-center space-x-4">
                    {/* Botão com hover */}
                    <Link to="/avaliacao" className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:scale-105 transition-all duration-300">Começar agora</Link>
                    {/* Botão com hover */}
                    <Link to="/avaliacao" className="bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-full font-semibold border border-indigo-200 dark:border-gray-600 hover:bg-indigo-100 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-300">Ver como funciona</Link>
                </div>
            </section>

            {/* Como Funciona */}
            <section className="section-padding-bg">
                <h2 className="section-title">Como funciona</h2>
                <p className="section-subtitle">Três passos simples para transformar sua carreira</p>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <Card icon="1" iconClassName="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 w-12 h-12 rounded-lg" title="IA Analisa Seu Perfil" description="Nossa inteligência artificial identifica suas habilidades, interesses e objetivos para criar uma experiência personalizada." className="shadow-lg flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300" />
                    <Card icon="2" iconClassName="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 w-12 h-12 rounded-lg" title="Trilha Personalizada" description="Receba um roadmap sob medida com cursos, projetos e recursos alinhados ao seu ritmo e à sua meta profissional." className="shadow-lg flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300" />
                    <Card icon="3" iconClassName="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 w-12 h-12 rounded-lg" title="Progresso Gamificado" description="Acompanhe sua evolução com conquistas, níveis e desafios que mantêm você motivado durante toda a jornada." className="shadow-lg flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300" />
                </div>
            </section>

            {/* Por que escolher */}
            <section className="section-padding">
                <h2 className="section-title">Por que escolher a ReIntegrAI?</h2>
                <p className="section-subtitle">Benefícios que fazem a diferença na sua jornada</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <Card title="Aprendizado Acelerado" description="Metodologia otimizada por IA para você aprender mais rápido e melhor." className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300" variant="benefit" />
                    <Card title="Progresso Gamificado" description="Acompanhe seu progresso com conquistas e níveis que mantêm você motivado." className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300" variant="benefit" />
                    <Card title="Alinhado ao Mercado" description="Conteúdo atualizado com as demandas reais das empresas tech." className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300" variant="benefit" />
                    <Card title="No Seu Ritmo" description="Estude quando e onde quiser, adaptando-se à sua rotina." className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300" variant="benefit" />
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding-bg text-center">
                <h2 className="section-title">Pronto para decolar na carreira tech?</h2>
                <p className="section-subtitle">Responda algumas perguntas e receba uma trilha de aprendizado personalizada com IA</p>
                {/* Botão com hover */}
                <Link to="/avaliacao" className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:scale-105 transition-all duration-300">Comece Aqui!</Link>
            </section>
        </main>
    );
}