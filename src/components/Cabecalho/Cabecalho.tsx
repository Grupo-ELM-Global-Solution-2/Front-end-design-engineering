
import { NavLink } from 'react-router-dom';

export default function Cabecalho() {
    return(
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <NavLink to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">ReIntegrAI</NavLink>
                    </div>
                    <div className="flex items-center space-x-4">
                        <NavLink to="/" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200 ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>Home</NavLink>
                        <NavLink to="/avaliacao" className={({ isActive }) => `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200 ${isActive ? 'text-blue-600 bg-blue-50' : ''}`}>Avaliação</NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
}
