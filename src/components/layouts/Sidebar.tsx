import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { 
  LayoutDashboard,
  FileText,
  Share2,
  MessageSquare,
  Kanban,
  Palette,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar = ({ isMobileMenuOpen, isSidebarCollapsed, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const { logout, user } = useUser();
  
  const navigationItems: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'AI Writer', path: '/ai-writer', icon: <FileText size={20} /> },
    { name: 'Social Tools', path: '/social-tools', icon: <Share2 size={20} /> },
    { name: 'Assistant', path: '/chat', icon: <MessageSquare size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Kanban size={20} /> },
    { name: 'Brand', path: '/brand', icon: <Palette size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Pricing', path: '/pricing', icon: <CreditCard size={20} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const sidebarVariants = {
    collapsed: { width: '5rem' },
    expanded: { width: '16rem' }
  };

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={isSidebarCollapsed ? 'collapsed' : 'expanded'}
        animate={isSidebarCollapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-30 h-screen hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">G</div>
            {!isSidebarCollapsed && <span className="text-xl font-bold">Genify</span>}
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-lg font-medium transition-colors duration-200
                    ${isActive(item.path)
                      ? 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {!isSidebarCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
              </div>
              <button 
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-white dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="fixed left-0 top-0 z-30 h-screen w-64 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 lg:hidden"
          >
            <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">G</div>
                <span className="text-xl font-bold">Genify</span>
              </div>
            </div>
            
            <nav className="flex-1 py-6 px-2 overflow-y-auto">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2 rounded-lg font-medium transition-colors duration-200
                        ${isActive(item.path)
                          ? 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="ml-3">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
                <button 
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;