import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Login" description="Login to your Larawans Digital account" />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-md"
          >
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-4xl font-bold text-white">Welcome Back</h1>
              <p className="text-dark-400">Login to access your dashboard</p>
            </div>

            <div className="rounded-2xl bg-dark-800 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-4 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Email Address"
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
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-4 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-600 px-8 py-3 min-h-[48px] font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Logging in...</span>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-dark-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-500 hover:text-primary-400">
                    Register here
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link to="/admin/login" className="text-sm text-dark-500 hover:text-dark-400">
                  Admin Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
