import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'underline' | 'pills' | 'enclosed';
  className?: string;
}

const Tabs = ({ 
  tabs, 
  defaultTab, 
  variant = 'underline',
  className = '' 
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const variantStyles = {
    underline: {
      container: 'border-b dark:border-gray-700',
      tabs: 'flex space-x-8',
      tab: 'py-2 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600',
      activeTab: 'text-purple-600 border-purple-600 dark:text-purple-400 dark:border-purple-400',
      indicator: true
    },
    pills: {
      container: '',
      tabs: 'flex space-x-2',
      tab: 'py-2 px-4 rounded-full font-medium text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800',
      activeTab: 'text-white bg-purple-600 hover:bg-purple-700 hover:text-white dark:bg-purple-600 dark:hover:bg-purple-700',
      indicator: false
    },
    enclosed: {
      container: '',
      tabs: 'flex',
      tab: 'py-2 px-4 font-medium text-sm text-gray-500 border-t border-r border-transparent first:border-l hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
      activeTab: 'text-gray-900 bg-white dark:text-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-t-lg',
      indicator: false
    }
  };

  const selectedStyles = variantStyles[variant];

  return (
    <div className={className}>
      <div className={selectedStyles.container}>
        <nav className={selectedStyles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${selectedStyles.tab} ${activeTab === tab.id ? selectedStyles.activeTab : ''} relative`}
            >
              <div className="flex items-center">
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </div>
              
              {selectedStyles.indicator && activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                  layoutId="tabIndicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="py-4">
        <AnimateTabContent activeTab={activeTab} tabs={tabs} />
      </div>
    </div>
  );
};

const AnimateTabContent = ({ activeTab, tabs }: { activeTab: string, tabs: Tab[] }) => {
  const currentTab = tabs.find(tab => tab.id === activeTab);
  
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {currentTab?.content}
    </motion.div>
  );
};

export default Tabs;