import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Breadcrumb } from './components/Breadcrumb';
import { BackToTop } from './components/BackToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PhoneButton } from './components/PhoneButton';
import { OnlineStatus } from './components/OnlineStatus';
import { CookieConsent } from './components/CookieConsent';
import { LiveChat } from './components/LiveChat';
import { PageLoader } from './components/PageLoader';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Services = lazy(() => import('./pages/Services').then(module => ({ default: module.Services })));
const Work = lazy(() => import('./pages/Work').then(module => ({ default: module.Work })));
const Pricing = lazy(() => import('./pages/Pricing').then(module => ({ default: module.Pricing })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const DashboardServices = lazy(() => import('./pages/dashboard/DashboardServices').then(module => ({ default: module.DashboardServices })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(module => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminServices = lazy(() => import('./pages/admin/AdminServices').then(module => ({ default: module.AdminServices })));
const AdminPricing = lazy(() => import('./pages/admin/AdminPricing').then(module => ({ default: module.AdminPricing })));
const AdminFAQs = lazy(() => import('./pages/admin/AdminFAQs').then(module => ({ default: module.AdminFAQs })));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings').then(module => ({ default: module.AdminSettings })));
const AdminInquiries = lazy(() => import('./pages/admin/AdminInquiries').then(module => ({ default: module.AdminInquiries })));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery').then(module => ({ default: module.AdminGallery })));
const Gallery = lazy(() => import('./pages/Gallery').then(module => ({ default: module.Gallery })));
const FAQ = lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

const AppContent = () => {
  const location = useLocation();
  const isUserDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAdminPanelRoute =
    location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  const hideGlobalChrome = isUserDashboardRoute || isAdminPanelRoute;

  return (
    <div className="flex min-h-screen flex-col bg-dark-950 dark:bg-dark-950 light:bg-gray-50">
      {!hideGlobalChrome && (
        <>
          <Navbar />
          <Breadcrumb />
        </>
      )}
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/services"
            element={
              <ProtectedRoute>
                <DashboardServices />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/services"
            element={
              <AdminRoute>
                <AdminServices />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/pricing"
            element={
              <AdminRoute>
                <AdminPricing />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/faqs"
            element={
              <AdminRoute>
                <AdminFAQs />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/inquiries"
            element={
              <AdminRoute>
                <AdminInquiries />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/gallery"
            element={
              <AdminRoute>
                <AdminGallery />
              </AdminRoute>
            }
          />
          
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <AdminSettings />
              </AdminRoute>
            }
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {!hideGlobalChrome && (
        <>
          <Footer />
          <BackToTop />
        </>
      )}

      <WhatsAppButton offsetBottomClass={hideGlobalChrome ? 'bottom-32' : 'bottom-8'} />
      <PhoneButton />
      <OnlineStatus />
      <CookieConsent />
      <LiveChat />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#0ea5e9',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
