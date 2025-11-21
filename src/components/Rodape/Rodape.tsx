import { NavLink } from "react-router-dom";

export default function Rodape() {

  return (
    <footer className="grid p-5 pb-4 bg-gray-800 w-full text-white gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left items-start">
            <div className="footer-column">
                <h3>ReIntegrAI</h3>
                <p>Transformando carreiras com inteligência artificial.</p>
            </div>
            <div className="footer-column">
                <h4>Navegação</h4>
                <ul className="grid">
                    <li><NavLink to={'/'}>Início</NavLink></li>
                    <li><NavLink to={'/avaliacao'} >Avaliação</NavLink></li>
                    <li><NavLink to={'/integrantes'} >Integrantes</NavLink></li>
                    <li><NavLink to={'/faq'} >FAQ</NavLink></li>
                    <li><NavLink to={'/contato'} >Contato</NavLink></li>
