import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../../data/faq';

export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="main-bg">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Perguntas Frequentes</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Tire suas dúvidas sobre a ReIntegrAI e descubra como podemos transformar sua carreira</p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-container">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                                    <button onClick={() => toggleFAQ(index)} className="w-full text-left p-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 pr-4">{faq.question}</h3>
                                            <div className={`shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center transition-transform duration-200 ${openIndex === index ? 'rotate-180 bg-indigo-200 dark:bg-indigo-800' : ''}`}>
                                                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </button>
                                    {openIndex === index && (
                                        <div className="px-8 pb-8 border-t border-gray-100 dark:border-gray-700">
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg pt-4">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="mt-16 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-2xl p-8 text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">Não encontrou sua resposta?</h3>
                            <p className="text-indigo-100 dark:text-indigo-200 mb-6 text-lg">Nossa equipe está pronta para ajudar você a dar o próximo passo na sua carreira tech</p>
                            <Link to="/contato" className="inline-block bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-lg">Entre em Contato</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
