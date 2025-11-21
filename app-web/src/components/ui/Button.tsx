/**
 * Button Component
 * 
 * Componente de botão básico que será substituído pelos componentes
 * do Andes Design System quando integrado.
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 
    'rounded-lg font-semibold transition-all duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-ml-blue hover:bg-blue-700 text-white focus:ring-ml-blue',
    secondary: 'bg-ml-gray-400 hover:bg-ml-gray-900 text-white focus:ring-ml-gray-400',
    outline: 'border-2 border-ml-blue text-ml-blue hover:bg-blue-50 focus:ring-ml-blue',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}
