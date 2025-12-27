import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { collection, getDocs, limit, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import WavyDivider from '../components/WavyDivider';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';


const Home = () => {
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesQuery = query(collection(db, 'services'), limit(6));
        const servicesSnap = await getDocs(servicesQuery);
        setServices(servicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const testimonialsQuery = query(collection(db, 'testimonials'), limit(5));
        const testimonialsSnap = await getDocs(testimonialsQuery);
        setTestimonials(testimonialsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchServices();
    fetchTestimonials();

    // Real-time gallery listener
    const galleryQuery = query(
      collection(db, 'gallery'),
      where('status', '==', true),
      limit(8)
    );
    
    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const galleryData = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setGallery(galleryData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching gallery:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const bannerImages = [
    '/assets/banner/WhatsApp Image1.jpeg',
    '/assets/banner/WhatsApp Image2.jpeg',
    '/assets/banner/WhatsApp Image3.jpeg',
    '/assets/banner/WhatsApp Image4.jpeg',
  ];

  const statsData = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '120+', label: 'Brands Partnered' },
    { value: '25+', label: 'Industry Awards' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-full"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-pink-900/70 z-10" />
                <div className="absolute -top-24 -right-32 w-96 h-96 bg-pink-500/30 blur-3xl rounded-full z-10" />
                <div className="absolute -bottom-20 -left-16 w-96 h-96 bg-indigo-500/30 blur-3xl rounded-full z-10" />
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* <ThreeHeroBackground image={image} /> */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
                    >
                      Elevate Your Brand with
                      <span className="block mt-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">Creative Excellence</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-lg sm:text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto font-light"
                    >
                      We create stunning digital experiences that drive growth and inspire action
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                      <Button to="/services" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl">
                        Explore Services
                      </Button>
                      <Button to="/contact" variant="outline" size="lg" className="text-white border-2 border-white hover:bg-white hover:text-indigo-600">
                        Get Started
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <WavyDivider className="absolute bottom-0 left-0 right-0 z-30" />
      </section>
          {/* TRIANGLE SHAPES */}

      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-bgLight">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </p>
                <p className="text-textSecondary text-sm sm:text-base font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="What We Offer"
            title="Our Premium Services"
          />
          
          {loading ? (
            <LoadingSpinner />
          ) : services.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="pb-12"
            >
              {services.map((service, index) => (
                <SwiperSlide key={service.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                    className="card-surface p-8 h-full flex flex-col bg-gradient-to-br from-white to-bgLight"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                      <span className="text-3xl">{service.icon || '🚀'}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-textPrimary mb-4">
                      {service.title}
                    </h3>
                    <p className="text-textSecondary mb-6 leading-relaxed flex-grow">
                      {service.shortDescription}
                    </p>
                    {service.startingPrice && (
                      <p className="text-primary font-bold text-2xl mb-6">
                        ₹{service.startingPrice}
                        <span className="text-sm text-textMuted font-normal ml-2">onwards</span>
                      </p>
                    )}
                    <Button variant="ghost" className="group w-full justify-center">
                      Learn More
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-12">
              <p className="text-textMuted text-lg">No services available yet.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button to="/services" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>
      {/* <div className="absolute bottom-0 right-0 w-[60%] h-[45%] bg-orange-500 triangle-right z-10 hidden lg:block" />

      <div className="absolute bottom-0 right-0 w-[45%] h-[30%] bg-[#0F2A44] triangle-right z-20 hidden lg:block" /> */}
      

      <section className="py-16 sm:py-20 lg:py-24 bg-bgLight">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Our Work"
            title="Gallery Showcase"
          />

          {loading ? (
            <LoadingSpinner />
          ) : gallery.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {gallery.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Gallery'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                      <h4 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h4>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-12">
              <p className="text-textMuted text-lg">No gallery items available yet.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Button to="/gallery" variant="outline" size="lg">
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Client Reviews"
            title="What Our Clients Say"
          />

          {loading ? (
            <LoadingSpinner />
          ) : testimonials.length > 0 ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 4000 }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="card-surface rounded-xl p-8 h-full bg-white border-2 border-transparent hover:border-primary transition-all"
                  >
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < (testimonial.rating || 5)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-textSecondary mb-8 leading-relaxed text-lg">
                      "{testimonial.message}"
                    </p>
                    <div className="flex items-center mt-auto">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                        {testimonial.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <h4 className="font-bold text-textPrimary text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-textSecondary">
                          {testimonial.position || 'Client'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-12">
              <p className="text-textMuted text-lg">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-32 w-96 h-96 bg-pink-500/30 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -left-16 w-96 h-96 bg-indigo-500/30 blur-3xl rounded-full"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button to="/contact" size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 shadow-xl">
                Contact Us Now
              </Button>
              <Button to="/services" variant="outline" size="lg" className="text-white border-2 border-white hover:bg-white hover:text-indigo-600">
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
