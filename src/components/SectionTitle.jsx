import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="inline-block text-primary font-semibold text-sm sm:text-base uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textPrimary section-title-shadow">
        {title}
      </h2>
    </motion.div>
  );
};

export default SectionTitle;
