import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Work', path: '/work' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-borderColor'
          : 'bg-white/90 backdrop-blur-md'}
      `}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/logo/Larawans.png"
              alt="Larawans"
              className="h-10 lg:h-14 w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2.5 text-sm font-semibold transition-all rounded-lg
                    ${active 
                      ? 'text-primary bg-primary/10' 
                      : 'text-textSecondary hover:text-primary hover:bg-bgLight'}
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-textPrimary hover:text-primary hover:bg-bgLight active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-7 h-7" />
            ) : (
              <HiMenuAlt3 className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-borderColor shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3.5 rounded-lg text-base font-semibold transition-all
                      ${active
                        ? 'bg-primary text-white'
                        : 'text-textSecondary hover:bg-bgLight hover:text-primary'}
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
