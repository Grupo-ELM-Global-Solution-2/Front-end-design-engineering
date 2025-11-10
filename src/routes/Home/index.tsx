import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main className="bg-white text-gray-900">
            
            {/* Hero Section */}
            <section className="bg-indigo-50 py-24 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Sua nova carreira em tech começa aqui
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                    Plataforma inteligente que identifica seu perfil, cria trilhas personalizadas e acelera sua entrada no mercado digital
                </p>
                <div className="flex justify-center space-x-4">
                    {/* Botão com hover */}
                    <Link 
                        to="/avaliacao" 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                    >
                        Começar agora
                    </Link>
                    {/* Botão com hover */}
                    <button 
                        className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold border border-indigo-200 hover:bg-indigo-100 hover:scale-105 transition-all duration-300"
                    >
                        Ver como funciona
                    </button>
                </div>
            </section>

            {/* Como Funciona */}
            <section className="bg-gray-50 py-20 px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Como funciona</h2>
                <p className="text-center text-lg text-gray-600 mb-12">Três passos simples para transformar sua carreira</p>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    
                    {/* Card 1 com hover */}
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">IA Analisa Seu Perfil</h3>
                        <p className="text-gray-600">
                            Nossa inteligência artificial identifica suas habilidades, interesses e objetivos para criar uma experiência personalizada.
                        </p>
                    </div>
                    
                    {/* Card 2 com hover */}
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Trilha Personalizada</h3>
                        <p className="text-gray-600">
                            Receba um roadmap sob medida com cursos, projetos e recursos alinhados ao seu ritmo e à sua meta profissional.
                        </p>
                    </div>
                    
                    {/* Card 3 com hover */}
                    <div className="text-center p-8 bg-white rounded-lg shadow-lg flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Progresso Gamificado</h3>
                        <p className="text-gray-600">
                            Acompanhe sua evolução com conquistas, níveis e desafios que mantêm você motivado durante toda a jornada.
                        </p>
                    </div>
                </div>
            </section>

            {/* Por que escolher */}
            <section className="bg-white py-20 px-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Por que escolher a ReIntegrAI?</h2>
                <p className="text-center text-lg text-gray-600 mb-12">Benefícios que fazem a diferença na sua jornada</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    
                    {/* Card 1 com hover */}
                    <div className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aprendizado Acelerado</h3>
                        <p className="text-gray-600 text-sm">Metodologia otimizada por IA para você aprender mais rápido e melhor.</p>
                    </div>
                    
                    {/* Card 2 com hover */}
                    <div className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Comunidade Ativa</h3>
                        <p className="text-gray-600 text-sm">Conecte-se com outros profissionais em transição de carreira.</p>
                    </div>
                    
                    {/* Card 3 com hover */}
                    <div className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Alinhado ao Mercado</h3>
                        <p className="text-gray-600 text-sm">Conteúdo atualizado com as demandas reais das empresas tech.</p>
                    </div>
                    
                    {/* Card 4 com hover */}
                    <div className="text-center p-6 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Seu Ritmo</h3>
                        <p className="text-gray-600 text-sm">Estude quando e onde quiser, adaptando-se à sua rotina.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-50 py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Pronto para decolar na carreira tech?</h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
                    Junte-se a milhares de profissionais que já transformaram suas carreiras com a ReIntegrAI
                </p>
                {/* Botão com hover */}
                <Link 
                    to="/avaliacao" 
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                >
                    Começar gratuitamente
                </Link>
            </section>
        </main>
    );
}