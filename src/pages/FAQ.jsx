import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ChevronDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Helmet } from 'react-helmet-async';

export const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = ['All', 'General', 'Pricing', 'Services', 'Support', 'Technical'];

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const faqsQuery = query(
        collection(db, 'faqs'),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const faqsSnapshot = await getDocs(faqsQuery);
      const faqsData = faqsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFaqs(faqsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to common questions about our digital marketing services, pricing, and processes."
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 text-5xl font-bold text-white lg:text-6xl">
              Frequently Asked <span className="text-primary-500">Questions</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              Find answers to common questions about our services, pricing, and processes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-lg px-6 py-3 font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/50'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="rounded-2xl border border-dark-800 bg-dark-900 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-800 text-3xl">
                ❓
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">No FAQs available</h3>
              <p className="text-dark-400">Check back later for more information</p>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-dark-800 bg-dark-900"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-dark-800"
                    aria-expanded={openFAQ === faq.id}
                  >
                    <h2 className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </h2>
                    <motion.div
                      animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-6 w-6 text-primary-500" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-dark-800 p-6">
                          <p className="text-dark-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-700 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
              Still Have Questions?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 transition-all hover:bg-gray-100"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
};
