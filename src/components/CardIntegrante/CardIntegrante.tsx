import { Link } from "react-router-dom";

interface CardIntegranteProps {
    foto: string;
    nome: string;
    rm: string;
    turma: string;
    linkedinUrl: string;
    githubUrl: string;
}

export default function CardIntegrante({ foto, nome, rm, turma, linkedinUrl, githubUrl }: CardIntegranteProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
            <img src={foto} alt={`Foto de ${nome}`} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
            <div className="integrante-info">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{nome}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">RM: {rm}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Turma: {turma}</p>
                <div className="flex justify-center space-x-4">
                    <Link to={linkedinUrl} aria-label={`Linkedin ${nome}`} title={`Linkedin ${nome}`} target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                        <img src="https://www.svgrepo.com/show/452047/linkedin-1.svg" alt="LinkedIn" className="w-6 h-6" />
                    </Link>
                    <Link to={githubUrl} aria-label={`GitHub ${nome}`} title={`GitHub ${nome}`} target="_blank" rel="noopener" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100">
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
