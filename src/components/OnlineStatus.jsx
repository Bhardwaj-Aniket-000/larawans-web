import { motion } from 'framer-motion';

export const OnlineStatus = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-24 z-40 flex items-center space-x-2 rounded-full bg-dark-800 px-4 py-2 shadow-lg"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="h-2 w-2 rounded-full bg-green-500"
      />
      <span className="text-xs font-medium text-white">We're Online</span>
    </motion.div>
  );
};
