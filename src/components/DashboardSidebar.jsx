import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  DollarSign, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Services', path: '/dashboard/services', icon: Briefcase },
    { name: 'Pricing', path: '/dashboard/pricing', icon: DollarSign },
    { name: 'FAQ', path: '/dashboard/faq', icon: HelpCircle },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-dark-800 text-white shadow-lg lg:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -300 }}
        className="fixed left-0 top-0 z-40 h-screen w-64 bg-dark-900 pt-24 shadow-xl lg:translate-x-0"
      >
        <div className="flex h-full flex-col">
          <div className="mb-6 px-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">LARA</span>
              <span className="text-2xl font-bold text-primary-500">WANS</span>
            </Link>
            <p className="mt-1 text-xs text-dark-400">Digital Solutions</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all ${
                      isActive(item.path)
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                        : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-dark-800 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-dark-300 transition-all hover:bg-dark-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
