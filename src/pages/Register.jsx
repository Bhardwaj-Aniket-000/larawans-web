import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Register" description="Create your Larawans Digital account" />

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
              <h1 className="mb-2 text-4xl font-bold text-white">Create Account</h1>
              <p className="text-dark-400">Join us and start your digital journey</p>
            </div>

            <div className="rounded-2xl bg-dark-800 p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-dark-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-4 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-4 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-dark-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-500" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full rounded-lg bg-dark-900 py-3 pl-10 pr-4 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-600 px-8 py-3 min-h-[48px] font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Creating account...</span>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-dark-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-500 hover:text-primary-400">
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
