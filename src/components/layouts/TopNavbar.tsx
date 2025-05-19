import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { 
  Menu, 
  Sun, 
  Moon, 
  Bell,
  Search
} from 'lucide-react';

interface TopNavbarProps {
  toggleMobileMenu: () => void;
  isSidebarCollapsed: boolean;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/ai-writer': 'AI Writer',
  '/social-tools': 'Social Tools',
  '/assistant': 'AI Assistant',
  '/projects': 'Projects',
  '/brand': 'Brand',
  '/settings': 'Settings',
  '/pricing': 'Pricing',
};

const TopNavbar = ({ toggleMobileMenu, isSidebarCollapsed }: TopNavbarProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);

  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname;
    setPageTitle(pageTitles[path] || 'Dashboard');
  }, [location]);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 lg:hidden"
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="md:hidden">
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="hidden md:flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-sm w-40 lg:w-60"
            />
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
          </button>
          
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;