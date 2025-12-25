import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X } from 'lucide-react';
import { galleryService } from '../services/galleryService';
import { SEO } from '../components/SEO';

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = galleryService.subscribeToActiveGallery((data) => {
      console.log('Gallery items received:', data);
      setItems(data);
      setLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Gallery"
        description="Explore our portfolio of creative work and projects at Larawans Digital."
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
              Our <span className="text-primary-500">Gallery</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              Explore our portfolio of creative work and successful projects
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-dark-800 p-12 text-center"
            >
              <ImageIcon className="mx-auto mb-4 h-16 w-16 text-dark-600" />
              <h3 className="mb-2 text-xl font-semibold text-white">No images yet</h3>
              <p className="text-dark-400">Check back soon for our latest work</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl bg-dark-800"
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
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 rounded-full bg-dark-800 p-3 text-white transition-colors hover:bg-dark-700"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-5xl"
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[90vh] w-full rounded-2xl object-contain"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
