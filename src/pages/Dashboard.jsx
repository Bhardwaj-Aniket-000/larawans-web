import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import ServicesManager from '../components/admin/ServicesManager';
import GalleryManager from '../components/admin/GalleryManager';
import PricingManager from '../components/admin/PricingManager';
import FAQManager from '../components/admin/FAQManager';
import ContactsManager from '../components/admin/ContactsManager';
import { FaSignOutAlt, FaCog, FaImages, FaDollarSign, FaQuestionCircle, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const tabs = [
    { id: 'services', label: 'Services', icon: FaCog },
    { id: 'gallery', label: 'Gallery', icon: FaImages },
    { id: 'pricing', label: 'Pricing', icon: FaDollarSign },
    { id: 'faq', label: 'FAQ', icon: FaQuestionCircle },
    { id: 'contacts', label: 'Contacts', icon: FaEnvelope },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'pricing':
        return <PricingManager />;
      case 'faq':
        return <FAQManager />;
      case 'contacts':
        return <ContactsManager />;
      default:
        return <ServicesManager />;
    }
  };

  return (
    <div className="min-h-screen bg-bgMain">
      <header className="bg-bgCream border-b border-borderLight sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-textPrimary hover:bg-bgSoft rounded-lg"
              >
                {sidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
              <img
                src="/assets/logo/Larawans.png"
                alt="Larawans"
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold text-textPrimary hidden sm:block">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-textMuted hidden sm:block">
                {currentUser?.email}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                icon={<FaSignOutAlt />}
              >
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] bg-bgCream border-r border-borderLight w-64 transition-transform duration-300 z-30 shadow-lg ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all min-h-[48px] ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-textSecondary hover:bg-bgSoft'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-textPrimary/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
