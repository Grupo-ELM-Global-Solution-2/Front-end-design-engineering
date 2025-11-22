import { Link } from "react-router-dom";
import CardIntegrante from "../../components/CardIntegrante/CardIntegrante";
import fotoEnzo from '/img/imagens-integrantes/foto-enzo.jpeg';
import fotoLucas from '/img/imagens-integrantes/foto-lucas.jpeg';
import fotoMilton from '/img/imagens-integrantes/foto-milton.jpeg';

export default function Integrantes() {
    return (
        <main className="main-bg">
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Nossa Equipe</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Conheça os desenvolvedores responsáveis pelo projeto ReIntegrAI</p>
                </div>
            </section>

            <section className="section-padding">
                <div className="max-container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <CardIntegrante foto={fotoEnzo} nome="Enzo Okuizumi" rm="561432" turma="1TDSPG" linkedinUrl="https://www.linkedin.com/in/enzo-okuizumi-b60292256/" githubUrl="https://github.com/EnzoOkuizumiFiap" />
                        <CardIntegrante foto={fotoLucas} nome="Lucas Barros Gouveia" rm="566422" turma="1TDSPG" linkedinUrl="https://www.linkedin.com/in/lucas-barros-gouveia-09b147355/" githubUrl="https://github.com/LuzBGouveia" />
                        <CardIntegrante foto={fotoMilton} nome="Milton Marcelino" rm="564836" turma="1TDSPG" linkedinUrl="http://linkedin.com/in/milton-marcelino-250298142" githubUrl="https://github.com/MiltonMarcelino" />
                    </div>
                </div>
            </section>

            {/* Seção sobre o projeto, explicando objetivos, tecnologias e impacto social  */}
            <section className="section-padding-bg">
                <div className="max-container">
                    <div className="text-left">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">O <Link to="https://github.com/Grupo-ELM-Global-Solution-2/Front-end-design-engineering" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-400 hover:underline">ReIntegrAI</Link> é uma plataforma web desenvolvida como parte da disciplina de Front-End Design Engineering. Seu principal objetivo é oferecer uma interface digital intuitiva e acessível para profissionais em transição de carreira na área de tecnologia, utilizando inteligência artificial para personalizar trilhas de aprendizado.</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">A solução busca simplificar processos como avaliação de perfil, criação de roadmaps personalizados, acompanhamento de progresso gamificado e conexão com comunidades ativas. Tudo isso é feito com base em uma abordagem centrada no usuário, prezando por clareza, simplicidade e inclusão digital.</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Utilizando React + Tailwind CSS, o projeto entrega uma experiência leve, responsiva e funcional, incluindo recursos como avaliações interativas, trilhas personalizadas e suporte visual pensado para usuários com necessidades diversas.</p>
                        <p className="text-gray-600 dark:text-gray-400">Mais do que uma atividade acadêmica, o ReIntegrAI tem como missão promover impacto social real, facilitando o acesso à educação em tecnologia e contribuindo para a inclusão de profissionais em transição no mercado digital.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
