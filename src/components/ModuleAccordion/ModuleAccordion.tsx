import { useState } from 'react';

interface ModuleAccordionProps {
    index: number;
    modulo: string;
    started: boolean;
    onStart: (index: number) => void;
    onVisualize: (index: number) => void;
    onMarkCompleted: (index: number) => void;
    onGiveUp: (index: number) => void;
}

export default function ModuleAccordion({
    index,
    modulo,
    started,
    onStart,
    onVisualize,
    onMarkCompleted,
    onGiveUp
}: ModuleAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            <button
                onClick={toggleOpen}
                className="w-full text-left p-4 md:p-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 transition-colors duration-200"
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">{modulo}</h4>
                            <p className="text-sm text-gray-600">Duração estimada: 2 semanas</p>
                        </div>
                    </div>
                    <div className={`shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180 bg-indigo-200' : ''}`}>
                        <svg
                            className="w-5 h-5 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto mt-4">
                    {started ? (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onMarkCompleted(index); }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex-1 sm:flex-none"
                            >
                                Marcar como concluído
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onGiveUp(index); }}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors flex-1 sm:flex-none"
                            >
                                Desistir
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onStart(index); setIsOpen(true); }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex-1 sm:flex-none"
                            >
                                Começar
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onVisualize(index); setIsOpen(true); }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-400 transition-colors flex-1 sm:flex-none"
                            >
                                Visualizar
                            </button>
                        </>
                    )}
                </div>
            </button>
            {isOpen && (
                <div className="px-4 md:px-8 pb-8 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg pt-4">Conteúdo do módulo: {modulo}</p>
                    <div className="mt-4">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
