
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useApiUsuarios';
import { useTheme } from '../../contexts/ThemeContext';

export default function Cabecalho() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">ReIntegrAI</NavLink>
                    </div>

                    <button className="hidden max-[951px]:block" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="https://www.svgrepo.com/show/510067/menu.svg" alt="Menu" className="w-10 dark:invert" />
                    </button>
                    <div className={`
                        ${menuOpen ? "block" : "hidden"}
                        min-[951px]:flex min-[951px]:items-center min-[951px]:space-x-4
                        max-[951px]:absolute max-[951px]:top-full max-[951px]:left-0 max-[951px]:w-full max-[951px]:bg-white dark:max-[951px]:bg-gray-800 max-[951px]:shadow-lg max-[951px]:border-t max-[951px]:border-gray-200 dark:max-[951px]:border-gray-700 max-[951px]:py-6
                    `}>
                        <div className="flex flex-col items-center w-full min-[951px]:flex-row min-[951px]:w-auto space-y-4 min-[951px]:space-y-0 min-[951px]:space-x-4">
                            <NavLink to="/" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' : ''}`}>Home</NavLink>
                            <NavLink to="/avaliacao" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' : ''}`}>Avaliação</NavLink>
                            <NavLink to="/integrantes" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' : ''}`}>Integrantes</NavLink>
                            <NavLink to="/faq" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' : ''}`}>FAQ</NavLink>
                            <NavLink to="/contato" className={({ isActive }) => `text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700' : ''}`}>Contato</NavLink>
                            {isAuthenticated() ? (
                                <NavLink to="/perfil" className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-4 min-[951px]:py-2 min-[951px]:text-sm">
                                    Perfil
                                </NavLink>
                            ) : (
                                <NavLink to="/login" className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-4 min-[951px]:py-2 min-[951px]:text-sm">
                                    Login
                                </NavLink>
                            )}

                            {/* Botão de Toggle de Tema */}
                            <button onClick={toggleTheme} className="flex items-center justify-center gap-2 px-4 py-3 min-[951px]:py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 w-full min-[951px]:w-auto text-gray-700 dark:text-gray-200" aria-label="Alternar tema">
                                {theme === 'light' ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                        <span className="min-[951px]:hidden">Tema Escuro</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span className="min-[951px]:hidden">Tema Claro</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
