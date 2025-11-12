import type { TrilhaPersonalizada } from '../../types/trilha';

interface TrilhaPersonalizadaModalProps {
    trilha: TrilhaPersonalizada | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function TrilhaPersonalizadaModal({ trilha, isOpen, onClose }: TrilhaPersonalizadaModalProps) {
    if (!isOpen || !trilha) return null;

    return (
        <div className="fixed inset-0 bg-blur bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[98vh] sm:max-h-[95vh] overflow-hidden transform transition-all duration-300 scale-100">
                <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
                    <div className="flex justify-between items-start sm:items-center">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold capitalize wrap-break-word">Trilha Personalizada: {trilha.interesse}</h2>
                            <p className="text-blue-100 mt-1 text-sm sm:text-base">Criada especialmente para você pela nossa IA</p>
                        </div>
                        <button onClick={onClose} className="text-white hover:text-gray-500 text-2xl sm:text-3xl font-light hover:bg-amber-50 hover:bg-opacity-20 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-colors ml-2 shrink-0 cursor-pointer">X</button>
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(98vh-100px)] sm:max-h-[calc(95vh-120px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 sm:mr-3"></span> Detalhes da Trilha
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                    <span className="text-gray-600 text-sm sm:text-base">Experiência:</span>
                                    <span className="font-medium text-gray-900 text-sm sm:text-base">{trilha.experiencia}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                                    <span className="text-gray-600 text-sm sm:text-base">Disponibilidade:</span>
                                    <span className="font-medium text-gray-900 text-sm sm:text-base">{trilha.disponibilidade} horas/semana</span>
                                </div>
                                <div className="pt-2 border-t border-gray-200">
                                    <span className="text-gray-600 block mb-2 text-sm sm:text-base">Preferências de Aprendizado:</span>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {trilha.preferenciasAprendizado.map((preferencia, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                                {preferencia}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                                <span className="w-2 h-2 bg-purple-600 rounded-full mr-2 sm:mr-3"></span>
                                Recomendação da IA
                            </h3>
                            <p className="text-gray-700 leading-relaxed italic text-sm sm:text-base">"{trilha.respostaIA}"</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                            <span className="w-2 sm:w-3 h-2 sm:h-3 bg-green-600 rounded-full mr-2 sm:mr-3"></span> Módulos da Trilha ({trilha.modulos.length})
                        </h3>
                        <div className="space-y-4 sm:space-y-6">
                            {trilha.modulos.map((modulo, index) => (
                                <div key={modulo.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                                        <div className="flex items-center flex-1 min-w-0">
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 sm:mr-4 shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 wrap-break-word">{modulo.titulo}</h4>
                                                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">{modulo.duracao}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{modulo.descricao}</p>
                                    {modulo.videoUrl && (
                                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                            <iframe src={modulo.videoUrl} title={modulo.titulo} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
