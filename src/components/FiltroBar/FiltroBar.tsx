import React, { memo } from 'react';

interface Option {
    value: string;
    label: string;
}

interface FiltroBarProps {
    filtroDificuldade: string;
    onDificuldadeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    dificuldadeOptions?: Option[];

    // Segundo filtro (opcional)
    segundoFiltroValor?: string;
    onSegundoFiltroChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    segundoFiltroLabel?: string;
    segundoFiltroOptions?: Option[];
    showSegundoFiltro?: boolean;
}

const defaultDificuldadeOptions: Option[] = [
    { value: 'todos', label: 'Todas as dificuldades' },
    { value: 'Básico', label: 'Básico' },
    { value: 'Intermediário', label: 'Intermediário' },
    { value: 'Avançado', label: 'Avançado' }
];

const FiltroBar = memo(({
    filtroDificuldade,
    onDificuldadeChange,
    dificuldadeOptions = defaultDificuldadeOptions,
    segundoFiltroValor,
    onSegundoFiltroChange,
    segundoFiltroLabel = "Categoria",
    segundoFiltroOptions = [],
    showSegundoFiltro = true
}: FiltroBarProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Filtrar</h3>
            <div className={`grid grid-cols-1 ${showSegundoFiltro ? 'md:grid-cols-2' : ''} gap-4`}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dificuldade</label>
                    <select
                        value={filtroDificuldade}
                        onChange={onDificuldadeChange}
                        className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {dificuldadeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                {showSegundoFiltro && onSegundoFiltroChange && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{segundoFiltroLabel}</label>
                        <select
                            value={segundoFiltroValor}
                            onChange={onSegundoFiltroChange}
                            className="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {segundoFiltroOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
});

export default FiltroBar;
