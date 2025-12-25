import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950"
    >
      <div className="w-64">
        <div className="mb-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-white"
          >
            LARAWANS
          </motion.div>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-dark-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
          />
        </div>
        <div className="mt-2 text-center text-sm text-dark-400">
          {progress}%
        </div>
      </div>
    </motion.div>
  );
};
