import { motion } from 'framer-motion';

const WavyDivider = ({ className = '', flip = false, color = '#F3F4F6' }) => {
  return (
    <div className={`relative w-full ${className}`} style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
      <svg
        className="w-full h-12 sm:h-16 md:h-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,120 L0,120 Z"
          fill={color}
          initial={{ d: "M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,120 L0,120 Z",
              "M0,0 C150,20 350,20 600,50 C850,80 1050,80 1200,50 L1200,120 L0,120 Z",
              "M0,0 C150,80 350,80 600,50 C850,20 1050,20 1200,50 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

export default WavyDivider;
