import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AdminSidebar } from '../../components/AdminSidebar';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Briefcase, DollarSign, Star, Bell, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 125000,
    activeProjects: 42,
    newLeads: 18,
    clientSatisfaction: 4.9
  });
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const performanceData = [
    { month: 'Jan', value: 30000 },
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 32000 },
    { month: 'Apr', value: 38000 },
    { month: 'May', value: 42000 },
    { month: 'Jun', value: 45200 }
  ];

  const projectStatusData = [
    { name: 'Active', value: 42, color: '#3b82f6' },
    { name: 'Completed', value: 13, color: '#10b981' },
    { name: 'Pending', value: 10, color: '#f59e0b' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const servicesSnapshot = await getDocs(collection(db, 'services'));
      const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesData);

      const pricingSnapshot = await getDocs(collection(db, 'pricing'));
      const pricingData = pricingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPricing(pricingData);

      const activityQuery = query(
        collection(db, 'admin_activity'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const activitySnapshot = await getDocs(activityQuery);
      const activityData = activitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentActivity(activityData);

      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+25%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'blue',
      bgGradient: 'from-blue-500/20 to-blue-600/10'
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      change: '+12%',
      changeType: 'increase',
      icon: Briefcase,
      color: 'purple',
      bgGradient: 'from-purple-500/20 to-purple-600/10'
    },
    {
      label: 'New Leads',
      value: stats.newLeads,
      change: '+8%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'orange',
      bgGradient: 'from-orange-500/20 to-orange-600/10'
    },
    {
      label: 'Client Satisfaction',
      value: `${stats.clientSatisfaction}/5.0`,
      change: '+0.2',
      changeType: 'increase',
      icon: Star,
      color: 'yellow',
      bgGradient: 'from-yellow-500/20 to-yellow-600/10'
    }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-950">
      <AdminSidebar />
      
      <div className="flex-1">
        <div className="border-b border-dark-800 bg-dark-900 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, Admin 👋</h1>
              <p className="text-dark-400 mt-1">Here's your agency's performance overview for today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="rounded-lg bg-dark-800 px-4 py-2 text-white hover:bg-dark-700 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="rounded-lg bg-dark-800 px-4 py-2 text-white hover:bg-dark-700 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">3</span>
              </button>
              <button className="rounded-lg bg-primary-600 px-6 py-2 text-white hover:bg-primary-700 transition-colors font-semibold">
                + New Project
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-dark-800 p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-lg bg-${stat.color}-500/20 p-3`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                  </div>
                  <div className={`text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} vs last month
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-dark-800 bg-dark-900 p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Overall Performance</h3>
                  <p className="text-dark-400 text-sm">
                    <span className="text-2xl font-bold text-white">$45,200</span>
                    <span className="ml-2 text-green-500 font-semibold">+8%</span>
                  </p>
                </div>
                <select className="rounded-lg bg-dark-800 border border-dark-700 px-4 py-2 text-white text-sm">
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ fill: '#0ea5e9', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-dark-800 bg-dark-900 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Project Status</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                {projectStatusData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-dark-300">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{item.value}</span>
                      <span className="text-dark-500">({Math.round((item.value / 65) * 100)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-dark-800 bg-dark-900 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Recent Activity Log</h3>
              <button className="text-primary-500 hover:text-primary-400 text-sm font-semibold">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 rounded-lg bg-dark-800 p-4">
                    <div className="rounded-full bg-primary-500/20 p-2">
                      <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-dark-400 text-sm">{activity.description}</p>
                      <p className="text-dark-500 text-xs mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 rounded-lg bg-dark-800 p-4">
                    <div className="rounded-full bg-green-500/20 p-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">New project created: TechVision Rebrand</p>
                      <p className="text-dark-400 text-sm">Today, 2:45 PM • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rounded-lg bg-dark-800 p-4">
                    <div className="rounded-full bg-blue-500/20 p-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Payment received from Global Traders</p>
                      <p className="text-dark-400 text-sm">Yesterday, 4:20 PM • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 rounded-lg bg-dark-800 p-4">
                    <div className="rounded-full bg-purple-500/20 p-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">New client inquiry: Sarah Johnson</p>
                      <p className="text-dark-400 text-sm">Monday, 2:15 PM • 3 days ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-2xl border border-dark-800 bg-dark-900 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">New Leads</h3>
              <div className="space-y-4">
                {[
                  { name: 'Rajesh Kumar', company: 'Tech Solutions', avatar: '👤' },
                  { name: 'Anita Singh', company: 'Digital Hub', avatar: '👤' },
                  { name: 'John Doe', company: 'StartupXYZ', avatar: '👤' }
                ].map((lead, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-dark-800 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/20 text-xl">
                        {lead.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{lead.name}</p>
                        <p className="text-sm text-dark-400">{lead.company}</p>
                      </div>
                    </div>
                    <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
                      Contact
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-2xl border border-dark-800 bg-dark-900 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Total Services</span>
                  <span className="text-2xl font-bold text-white">{services.length || 12}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Pricing Plans</span>
                  <span className="text-2xl font-bold text-white">{pricing.length || 3}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Active Clients</span>
                  <span className="text-2xl font-bold text-white">87</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400">Team Members</span>
                  <span className="text-2xl font-bold text-white">15</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
