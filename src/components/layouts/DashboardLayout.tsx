import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { MessageCircle } from 'lucide-react';

const DashboardLayout = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect screen size on mount to set initial sidebar state
  useEffect(() => {
    if (window.innerWidth < 1280) {
      setIsSidebarCollapsed(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <TopNavbar
          toggleMobileMenu={toggleMobileMenu}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating chat button */}
      {location.pathname !== '/assistant' && (
        <button
          onClick={toggleChat}
          className="fixed z-20 bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat assistant panel */}
      <AnimatePresence>
        {isChatOpen && location.pathname !== '/assistant' && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">AI Assistant</h3>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <span className="sr-only">Close panel</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4 h-80 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 rounded-full p-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-sm">Hello! How can I assist you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-600 dark:text-purple-400 p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;