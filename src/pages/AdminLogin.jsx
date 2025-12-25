import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, Eye, EyeOff } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { SEO } from '../components/SEO';
import toast from 'react-hot-toast';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, logout, currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && userRole === 'admin') {
      console.log('AdminLogin useEffect - Already logged in as admin, redirecting...');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await login(email, password);
      const user = userCredential;
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      console.log('AdminLogin - User document exists:', userDoc.exists());
      console.log('AdminLogin - User data:', userDoc.exists() ? userDoc.data() : 'Not found');
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;
        
        console.log('AdminLogin - Role value:', userRole, 'Type:', typeof userRole);
        console.log('AdminLogin - Role comparison:', userRole === 'admin');
        
        if (userRole === 'admin') {
          console.log('AdminLogin - Admin verified, redirecting...');
          toast.success('Welcome back, Admin!');
          
          setTimeout(() => {
            navigate('/admin/dashboard', { replace: true });
          }, 1000);
        } else {
          console.log('AdminLogin - Role mismatch. Expected "admin", got:', userRole);
          toast.error(`Access denied. Role is "${userRole}". Must be exactly "admin"`);
          await logout();
        }
      } else {
        console.log('AdminLogin - User document not found');
        toast.error('User profile not found in database.');
        await logout();
      }
    } catch (error) {
      console.error('AdminLogin - Error:', error);
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Admin login for Larawans Digital" />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-md"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <h1 className="mb-2 text-4xl font-bold text-white">Admin Access</h1>
              <p className="text-dark-400">Restricted area - Authorized personnel only</p>
            </div>

            <div className="rounded-2xl border border-red-900/50 bg-dark-800 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark-300">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-4 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Admin Email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-dark-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-12 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-600 px-8 py-3 min-h-[48px] font-semibold text-white transition-all hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Admin Login</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-sm text-dark-500 hover:text-dark-400">
                  ← Back to User Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
