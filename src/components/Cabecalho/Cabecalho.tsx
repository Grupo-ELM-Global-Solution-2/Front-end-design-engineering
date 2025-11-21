
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useApiUsuarios';

export default function Cabecalho() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    return(
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">ReIntegrAI</NavLink>
                    </div>
                    <button className="hidden max-[951px]:block" type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <img src="https://www.svgrepo.com/show/510067/menu.svg" alt="Menu" className="w-10" />
                    </button>
                    <div className={`
                        ${menuOpen ? "block" : "hidden"}
                        min-[951px]:flex min-[951px]:items-center min-[951px]:space-x-4
                        max-[951px]:absolute max-[951px]:top-full max-[951px]:left-0 max-[951px]:w-full max-[951px]:bg-white max-[951px]:shadow-lg max-[951px]:border-t max-[951px]:border-gray-200 max-[951px]:py-6
                    `}>
                        <div className="flex flex-col items-center w-full min-[951px]:flex-row min-[951px]:w-auto space-y-4 min-[951px]:space-y-0 min-[951px]:space-x-4">
                            <NavLink to="/" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>Home</NavLink>
                            <NavLink to="/avaliacao" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>Avaliação</NavLink>
                            <NavLink to="/integrantes" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>Integrantes</NavLink>
                            <NavLink to="/faq" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>FAQ</NavLink>
                            <NavLink to="/contato" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-4 py-3 rounded-lg text-base font-medium hover:bg-blue-50 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-3 min-[951px]:py-2 min-[951px]:text-sm ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>Contato</NavLink>
                            {isAuthenticated() ? (
                                <NavLink to="/perfil" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-4 min-[951px]:py-2 min-[951px]:text-sm">
                                    Perfil
                                </NavLink>
                            ) : (
                                <NavLink to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-300 block w-full text-center min-[951px]:w-auto min-[951px]:px-4 min-[951px]:py-2 min-[951px]:text-sm">
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
