import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { SEO } from '../components/SEO';

export const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultPlans = [
    {
      name: 'Starter',
      price: '9,999',
      period: 'month',
      description: 'Perfect for small businesses getting started',
      features: [
        'Basic Website Design',
        'Mobile Responsive',
        '5 Pages',
        'Basic SEO',
        'Contact Form',
        '1 Month Support',
        'Social Media Setup',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '19,999',
      period: 'month',
      description: 'Ideal for growing businesses',
      features: [
        'Custom Website Design',
        'Mobile Responsive',
        '15 Pages',
        'Advanced SEO',
        'E-commerce Integration',
        '3 Months Support',
        'Social Media Management',
        'Email Marketing',
        'Analytics Dashboard',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '49,999',
      period: 'month',
      description: 'For large-scale operations',
      features: [
        'Premium Custom Design',
        'Unlimited Pages',
        'Advanced SEO & SEM',
        'Full E-commerce Suite',
        '12 Months Support',
        'Complete Digital Marketing',
        'Dedicated Account Manager',
        'Priority Support 24/7',
        'Custom Integrations',
        'Advanced Analytics',
      ],
      popular: false,
    },
  ];

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const pricingQuery = query(
        collection(db, 'pricing'),
        where('isActive', '==', true)
      );
      const pricingSnapshot = await getDocs(pricingQuery);
      
      if (pricingSnapshot.empty) {
        setPlans(defaultPlans);
      } else {
        const pricingData = pricingSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          popular: doc.data().highlight || false
        }));
        setPlans(pricingData);
      }
      setLoading(false);
    } catch (error) {
      setPlans(defaultPlans);
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Pricing Plans"
        description="Choose the perfect plan for your business. Affordable pricing with no hidden fees."
      />

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
              Simple, Transparent <span className="text-primary-500">Pricing</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              Choose the perfect plan for your business. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-2xl ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary-600 to-primary-700 shadow-2xl shadow-primary-600/50'
                    : 'bg-dark-800'
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-500 px-4 py-1 text-sm font-bold text-dark-950">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`mb-2 text-2xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-dark-400'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-white'}`}>
                      ₹{plan.price}
                    </span>
                    <span className={`ml-2 ${plan.popular ? 'text-white/80' : 'text-dark-400'}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <Check className={`h-5 w-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary-500'}`} />
                      <span className={plan.popular ? 'text-white/90' : 'text-dark-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`group flex w-full items-center justify-center rounded-lg px-8 py-4 text-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-white text-primary-600 hover:bg-gray-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-dark-400">
              Need a custom plan? <Link to="/contact" className="text-primary-500 hover:text-primary-400">Contact us</Link> for a personalized quote.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Frequently Asked <span className="text-primary-500">Questions</span>
            </h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, UPI, and bank transfers.' },
              { q: 'Is there a setup fee?', a: 'No, all our plans include free setup. You only pay the monthly subscription fee.' },
              { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our services.' },
              { q: 'What happens after the support period ends?', a: 'You can extend support by subscribing to our maintenance plans or upgrade to a higher tier.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-dark-800 p-6"
              >
                <h3 className="mb-2 font-semibold text-white">{faq.q}</h3>
                <p className="text-dark-400">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
