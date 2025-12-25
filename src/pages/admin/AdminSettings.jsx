import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminSidebar } from '../../components/AdminSidebar';
import { User, Lock, Bell, Globe, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const AdminSettings = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: currentUser?.email || '',
    phone: '',
    bio: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    toast.success('Password updated successfully');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'general', label: 'General', icon: Globe }
  ];

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />

      <div className="flex-1">
        <div className="border-b border-dark-800 bg-dark-900 px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-dark-400 mt-1">Manage your admin account settings</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-dark-400 hover:bg-dark-800 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-dark-800 bg-dark-900 p-8"
                >
                  <h2 className="mb-6 text-2xl font-bold text-white">Profile Information</h2>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Full Name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Email Address"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Phone Number"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Bio"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-dark-800 bg-dark-900 p-8"
                >
                  <h2 className="mb-6 text-2xl font-bold text-white">Security Settings</h2>
                  <form onSubmit={handleSavePassword} className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Current Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Current Password"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">New Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="New Password"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Confirm New Password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                    >
                      <Save className="h-5 w-5" />
                      <span>Update Password</span>
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-dark-800 bg-dark-900 p-8"
                >
                  <h2 className="mb-6 text-2xl font-bold text-white">Notification Preferences</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Email Notifications', description: 'Receive email notifications for new messages' },
                      { label: 'New User Registrations', description: 'Get notified when new users register' },
                      { label: 'Contact Form Submissions', description: 'Receive alerts for new contact form submissions' },
                      { label: 'Weekly Reports', description: 'Get weekly performance reports via email' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg bg-dark-800 p-4">
                        <div>
                          <p className="font-semibold text-white">{item.label}</p>
                          <p className="text-sm text-dark-400">{item.description}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" defaultChecked />
                          <div className="peer h-6 w-11 rounded-full bg-dark-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-600 peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'general' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-dark-800 bg-dark-900 p-8"
                >
                  <h2 className="mb-6 text-2xl font-bold text-white">General Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Site Name</label>
                      <input
                        type="text"
                        defaultValue="Larawans Digital"
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="admin@larawans.com"
                        className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-dark-300">Timezone</label>
                      <select className="w-full rounded-lg bg-dark-800 border border-dark-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Asia/Kolkata (IST)</option>
                        <option>America/New_York (EST)</option>
                        <option>Europe/London (GMT)</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.success('Settings saved successfully')}
                      className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
