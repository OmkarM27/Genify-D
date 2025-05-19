import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helpText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, helpText, className = '', type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';
    
    const inputType = isPasswordField 
      ? (showPassword ? 'text' : 'password') 
      : type;
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 
              focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
              disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500
              dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
              dark:focus:border-purple-400 dark:focus:ring-purple-400
              dark:disabled:bg-gray-900 dark:disabled:text-gray-400
              transition-colors duration-200
              ${leftIcon ? 'pl-10' : ''}
              ${isPasswordField || rightIcon ? 'pr-10' : ''}
              ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-400 dark:focus:border-rose-400 dark:focus:ring-rose-400' : ''}
              ${className}
            `}
            {...props}
          />
          
          {isPasswordField && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          {rightIcon && !isPasswordField && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helpText) && (
          <div className="mt-1">
            {error && (
              <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
            )}
            {!error && helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;