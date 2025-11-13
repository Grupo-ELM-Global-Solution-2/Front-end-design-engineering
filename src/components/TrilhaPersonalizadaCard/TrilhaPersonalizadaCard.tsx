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
                <h3 className="text-lg font-bold text-gray-900 capitalize">{trilha.interesse}</h3>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trilha.dificuldade === 'iniciante' ? 'bg-green-100 text-green-800' :
                        trilha.dificuldade === 'intermediario' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {trilha.dificuldade}
                    </span>
                    <button onClick={() => onDeleteTrilha(trilha)} className="text-red-500 hover:text-red-700 text-lg cursor-pointer" title="Excluir trilha">🗑️</button>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Tempo disponível: {trilha.disponibilidade} horas/semana</p>
            <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">Módulos ({trilha.modulos.length}):</p>
                {trilha.modulos.slice(0, 3).map((modulo, index) => (
                    <div key={index} className="text-sm text-gray-600">- {modulo.titulo}</div>
                ))}
                {trilha.modulos.length > 3 && (
                    <p className="text-sm text-gray-500">+{trilha.modulos.length - 3} módulos</p>
                )}
            </div>
            <button onClick={() => onVerTrilha(trilha)} className="btn-primary w-full cursor-pointer">Ver Trilha Completa</button>
        </div>
    );
}
