import { useState } from 'react';
import type { Modulo } from '../../types/trilha';

interface ModuleAccordionProps {
    index: number;
    modulo: Modulo;
    status: number;
    onStart: (index: number) => void;
    onVisualize: (index: number) => void;
    onMarkCompleted: (index: number) => void;
    onUnmarkCompleted: (index: number) => void;
    onGiveUp: (index: number) => void;
}

export default function ModuleAccordion({
    index,
    modulo,
    status,
    onStart,
    onVisualize,
    onMarkCompleted,
    onUnmarkCompleted,
    onGiveUp
}: ModuleAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div onClick={toggleOpen} className="w-full text-left p-4 md:p-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-6 h-6 shrink-0 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{modulo.nome}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Duração estimada: {modulo.duracao}</p>
                        </div>
                    </div>
                    <div className={`shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180 bg-indigo-200 dark:bg-indigo-800' : ''}`}>
                        <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 w-full sm:w-auto mt-4">
                    {status === 100 ? (
                        <button onClick={(e) => { e.stopPropagation(); onUnmarkCompleted(index); }} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex-1 sm:flex-none cursor-pointer">Concluído ✓</button>
                    ) : status > 0 && status < 100 ? (
                        <>
                            <button onClick={(e) => { e.stopPropagation(); onMarkCompleted(index); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex-1 sm:flex-none cursor-pointer">Marcar como concluído</button>
                            <button onClick={(e) => { e.stopPropagation(); onGiveUp(index); }} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors flex-1 sm:flex-none cursor-pointer">Desistir</button>
                        </>
                    ) : (
                        <>
                            <button onClick={(e) => { e.stopPropagation(); onStart(index); setIsOpen(true); }} className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex-1 sm:flex-none cursor-pointer">Começar</button>
                            <button onClick={(e) => { e.stopPropagation(); onVisualize(index); setIsOpen(true); }} className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors flex-1 sm:flex-none cursor-pointer">Visualizar</button>
                        </>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className="px-4 md:px-8 pb-8 border-t border-gray-100 dark:border-gray-700">
                    <iframe width="100%" height="415" src={modulo.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full" />
                </div>
            )}
        </div>
    );
}
