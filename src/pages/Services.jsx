import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useServices } from '../hooks/useServices';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper-custom.css';

const isImageIcon = (icon) =>
  typeof icon === 'string' && (icon.startsWith('http://') || icon.startsWith('https://'));

const renderServiceIcon = (icon, className = 'h-16 w-16') => {
  if (isImageIcon(icon)) {
    return (
      <img
        src={icon}
        alt=""
        className={`${className} object-contain drop-shadow-[0_4px_12px_rgba(14,165,233,0.25)]`}
        loading="lazy"
      />
    );
  }

  return <span className={`text-5xl ${className}`}>{icon || '🚀'}</span>;
};

const formatCurrency = (amount) =>
  typeof amount === 'number'
    ? `₹${amount.toLocaleString('en-IN')}`
    : amount || '₹0';

export const Services = () => {
  const { services: liveServices, loading } = useServices({ activeOnly: true });
  const [featuredService, setFeaturedService] = useState(null);
  const featuredSectionRef = useRef(null);

  useEffect(() => {
    if (liveServices.length > 0) {
      setFeaturedService(liveServices[0]);
    } else {
      setFeaturedService(null);
    }
  }, [liveServices]);

  const handleServiceClick = (service) => {
    setFeaturedService(service);
    requestAnimationFrame(() => {
      featuredSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const packageFeatures = [
    'COMPLETE PLAN',
    'UNLIMITED FEATURES',
    'BEST SERVICES',
    'UNLIMITED SUPPORT',
    'UNLIMITED REVISIONS',
    'FREE DOMAIN',
    '24/7 SUPPORT',
  ];

  return (
    <>
      <SEO 
        title="Our Digital Services"
        description="Comprehensive digital marketing services including web development, SEO, social media marketing, and more."
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
              Our Digital <span className="text-primary-500">Services</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              From web development to digital marketing, we offer comprehensive solutions to help your business thrive in the digital world. Let's talk, SEO, SEM, SMM & more.
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
          ) : liveServices.length === 0 ? (
            <div className="rounded-2xl border border-dark-800 bg-dark-900 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dark-800 text-3xl">
                🙌
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Services coming soon</h3>
              <p className="text-dark-400">Our team is preparing something amazing. Check back shortly.</p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1.05}
              navigation
              pagination={{ clickable: true }}
              loop
              speed={800}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.1,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 3.5,
                },
              }}
              className="services-swiper"
            >
              {liveServices.map((service, index) => (
                <SwiperSlide key={service.id || service.title || index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800/90 to-dark-900/90 transition-all hover:shadow-2xl hover:shadow-primary-600/20"
                  >
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary-600/10 blur-2xl transition-all group-hover:bg-primary-600/20" />

                    <div className="relative flex h-full flex-col p-8" onClick={() => handleServiceClick(service)}>
                      <div className="mb-6 flex items-center justify-between">
                        {renderServiceIcon(service.icon, isImageIcon(service.icon) ? 'h-14 w-14' : 'h-14 w-14')}
                        <Sparkles className="h-8 w-8 text-primary-500" />
                      </div>

                      <h3 className="mb-3 text-2xl font-bold text-white">{service.title}</h3>
                      <p className="mb-6 flex-1 text-dark-400">{service.shortDescription}</p>

                      <div className="mb-6 space-y-2">
                        {service.features?.filter(Boolean).map((feature) => (
                          <div key={feature} className="flex items-center space-x-2 text-sm text-dark-300">
                            <CheckCircle className="h-4 w-4 text-primary-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-dark-700 pt-6">
                        <div>
                          <div className="text-sm text-dark-400">Starting at</div>
                          <div className="text-2xl font-bold text-primary-500">{formatCurrency(service.startingPrice)}</div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceClick(service);
                          }}
                          className="flex items-center space-x-2 text-primary-500 transition-all hover:text-primary-400"
                        >
                          <span className="font-semibold">View Highlights</span>
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

{featuredService && (
      <section ref={featuredSectionRef} id="featured-service" className="bg-dark-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-8 -left-8 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl" />
              <div className="relative rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 p-12">
                <div className="mb-8">
                  <div className="mb-4 text-6xl">{featuredService.icon || '🚀'}</div>
                  <h3 className="mb-2 text-3xl font-bold text-white">FEATURED SERVICE</h3>
                  <h2 className="mb-4 text-4xl font-bold text-primary-500">{featuredService.title}</h2>
                </div>
                
                <p className="mb-8 text-dark-300">
                  {featuredService.shortDescription}
                </p>
                
                <div className="mb-8">
                  <div className="mb-2 flex items-baseline space-x-2">
                    <span className="text-sm text-dark-400">Starting at</span>
                  </div>
                  <div className="mb-4 flex items-baseline space-x-2">
                    <span className="text-5xl font-bold text-white">
                      {formatCurrency(featuredService.startingPrice)}
                    </span>
                  </div>
                  <div className="inline-block rounded-full bg-green-500/20 px-4 py-1 text-sm font-semibold text-green-500">
                    SPECIAL OFFER - LIMITED TIME
                  </div>
                </div>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 text-lg font-bold text-dark-950 transition-all hover:from-yellow-600 hover:to-yellow-700"
                >
                  GET STARTED NOW
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="mb-6 text-3xl font-bold text-white">What's Included:</h3>
                  <div className="space-y-4">
                    {featuredService.features?.filter(Boolean).map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-medium text-dark-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-dark-800 p-6">
                  <h4 className="mb-4 text-xl font-bold text-white">Why Choose This Service:</h4>
                  <ul className="space-y-2 text-dark-300">
                    <li>✓ Professional Quality Guaranteed</li>
                    <li>✓ Fast Turnaround Time</li>
                    <li>✓ Unlimited Revisions</li>
                    <li>✓ Dedicated Support Team</li>
                    <li>✓ Money-Back Guarantee</li>
                    <li>✓ Free Consultation</li>
                    <li>✓ 24/7 Customer Support</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Our Work <span className="text-primary-500">Process</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              See how we transform ideas to reality in 4 steps
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '1', title: 'Consultation', description: 'We start by understanding your business goals and requirements.', icon: '💬' },
              { step: '2', title: 'Strategy', description: 'Create a customized plan tailored to your specific needs.', icon: '📋' },
              { step: '3', title: 'Execution', description: 'Our expert team brings your vision to life with precision.', icon: '⚡' },
              { step: '4', title: 'Launch & Support', description: 'Deploy your project and provide ongoing support.', icon: '🚀' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-2xl font-bold text-white shadow-lg shadow-primary-600/50">
                  {item.step}
                </div>
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-dark-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Why Choose <span className="text-primary-500">Larawans?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Expert Team', description: 'Our team of experts has years of experience in digital marketing.', icon: '👥' },
              { title: 'Affordable Pricing', description: 'Get premium services at competitive prices that fit your budget.', icon: '💰' },
              { title: 'On-Time Delivery', description: 'We respect deadlines and deliver projects on time, every time.', icon: '⏰' },
              { title: 'Quality Assurance', description: 'Rigorous testing ensures the highest quality standards.', icon: '✅' },
              { title: '24/7 Support', description: 'Round-the-clock support to address all your concerns.', icon: '🛟' },
              { title: 'Local Advice', description: 'Personalized guidance based on local market insights.', icon: '📍' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-dark-800 p-8 text-center"
              >
                <div className="mb-4 text-5xl">{item.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-dark-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
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
              { q: 'Do you offer refunds and money-back guarantee?', a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our services.' },
              { q: 'How do I choose the best package?', a: 'Contact us for a free consultation, and we\'ll help you choose the package that best fits your needs and budget.' },
              { q: 'How long does it take to complete a project?', a: 'Project timelines vary based on complexity. Typically, websites take 2-4 weeks, while comprehensive packages may take 6-8 weeks.' },
              { q: 'Do you offer custom packages?', a: 'Absolutely! We can create custom packages tailored to your specific requirements.' },
              { q: 'What support do I get? How much?', a: 'All packages include ongoing support. Premium packages include 24/7 priority support for 6 months.' },
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

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-700 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
              Ready to Scale Your Business?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              Let's get started today and transform your digital presence
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 transition-all hover:bg-gray-100"
              >
                TALK TO US TODAY
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-primary-600"
              >
                SCHEDULE CALL
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
