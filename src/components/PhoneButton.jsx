import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export const PhoneButton = () => {
  const phoneNumber = '7015150181';
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <motion.button
      onClick={handleCall}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-8 z-40 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
      aria-label="Call us"
    >
      <Phone className="h-6 w-6" />
    </motion.button>
  );
};
