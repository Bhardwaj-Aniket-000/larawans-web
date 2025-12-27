import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Thumbs } from 'swiper/modules';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaTimes } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import WavyDivider from '../components/WavyDivider';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    // Real-time gallery listener
    const q = query(
      collection(db, 'gallery'),
      where('status', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(
      q,
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

  return (
    <div className="min-h-screen bg-bgMain pt-20">
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 hero-text-shadow">
              Our Gallery
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto">
              Explore our portfolio of creative work and successful projects
            </p>
          </motion.div>
        </div>
      </section>
          <WavyDivider className="absolute top-0 left-0 right-0" flip color="#f873b5ff" />

      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : gallery.length > 0 ? (
            <>
              <Swiper
                modules={[Autoplay, Pagination, Navigation, Thumbs]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="mb-8 rounded-2xl overflow-hidden shadow-card-hover border border-borderColor"
              >
                {gallery.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div 
                      className="relative aspect-video cursor-pointer"
                      onClick={() => setSelectedImage(item)}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title || 'Gallery'}
                        className="w-full h-full object-cover"
                      />
                      {item.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-textPrimary/80 to-transparent p-6">
                          <h3 className="text-white text-2xl font-bold">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-white/90 mt-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                breakpoints={{
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                  1280: { slidesPerView: 8 },
                }}
                watchSlidesProgress
                className="gallery-thumbs"
              >
                {gallery.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity border border-borderColor">
                      <img
                        src={item.imageUrl}
                        alt={item.title || 'Thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-16 bg-[#f5e2ceff]">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden shadow-card hover:shadow-card-hover cursor-pointer border border-borderColor hover:border-secondary"
                    onClick={() => setSelectedImage(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Gallery'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-textPrimary/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {item.title && (
                        <h4 className="text-white font-semibold text-sm">
                          {item.title}
                        </h4>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-bgSoft rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🖼️</span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                No Gallery Items
              </h3>
              <p className="text-textMuted">
                Gallery items will be displayed here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>
      {/* <WavyDivider className="absolute top-0 left-0 right-0" flip color="#f873b5ff" /> */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-textPrimary/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || 'Gallery'}
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
              />
              {selectedImage.title && (
                <div className="mt-6 text-center">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-white/80">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
