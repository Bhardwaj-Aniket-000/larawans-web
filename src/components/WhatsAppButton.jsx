import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhatsAppButton = ({ offsetBottomClass = 'bottom-8' }) => {
  const phoneNumber = '1234567890';
  const message = 'Hi! I would like to know more about your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed ${offsetBottomClass} left-8 z-40 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
};
