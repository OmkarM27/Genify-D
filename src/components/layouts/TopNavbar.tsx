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

const TopNavbar = ({ toggleMobileMenu }: TopNavbarProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    setPageTitle(pageTitles[path] || 'Dashboard');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 border-b border-white/10 ${
        isScrolled
          ? 'bg-[#0B0B0D]/90 backdrop-blur-md shadow-md'
          : 'bg-[#0B0B0D]'
      }`}
    >
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="mr-4 text-gray-400 hover:text-white lg:hidden"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="md:hidden">
            <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center rounded-lg bg-[#1A1A1D] border border-white/10 px-3 py-1.5">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none text-sm w-40 lg:w-60 text-white placeholder-gray-500"
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white relative transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full" />
          </button>

          {/* Profile */}
          <div className="w-9 h-9 rounded-full bg-white/10 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
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
