import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "O que é a ReIntegrAI?",
            answer: "A ReIntegrAI é uma plataforma inteligente que utiliza inteligência artificial para identificar o perfil do usuário, criar trilhas personalizadas de aprendizado e acelerar a entrada no mercado digital, especialmente para profissionais em transição de carreira."
        },
        {
            question: "Como funciona a avaliação de perfil?",
            answer: "Através de um questionário interativo, nossa IA analisa suas habilidades, interesses e objetivos para criar um roadmap personalizado com cursos, projetos e recursos alinhados ao seu ritmo e meta profissional."
        },
        {
            question: "A plataforma é gratuita?",
            answer: "Sim, oferecemos uma avaliação gratuita e trilhas básicas. Para acesso completo com acompanhamento gamificado, projetos reais e mentoria personalizada, há opções premium."
        },
        {
            question: "Quais áreas de tecnologia são cobertas?",
            answer: "Cobrimos frontend, backend, ciência de dados, desenvolvimento mobile, full stack e outras áreas emergentes do mercado tech."
        },
        {
            question: "Preciso de experiência prévia para começar?",
            answer: "Não! A plataforma é projetada para todos os níveis, desde iniciantes até profissionais experientes que querem evoluir."
        },
        {
            question: "Como acompanho meu progresso?",
            answer: "Utilizamos um sistema gamificado com conquistas, níveis e desafios para manter você motivado durante toda a jornada."
        },
        {
            question: "Há suporte da comunidade?",
            answer: "Sim, conecte-se com outros profissionais em transição de carreira através da nossa comunidade ativa."
        },
        {
            question: "Posso acessar de qualquer dispositivo?",
            answer: "Absolutamente! A plataforma é responsiva e funciona perfeitamente em desktop, tablet e mobile."
        }
    ];

    return (
        <main className="bg-linear-to-br from-indigo-50 via-white to-purple-50 text-gray-900 min-h-screen">
            {/* Hero Section */}
            <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Perguntas Frequentes
                    </h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                        Tire suas dúvidas sobre a ReIntegrAI e descubra como podemos transformar sua carreira
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full text-left p-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-gray-900 pr-4">{faq.question}</h3>
                                            <div className={`shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center transition-transform duration-200 ${
                                                openIndex === index ? 'rotate-180 bg-indigo-200' : ''
                                            }`}>
                                                <svg
                                                    className="w-5 h-5 text-indigo-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-8 pb-8 border-t border-gray-100">
                                            <p className="text-gray-600 leading-relaxed text-lg pt-4">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">Não encontrou sua resposta?</h3>
                            <p className="text-indigo-100 mb-6 text-lg">
                                Nossa equipe está pronta para ajudar você a dar o próximo passo na sua carreira tech
                            </p>
                            <Link to="/contato" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                                Entre em Contato
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
