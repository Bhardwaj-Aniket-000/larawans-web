import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const isScrolled = scrollPosition > 50;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Work', path: '/work' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/95 shadow-lg backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              <span className="text-primary-500">LARA</span>WANS
            </div>
          </Link>

          <div className="hidden items-center space-x-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-500'
                      : 'text-dark-300 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <ThemeToggle />
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="flex items-center space-x-2 text-sm font-medium text-dark-300 transition-colors hover:text-white"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm font-medium text-dark-300 transition-colors hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-primary-600 px-6 py-3 min-h-[44px] flex items-center justify-center text-sm font-medium text-white transition-all hover:bg-primary-700"
              >
                Get Started
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white lg:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-dark-800 bg-dark-950 lg:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-primary-500'
                          : 'text-dark-300 hover:text-white'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                
                {currentUser ? (
                  <>
                    <Link
                      to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-dark-300 transition-colors hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-left text-sm font-medium text-dark-300 transition-colors hover:text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="inline-block rounded-lg bg-primary-600 px-6 py-3 min-h-[44px] flex items-center justify-center text-center text-sm font-medium text-white transition-all hover:bg-primary-700"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
