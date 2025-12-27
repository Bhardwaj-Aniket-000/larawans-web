import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        const faqsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFaqs(faqsData.filter(faq => faq.active !== false));
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [...new Set(faqs.map(faq => faq.category || 'General'))];

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
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto">
              Find answers to common questions about our services and processes
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : faqs.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              {categories.map((category, catIndex) => {
                const categoryFaqs = faqs.filter(faq => (faq.category || 'General') === category);
                
                return (
                  <div key={catIndex} className="mb-12">
                    <h2 className="text-2xl font-bold text-textPrimary mb-6 pb-3 border-b-2 border-primary/20">
                      {category}
                    </h2>
                    
                    <div className="space-y-4">
                      {categoryFaqs.map((faq, index) => {
                        const globalIndex = faqs.indexOf(faq);
                        const isOpen = openIndex === globalIndex;
                        
                        return (
                          <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="card-surface rounded-xl overflow-hidden"
                          >
                            <button
                              onClick={() => toggleFAQ(globalIndex)}
                              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-bgSoft/50 transition-colors min-h-[68px]"
                            >
                              <span className="font-semibold text-textPrimary pr-4 text-base sm:text-lg">
                                {faq.question}
                              </span>
                              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                                {isOpen ? (
                                  <FaChevronUp className="w-4 h-4" />
                                ) : (
                                  <FaChevronDown className="w-4 h-4" />
                                )}
                              </span>
                            </button>
                            
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                                    <p className="text-textSecondary leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-bgSoft rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">❓</span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                No FAQs Available
              </h3>
              <p className="text-textMuted">
                Frequently asked questions will be displayed here once they are added.
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
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-textSecondary mb-8">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 min-h-[56px]"
              >
                Contact Support
              </a>
              <a
                href="mailto:info@larawans.com"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 min-h-[56px]"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
