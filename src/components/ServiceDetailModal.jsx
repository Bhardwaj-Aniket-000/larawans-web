import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

const formatCurrency = (amount) =>
  typeof amount === 'number'
    ? `₹${amount.toLocaleString('en-IN')}`
    : amount || '₹0';

export const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 shadow-2xl"
          >
            <div className="relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-dark-700/80 text-dark-300 transition-all hover:bg-dark-600 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 md:p-12">
                <div className="mb-8 flex items-center space-x-4">
                  <div className="text-6xl">{service.icon || '🚀'}</div>
                  <div>
                    <h2 className="mb-2 text-4xl font-bold text-white">{service.title}</h2>
                    <p className="text-xl text-primary-500">{formatCurrency(service.startingPrice)}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="mb-4 text-2xl font-bold text-white">Overview</h3>
                  <p className="text-lg leading-relaxed text-dark-300">{service.shortDescription}</p>
                </div>

                <div className="mb-8">
                  <h3 className="mb-4 text-2xl font-bold text-white">Features Included</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {service.features?.map((feature, index) => (
                      <motion.div
                        key={feature || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center space-x-3 rounded-lg bg-dark-700/50 p-4"
                      >
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary-500" />
                        <span className="text-dark-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="/contact"
                    className="flex-1 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-4 text-center text-lg font-semibold text-white transition-all hover:from-primary-700 hover:to-primary-800"
                  >
                    Get Started Now
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-lg border-2 border-dark-600 px-8 py-4 text-center text-lg font-semibold text-dark-300 transition-all hover:border-dark-500 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
