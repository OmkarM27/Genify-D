import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 disabled:bg-purple-400 dark:bg-purple-500 dark:hover:bg-purple-600 dark:disabled:bg-purple-700',
    secondary: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 disabled:bg-teal-400 dark:bg-teal-500 dark:hover:bg-teal-600 dark:disabled:bg-teal-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500 disabled:text-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:disabled:text-gray-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500 disabled:text-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 dark:disabled:text-gray-600',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 disabled:bg-rose-400 dark:bg-rose-500 dark:hover:bg-rose-600 dark:disabled:bg-rose-700',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={isLoading || disabled}
      className={`
        ${baseStyles} 
        ${sizeStyles[size]} 
        ${variantStyles[variant]} 
        ${widthStyles}
        ${isLoading ? 'opacity-80 cursor-wait' : ''}
        ${disabled && !isLoading ? 'cursor-not-allowed opacity-70' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;