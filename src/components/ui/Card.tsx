import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'interactive';
  animate?: boolean;
}

const Card = ({ 
  children, 
  variant = 'default',
  animate = false,
  className = '', 
  ...props 
}: CardProps) => {
  const baseStyles = 'rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm';
  
  const variantStyles = {
    default: '',
    hover: 'hover:shadow-md transition-shadow duration-200',
    interactive: 'hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer',
  };
  
  const Component = animate ? motion.div : 'div';
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export const CardHeader = ({ 
  children, 
  className = '', 
  ...props 
}: HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`px-6 py-4 border-b dark:border-gray-700 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ 
  children, 
  className = '', 
  ...props 
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 
    className={`text-lg font-medium text-gray-900 dark:text-white ${className}`} 
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({ 
  children, 
  className = '', 
  ...props 
}: HTMLAttributes<HTMLParagraphElement>) => (
  <p 
    className={`mt-1 text-sm text-gray-500 dark:text-gray-400 ${className}`} 
    {...props}
  >
    {children}
  </p>
);

export const CardContent = ({ 
  children, 
  className = '', 
  ...props 
}: HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`px-6 py-4 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardFooter = ({ 
  children, 
  className = '', 
  ...props 
}: HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`px-6 py-4 border-t dark:border-gray-700 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export default Card;