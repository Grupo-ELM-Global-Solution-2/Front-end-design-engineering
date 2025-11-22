interface CardProps {
  icon?: string;
  iconClassName?: string;
  title: string;
  description: string;
  className?: string;
  variant?: 'default' | 'benefit' | 'step';
}

export default function Card({ icon, iconClassName, title, description, className, variant = 'default' }: CardProps) {
  const isBenefit = variant === 'benefit';
  const isStep = variant === 'step';

  return (
    <div className={`text-center ${isBenefit ? 'p-6' : isStep ? '' : 'p-8'} bg-white dark:bg-gray-800 rounded-lg ${isBenefit ? 'border border-gray-200 dark:border-gray-700' : ''} transition-colors duration-300 ${className || ''}`}>
      {icon && (
        <div className={`${isStep ? 'w-16 h-16 rounded-full' : 'w-12 h-12 rounded-lg'} flex items-center justify-center mx-auto mb-6 text-2xl font-bold ${iconClassName || (isStep ? 'bg-indigo-600 text-white' : '')}`}>
          {icon}
        </div>
      )}
      <h3 className={`${isBenefit ? 'text-lg' : 'text-xl'} font-semibold text-gray-900 dark:text-gray-100 ${isBenefit ? 'mb-2' : 'mb-3'}`}>{title}</h3>
      <p className={`text-gray-600 dark:text-gray-400 ${isBenefit ? 'text-sm' : ''}`}>{description}</p>
    </div>
  );
}
