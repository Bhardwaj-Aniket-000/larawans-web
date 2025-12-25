import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardSidebar } from '../../components/DashboardSidebar';
import { useServices } from '../../hooks/useServices';
import { fadeUp, staggerContainer } from '../../animations/variants';

export const DashboardServices = () => {
  const { services, loading } = useServices({ activeOnly: true });

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    const numeric = Number(String(amount ?? '').replace(/[^0-9.]/g, ''));
    return `₹${(Number.isFinite(numeric) ? numeric : 0).toLocaleString('en-IN')}`;
  };

  return (
    <div className="flex min-h-screen bg-dark-950">
      <DashboardSidebar />
      
      <div className="flex-1 lg:ml-64">
        <div className="container mx-auto px-4 py-24">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Manage Services</h1>
              <p className="mt-2 text-dark-400">View all published services</p>
            </div>
            <Link
              to="/admin/services"
              className="inline-flex items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Service</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-2xl border border-dark-800 bg-dark-900 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-800 text-3xl">
                📦
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">No services available</h3>
              <p className="mb-6 text-dark-400">Once admins publish services, they will appear here automatically.</p>
              <Link
                to="/admin/services"
                className="inline-flex items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-all hover:bg-primary-700"
              >
                <Plus className="h-5 w-5" />
                <span>Add Service</span>
              </Link>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => {
                const isActive = service.status ?? service.isActive ?? true;
                return (
                  <motion.div
                    key={service.id || `${service.title}-${index}`}
                    variants={fadeUp}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    className="relative overflow-hidden rounded-2xl border border-dark-800 bg-gradient-to-br from-dark-800 to-dark-900 p-6"
                  >
                    <div className="absolute inset-0 opacity-10" />
                    <div className="mb-4 flex items-start justify-between">
                      <div className="text-4xl">{service.icon || service.image || '🚀'}</div>
                      <div
                        className={`inline-flex items-center space-x-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {isActive ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                        <span>{isActive ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                    <p className="mb-4 text-sm text-dark-300">{service.shortDescription || service.description}</p>
                    <div className="mb-4 text-2xl font-bold text-primary-500">
                      {formatCurrency(service.startingPrice ?? service.price)}
                    </div>
                    <div className="space-y-2">
                      {service.features?.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-center space-x-2 text-sm text-dark-300">
                          <CheckCircle className="h-3.5 w-3.5 text-primary-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {service.features?.length > 4 && (
                        <p className="text-xs text-dark-500">+{service.features.length - 4} more</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
