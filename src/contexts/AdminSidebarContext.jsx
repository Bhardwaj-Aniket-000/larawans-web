import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdminSidebarContext = createContext(null);

export const AdminSidebarProvider = ({ children }) => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isLg = window.innerWidth >= 1024;
      setIsDesktop(isLg);
      setIsSidebarOpen(isLg);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const value = {
    isDesktop,
    isSidebarOpen: isDesktop ? true : isSidebarOpen,
    mobileSidebarOpen: isSidebarOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };

  return (
    <AdminSidebarContext.Provider value={value}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

export const useAdminSidebar = () => {
  const context = useContext(AdminSidebarContext);
  if (!context) {
    throw new Error('useAdminSidebar must be used within AdminSidebarProvider');
  }
  return context;
};
