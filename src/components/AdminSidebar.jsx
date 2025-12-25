import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Briefcase, DollarSign, Settings, LogOut, Menu, X, HelpCircle, Mail, Image } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contactService } from '../services/contactService';
import toast from 'react-hot-toast';

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = contactService.subscribeToInquiries((inquiries) => {
      const unread = inquiries.filter((i) => !i.read).length;
      setUnreadCount(unread);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/services', icon: Briefcase, label: 'Services' },
    { path: '/admin/inquiries', icon: Mail, label: 'Inquiries', badge: unreadCount },
    { path: '/admin/gallery', icon: Image, label: 'Gallery' },
    { path: '/admin/pricing', icon: DollarSign, label: 'Pricing' },
    { path: '/admin/faqs', icon: HelpCircle, label: 'FAQs' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden rounded-lg bg-dark-800 p-2 text-white"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <motion.aside
        initial={false}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 z-40 h-screen w-[280px] bg-dark-900 border-r border-dark-800 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-dark-800 p-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">LARA</span>
              <span className="text-2xl font-bold text-primary-500">WANS</span>
            </div>
            <p className="mt-1 text-sm text-dark-400">Admin Panel</p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between space-x-3 rounded-lg px-4 py-3 transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-400 hover:bg-dark-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-dark-800 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-dark-400 transition-all hover:bg-red-600/20 hover:text-red-500"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      <div className="hidden lg:block lg:w-[280px]" />
    </>
  );
};
