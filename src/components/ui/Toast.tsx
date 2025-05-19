import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  AlertTriangle, 
  X 
} from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: () => void;
}

const Toast = ({ id, type, message, onClose }: ToastProps) => {
  // Define colors based on toast type
  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-200',
    error: 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-200',
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
    warning: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200',
  };

  // Define icons based on toast type
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
    info: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start p-4 rounded-lg shadow-lg border max-w-sm w-full ${colors[type]}`}
    >
      <div className="flex-shrink-0 mr-3">
        {icons[type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default Toast;