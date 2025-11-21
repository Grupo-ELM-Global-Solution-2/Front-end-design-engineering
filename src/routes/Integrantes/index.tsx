import { Link } from "react-router-dom";
import fotoEnzo from '/img/imagens-integrantes/foto-enzo.jpeg';
import fotoLucas from '/img/imagens-integrantes/foto-lucas.jpeg';
import fotoMilton from '/img/imagens-integrantes/foto-milton.jpeg';

export default function Integrantes(){
    return(
    <main className="main-bg">
        <section className="hero-section">
            <div className="max-container">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Nossa Equipe</h1>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Conheça os desenvolvedores responsáveis pelo projeto ReIntegrAI</p>
            </div>
        </section>

        {/* Cards dos integrantes, com foto, nome, RM, turma e redes sociais  */}
        <section className="section-padding">
            <div className="max-container">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card Integrante 1  */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <img src={fotoEnzo} alt="Foto do Enzo" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                        <div className="integrante-info">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enzo Okuizumi</h3>
                            <p className="text-gray-600 mb-1">RM: 561432</p>
                            <p className="text-gray-600 mb-4">Turma: 1TDSPG</p>
                            <div className="flex justify-center space-x-4">
                                <Link to="https://www.linkedin.com/in/enzo-okuizumi-b60292256/" aria-label="Linkedin Enzo Okuizumi" title="Linkedin Enzo Okuizumi" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">
                                    <img src="https://www.svgrepo.com/show/452047/linkedin-1.svg" alt="LinkedIn" className="w-6 h-6"/>
                                </Link>
                                <Link to="https://github.com/EnzoOkuizumiFiap" aria-label="GitHub Enzo Okuizumi" title="Github Enzo Okuizumi" target="_blank" rel="noopener" className="text-gray-800 hover:text-gray-600">
                                    <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-6 h-6"/>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card Integrante 2  */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <img src={fotoLucas} alt="Foto do Lucas" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                        <div className="integrante-info">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lucas Barros Gouveia</h3>
                            <p className="text-gray-600 mb-1">RM: 566422</p>
                            <p className="text-gray-600 mb-4">Turma: 1TDSPG</p>
                            <div className="flex justify-center space-x-4">
                                <Link to="https://www.linkedin.com/in/lucas-barros-gouveia-09b147355/" aria-label="Linkedin Lucas Barros Gouveia" title="Linkedin Lucas Barros Gouveia" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">
                                    <img src="https://www.svgrepo.com/show/452047/linkedin-1.svg" alt="LinkedIn" className="w-6 h-6"/>
                                </Link>
                                <Link to="https://github.com/LuzBGouveia" aria-label="GitHub Lucas Barros Gouveia" title="GitHub Lucas Barros Gouveia" target="_blank" rel="noopener" className="text-gray-800 hover:text-gray-600">
                                    <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-6 h-6"/>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card Integrante 3  */}
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <img src={fotoMilton} alt="Foto do Milton" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"/>
                        <div className="integrante-info">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Milton Marcelino</h3>
                            <p className="text-gray-600 mb-1">RM: 564836</p>
                            <p className="text-gray-600 mb-4">Turma: 1TDSPG</p>
                            <div className="flex justify-center space-x-4">
                                <Link to="http://linkedin.com/in/milton-marcelino-250298142" aria-label="Linkedin Milton Marcelino" title="Linkedin Milton Marcelino" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800">
                                    <img src="https://www.svgrepo.com/show/452047/linkedin-1.svg" alt="LinkedIn" className="w-6 h-6"/>
                                </Link>
                                <Link to="https://github.com/MiltonMarcelino" aria-label="GitHub Milton Marcelino" title="GitHub Milton Marcelino" target="_blank" rel="noopener" className="text-gray-800 hover:text-gray-600">
                                    <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-6 h-6"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Seção sobre o projeto, explicando objetivos, tecnologias e impacto social  */}
        <section className="section-padding-bg">
            <div className="max-container">
                <div className="text-left">
                    <p className="text-gray-600 mb-4">O <Link to="https://github.com/Grupo-ELM-Challenge-4-Sprint/front-end-design-engineering" target="_blank" rel="noopener" className="text-blue-600 hover:underline">ReIntegrAI</Link> é uma plataforma web desenvolvida como parte da disciplina de Front-End Design Engineering. Seu principal objetivo é oferecer uma interface digital intuitiva e acessível para profissionais em transição de carreira na área de tecnologia, utilizando inteligência artificial para personalizar trilhas de aprendizado.</p>
                    <p className="text-gray-600 mb-4">A solução busca simplificar processos como avaliação de perfil, criação de roadmaps personalizados, acompanhamento de progresso gamificado e conexão com comunidades ativas. Tudo isso é feito com base em uma abordagem centrada no usuário, prezando por clareza, simplicidade e inclusão digital.</p>
                    <p className="text-gray-600 mb-4">Utilizando React + Tailwind CSS, o projeto entrega uma experiência leve, responsiva e funcional, incluindo recursos como avaliações interativas, trilhas personalizadas e suporte visual pensado para usuários com necessidades diversas.</p>
                    <p className="text-gray-600">Mais do que uma atividade acadêmica, o ReIntegrAI tem como missão promover impacto social real, facilitando o acesso à educação em tecnologia e contribuindo para a inclusão de profissionais em transição no mercado digital.</p>
                </div>
            </div>
        </section>
    </main>
    );
}
