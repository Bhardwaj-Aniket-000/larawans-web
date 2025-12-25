import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, Award, Zap, Image as ImageIcon } from 'lucide-react';
import { SEO } from '../components/SEO';
import { galleryService } from '../services/galleryService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import banner1 from '../assets/banner/WhatsApp Image1.jpeg';
import banner2 from '../assets/banner/WhatsApp Image2.jpeg';
import banner3 from '../assets/banner/WhatsApp Image3.jpeg';
import banner4 from '../assets/banner/WhatsApp Image4.jpeg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const heroImages = [
  banner1,
  banner2,
  banner3,
  banner4,
];

export const Home = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const unsubscribe = galleryService.subscribeToActiveGallery((data) => {
      setGalleryItems(data.slice(0, 8));
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  const stats = [
    { value: 500, suffix: '+', label: 'Projects Completed' },
    { value: 200, suffix: '+', label: 'Happy Clients' },
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites built with cutting-edge technologies for optimal performance.',
      icon: '💻',
      price: '₹9,999',
    },
    {
      title: 'SEO Optimization',
      description: 'Boost your search rankings and drive organic traffic to your website.',
      icon: '🔍',
      price: '₹14,999',
    },
    {
      title: 'Social Media Marketing',
      description: 'Engage your audience and grow your brand across all social platforms.',
      icon: '📱',
      price: '₹12,999',
    },
    {
      title: 'Branding & Design',
      description: 'Create a memorable brand identity that resonates with your audience.',
      icon: '🎨',
      price: '₹19,999',
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Consultation',
      description: 'We discuss your goals and create a tailored strategy.',
      icon: Users,
    },
    {
      step: '2',
      title: 'Planning',
      description: 'Detailed roadmap and timeline for your project.',
      icon: TrendingUp,
    },
    {
      step: '3',
      title: 'Execution',
      description: 'Our team brings your vision to life with precision.',
      icon: Zap,
    },
    {
      step: '4',
      title: 'Launch',
      description: 'Deploy and monitor for optimal performance.',
      icon: Award,
    },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO, TechCorp',
      content: 'Larawans transformed our digital presence completely. Our traffic increased by 300% in just 3 months!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      content: 'Professional, creative, and results-driven. Best agency we\'ve worked with!',
      rating: 5,
    },
    {
      name: 'Mike Davis',
      role: 'Founder, StartupXYZ',
      content: 'They delivered beyond our expectations. Highly recommend their services!',
      rating: 5,
    },
  ];

  return (
    <>
      <SEO />
      
      <section className="relative overflow-hidden bg-dark-950 pt-24 pb-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container relative z-0 mx-auto px-4">
          <div className="rounded-3xl border border-dark-800 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900/80 p-5 shadow-2xl">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="hero-image-swiper"
            >
              {heroImages.map((image, index) => (
                <SwiperSlide key={image}>
                  <motion.div
                    initial={{ opacity: 0.6, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-2xl"
                  >
                    <img
                      src={image}
                      alt={`Agency showcase ${index + 1}`}
                      className="h-[320px] w-full object-cover sm:h-[400px]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-dark-300">Featured Project</p>
                      <h3 className="text-2xl font-semibold text-white">Digital Growth Campaign {index + 1}</h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="relative -mt-2 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 pt-6">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 inline-block rounded-full bg-primary-600/10 px-4 py-2 text-sm font-medium text-primary-400"
              >
                🚀 Leading Digital Marketing Agency
              </motion.div>
              
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-7xl">
                Transform Your
                <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Digital Presence
                </span>
              </h1>
              
              <p className="mb-8 text-lg text-dark-300 lg:text-xl">
                We are a digital marketing agency that helps businesses grow online with SEO, SEM, Social Media Marketing, and Web Development services.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/50"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-dark-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-primary-600 hover:bg-primary-600/10"
                >
                  Our Work
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary-600/20 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary-500/20 blur-2xl" />
                
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-dark-950/50 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-lg bg-primary-600/20 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-primary-500" />
                      </div>
                      <div>
                        <div className="text-sm text-dark-400">Traffic Growth</div>
                        <div className="text-2xl font-bold text-white">+245%</div>
                      </div>
                    </div>
                    <div className="text-green-500 text-sm font-semibold">↗ 12.5%</div>
                  </div>
                  
                  <div className="rounded-lg bg-dark-950/50 p-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-dark-400">SEO Score</span>
                      <span className="font-semibold text-white">94/100</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-dark-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-dark-950/50 p-4">
                      <div className="text-sm text-dark-400">Conversions</div>
                      <div className="text-2xl font-bold text-white">3.2K</div>
                    </div>
                    <div className="rounded-lg bg-dark-950/50 p-4">
                      <div className="text-sm text-dark-400">ROI</div>
                      <div className="text-2xl font-bold text-white">385%</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-dark-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div 
                  className="mb-2 text-4xl font-bold text-primary-500 lg:text-5xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                </motion.div>
                <div className="text-sm text-dark-400 lg:text-base">{stat.label}</div>
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
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Comprehensive <span className="text-primary-500">Digital Solutions</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              From strategy to execution, we provide end-to-end digital marketing services
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 p-8 transition-all hover:shadow-2xl hover:shadow-primary-600/20"
              >
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary-600/10 blur-2xl transition-all group-hover:bg-primary-600/20" />
                
                <div className="relative">
                  <div className="mb-4 text-5xl">{service.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                  <p className="mb-6 text-dark-400">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary-500">{service.price}</span>
                    <ArrowRight className="h-5 w-5 text-primary-500 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
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
              Our Work <span className="text-primary-500">Process</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              See how we transform ideas to reality in 4 steps
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-2xl font-bold text-white shadow-lg shadow-primary-600/50">
                  {item.step}
                </div>
                <div className="mb-4 flex justify-center">
                  <item.icon className="h-8 w-8 text-primary-500" />
                </div>
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
              Our <span className="text-primary-500">Gallery</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              Explore our portfolio of creative work and successful projects
            </p>
          </motion.div>

          {galleryItems.length > 0 ? (
            <>
              <div className="mb-12">
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  slidesPerView={1}
                  spaceBetween={20}
                  loop={galleryItems.length > 3}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  navigation
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  className="gallery-swiper"
                >
                  {galleryItems.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative overflow-hidden rounded-2xl bg-dark-800"
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {galleryItems.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={`grid-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl bg-dark-800"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Link
                  to="/gallery"
                  className="inline-flex items-center space-x-2 rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/50"
                >
                  <span>View Full Gallery</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-dark-800 p-12 text-center"
            >
              <ImageIcon className="mx-auto mb-4 h-16 w-16 text-dark-600" />
              <h3 className="mb-2 text-xl font-semibold text-white">Gallery Coming Soon</h3>
              <p className="text-dark-400">We're working on showcasing our amazing projects</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Client <span className="text-primary-500">Feedback</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-dark-800 p-8"
              >
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="mb-6 text-dark-300">{testimonial.content}</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-dark-400">{testimonial.role}</div>
                </div>
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
              Let's get started today and transform your digital presence with our expert team
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
