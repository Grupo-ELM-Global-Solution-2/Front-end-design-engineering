
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
