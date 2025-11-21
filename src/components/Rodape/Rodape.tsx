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
                </ul>
                
            </div>
            <div className="footer-column">
                <h4>Serviços</h4>
                <ul className="grid">
                    <li><NavLink to={'/perfil'} >Perfil</NavLink></li>
                    <li><NavLink to={'/trilha-personalizada'} >Trilhas Personalizadas</NavLink></li>
                    <li><NavLink to={'/trilhas-prontas'} >Trilhas Prontas</NavLink></li>
                    <li><NavLink to={'/sugestoes'} >Sugestões</NavLink></li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Contato</h4>
                <p>ReIntegrAI</p>
                <p>São Paulo - SP</p>
                <p>Brasil</p>
                <p>Telefone: (11) 99999-9999</p>
                <p>Email: contato@reintegr.ai</p>
            </div>
        <div className="text-center p-3 border-t border-solid border-t-[#2c3894] col-span-1 md:col-span-2 lg:col-span-4">
            <p>© 2024 ReIntegrAI. Todos os direitos reservados.</p>
        </div>
    </footer>
  );
}
