import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import WavyDivider from '../components/WavyDivider';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, 'services'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const servicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5e2ceff] pt-20">
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 hero-text-shadow">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to elevate your business
            </p>
          </motion.div>
        </div>
      </section>
            <WavyDivider className="absolute top-0 left-0 right-0" flip color="#f873b5ff" />

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="card-surface rounded-2xl p-6 sm:p-8 flex flex-col h-full"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-3xl">{service.icon || '🚀'}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-textPrimary mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-textMuted mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-textSecondary">
                          <FaCheck className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.price && (
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-primary">
                        ${service.price}
                      </span>
                      {service.priceUnit && (
                        <span className="text-textMuted ml-2">/ {service.priceUnit}</span>
                      )}
                    </div>
                  )}

                  <Button variant="outline" className="w-full group mt-auto">
                    Get Started
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-bgSoft rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                No Services Available
              </h3>
              <p className="text-textMuted mb-8">
                Services will be displayed here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
              We offer tailored solutions to meet your specific business needs
            </p>
            <Button to="/contact" size="lg">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
