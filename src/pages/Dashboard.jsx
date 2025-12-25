import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';
import { DashboardSidebar } from '../components/DashboardSidebar';

export const Dashboard = () => {
  const { currentUser, userRole } = useAuth();

  const stats = [
    { label: 'Active Projects', value: '3', icon: '📊' },
    { label: 'Messages', value: '12', icon: '💬' },
    { label: 'Tasks Completed', value: '45', icon: '✅' },
    { label: 'Account Status', value: 'Active', icon: '🟢' },
  ];

  return (
    <>
      <SEO title="Dashboard" description="Your Larawans Digital dashboard" />

      <div className="flex min-h-screen bg-dark-950">
        <DashboardSidebar />
        
        <div className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="mb-2 text-4xl font-bold text-white">
              Welcome back, {currentUser?.displayName || currentUser?.email?.split('@')[0]}!
            </h1>
            <p className="text-dark-400">Here's what's happening with your account</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-dark-800 p-6"
              >
                <div className="mb-2 text-4xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl bg-dark-800 p-8"
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-dark-400">Name</div>
                    <div className="text-white">{currentUser?.displayName || 'Not set'}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-dark-400">Email</div>
                    <div className="text-white">{currentUser?.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-dark-400">Role</div>
                    <div className="text-white capitalize">{userRole}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-500" />
                  <div>
                    <div className="text-sm text-dark-400">Member Since</div>
                    <div className="text-white">
                      {currentUser?.metadata?.creationTime ? 
                        new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                        'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-2xl bg-dark-800 p-8"
            >
              <h2 className="mb-6 text-2xl font-bold text-white">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { action: 'Logged in', time: '2 hours ago' },
                  { action: 'Updated profile', time: '1 day ago' },
                  { action: 'Submitted contact form', time: '3 days ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-dark-700 pb-4 last:border-0">
                    <div className="text-white">{activity.action}</div>
                    <div className="text-sm text-dark-400">{activity.time}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
