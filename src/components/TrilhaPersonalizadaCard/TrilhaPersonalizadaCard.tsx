import type { TrilhaPersonalizada } from '../../types/trilhaPersonalizada';

interface TrilhaPersonalizadaCardProps {
    trilha: TrilhaPersonalizada;
    onVerTrilha: (trilha: TrilhaPersonalizada) => void;
    onDeleteTrilha: (trilha: TrilhaPersonalizada) => void;
}

export default function TrilhaPersonalizadaCard({ trilha, onVerTrilha, onDeleteTrilha }: TrilhaPersonalizadaCardProps) {
    return (
        <div className="card-white">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 capitalize">{trilha.interesse}</h3>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${trilha.dificuldade === 'iniciante' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300' :
                            trilha.dificuldade === 'intermediario' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300' :
                                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
                        }`}>
                        {trilha.dificuldade}
                    </span>
                    <button onClick={() => onDeleteTrilha(trilha)} className="text-red-500 hover:text-red-700 text-lg cursor-pointer" title="Excluir trilha">🗑️</button>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tempo disponível: {trilha.disponibilidade} horas/semana</p>
            <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Módulos ({trilha.modulos?.length || 0}):</p>
                {trilha.modulos && trilha.modulos.length > 0 ? (
                    <>
                        {trilha.modulos.slice(0, 3).map((modulo, index) => (
                            <div key={index} className="text-sm text-gray-600 dark:text-gray-400">- {modulo.nome}</div>
                        ))}
                        {trilha.modulos.length > 3 && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">+{trilha.modulos.length - 3} módulos</p>
                        )}
                    </>
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhum módulo disponível</p>
                )}
            </div>
            <button onClick={() => onVerTrilha(trilha)} className="btn-primary w-full cursor-pointer">Ver Trilha Completa</button>
        </div>
    );
}
