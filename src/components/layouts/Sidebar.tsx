import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
  Folder,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({
  isMobileMenuOpen,
  isSidebarCollapsed,
  toggleSidebar,
}: SidebarProps) => {
  const location = useLocation();
  const { logout, user } = useUser();
  const [isHubOpen, setIsHubOpen] = useState(true);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    return location.pathname.startsWith(path);
  };

  const sidebarVariants = {
    collapsed: { width: "5rem" },
    expanded: { width: "16rem" },
  };

  return (
    <motion.aside
      initial={isSidebarCollapsed ? "collapsed" : "expanded"}
      animate={isSidebarCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-30 h-screen hidden lg:flex flex-col font-[Inter] backdrop-blur-xl bg-[rgba(20,20,30,0.7)] border-r border-white/10 shadow-[5px_0_20px_rgba(0,0,0,0.3)] rounded-tr-xl rounded-br-xl"
    >
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
            G
          </div>
          {!isSidebarCollapsed && (
            <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Genify
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 py-4 px-2 overflow-y-auto sidebar-scroll space-y-2">
        <Link
          to="/"
          className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
            isActive("/")
              ? "bg-purple-600/20 text-purple-300 ring-1 ring-purple-500 border-l-4 border-purple-500"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          <LayoutDashboard size={20} />
          {!isSidebarCollapsed && <span className="ml-3">Dashboard</span>}
        </Link>
        {/* Hub Group */}
        <div>
          <button
            onClick={() => setIsHubOpen(!isHubOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-left transition-all duration-200 ${
              isHubOpen
                ? "bg-purple-600/20 text-purple-300 border-l-4 border-purple-500"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="flex items-center space-x-3">
              <Folder size={20} />
              {!isSidebarCollapsed && <span>Hub</span>}
            </span>
            {!isSidebarCollapsed && (
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isHubOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          <motion.ul
            initial={false}
            animate={isHubOpen ? "open" : "collapsed"}
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            className="ml-6 mt-1 space-y-1 overflow-hidden"
          >
            {[
              { name: "Content Studio", path: "/hub/content" },
              { name: "Engagement Hub", path: "/hub/engagement" },
              { name: "Social Media Manager", path: "/hub/social-media" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="block text-sm text-gray-300 hover:text-white px-3 py-1 rounded hover:bg-white/5"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Remaining Sections */}
        {[
          { name: "AI Writer", path: "/ai-writer", icon: <FileText size={20} /> },
          { name: "Assistant", path: "/chat", icon: <MessageSquare size={20} /> },
          { name: "Projects", path: "/projects", icon: <Kanban size={20} /> },
          { name: "Social Tools", path: "/social-tools", icon: <Share2 size={20} /> },
          { name: "Brand", path: "/brand", icon: <Palette size={20} /> },
          { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
          { name: "Pricing", path: "/pricing", icon: <CreditCard size={20} /> },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "bg-purple-600/20 text-purple-300 ring-1 ring-purple-500 border-l-4 border-purple-500"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            {!isSidebarCollapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-white/10">
        {!isSidebarCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-[#0B0B0D] p-1 rounded-full border border-white/10 shadow-sm text-gray-400 hover:text-white"
      >
        {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;
