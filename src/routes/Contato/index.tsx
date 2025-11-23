import { useState } from 'react';
import { ContatoSchema } from '../../schemas';
import { ZodError } from 'zod';

export default function Contato() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Limpa erros ao digitar
        if (error) setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Valida os dados com Zod
            const validatedData = ContatoSchema.parse(formData);

            // Salva a mensagem no localStorage
            const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            const newContact = {
                ...validatedData,
                id: Date.now(),
                timestamp: new Date().toISOString()
            };
            contacts.push(newContact);
            localStorage.setItem('contactMessages', JSON.stringify(contacts));

            // Mostra mensagem de sucesso
            setSuccess(true);
            setFormData({ nome: '', email: '', assunto: '', mensagem: '' });

            // Remove mensagem de sucesso após 5 segundos
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            if (err instanceof ZodError) {
                setError(err.issues[0].message);
            } else {
                setError('Erro ao enviar mensagem');
            }
        }
    };

    return (
        <main className="main-bg">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="max-container">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Entre em Contato</h1>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Estamos aqui para ajudar você a dar o próximo passo na sua carreira tech</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-6">
                <div className="max-container">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Vamos Conversar</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">Tem dúvidas sobre nossa plataforma? Quer saber mais sobre como podemos ajudar na sua transição de carreira? Entre em contato conosco!</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">E-mail</h3>
                                        <p className="text-gray-600 dark:text-gray-400">contato@reintegr.ai</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Telefone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">(11) 99999-9999</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Localização</h3>
                                        <p className="text-gray-600 dark:text-gray-400">São Paulo, SP - Brasil</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Horário de Atendimento</h3>
                                <p className="text-gray-600 dark:text-gray-400">Segunda a Sexta: 9h às 18h</p>
                                <p className="text-gray-600 dark:text-gray-400">Sábado: 9h às 12h</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Envie sua Mensagem</h3>

                            {success && (
                                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <p className="text-green-600 dark:text-green-400 font-semibold">✓ Mensagem enviada com sucesso!</p>
                                    <p className="text-green-600 dark:text-green-400 text-sm mt-1">Entraremos em contato em breve.</p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-red-600 dark:text-red-400 font-semibold">✗ Erro na validação</p>
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome Completo</label>
                                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Seu nome completo" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="seu@email.com" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assunto</label>
                                    <select name="assunto" value={formData.assunto} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required>
                                        <option value="">Selecione um assunto</option>
                                        <option value="duvida">Dúvida sobre a plataforma</option>
                                        <option value="suporte">Suporte técnico</option>
                                        <option value="parceria">Parceria/Colaboração</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensagem</label>
                                    <textarea name="mensagem" value={formData.mensagem} onChange={handleChange} rows={5} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" placeholder="Digite sua mensagem aqui..." required />
                                </div>

                                <button type="submit" className="w-full bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-800 dark:hover:to-purple-800 hover:scale-105 transition-all duration-300 shadow-lg">Enviar Mensagem</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
