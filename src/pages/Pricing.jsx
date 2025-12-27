import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { FaCheck, FaStar } from 'react-icons/fa';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const q = query(collection(db, 'pricing'), orderBy('price', 'asc'));
        const querySnapshot = await getDocs(q);
        const plansData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPlans(plansData);
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
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
              Pricing Plans
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto">
              Choose the perfect plan for your business needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : plans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative card-surface rounded-2xl p-6 sm:p-8 flex flex-col ${
                    plan.featured ? 'border-2 border-primary lg:scale-105' : 'border border-borderColor'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                      <FaStar className="w-3 h-3 mr-1" />
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-textPrimary mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-textMuted text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-primary">
                        ${plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-textMuted ml-2">/ {plan.period}</span>
                      )}
                    </div>
                  </div>

                  {plan.features && plan.features.length > 0 && (
                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-textSecondary">
                          <FaCheck className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button
                    variant={plan.featured ? 'primary' : 'outline'}
                    className="w-full mt-auto"
                    size="lg"
                    to="/contact"
                  >
                    {plan.buttonText || 'Get Started'}
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-bgSoft rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                No Pricing Plans Available
              </h3>
              <p className="text-textMuted mb-8">
                Pricing plans will be displayed here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6">
                Need a Custom Plan?
              </h2>
              <p className="text-lg text-textSecondary mb-8">
                We offer flexible pricing for unique business requirements
              </p>
              <Button to="/contact" size="lg">
                Contact Sales
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              {[
                { icon: '🎯', title: 'Tailored Solutions', desc: 'Custom packages for your needs' },
                { icon: '💎', title: 'Premium Support', desc: '24/7 dedicated assistance' },
                { icon: '🚀', title: 'Scalable Plans', desc: 'Grow as your business grows' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-cardBg rounded-xl p-6 text-center shadow-card border border-borderColor"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-textPrimary mb-2">{item.title}</h3>
                  <p className="text-sm text-textMuted">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
