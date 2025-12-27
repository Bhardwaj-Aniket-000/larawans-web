import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary shadow-sm hover:shadow-md',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary shadow-sm hover:shadow-md',
    ghost: 'text-textPrimary hover:bg-bgSoft focus:ring-textMuted',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[48px]',
    lg: 'px-8 py-4 text-lg min-h-[56px]',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  const MotionComponent = motion.button;

  if (to) {
    return (
      <Link to={to} className={classes}>
        <motion.span
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className="flex items-center"
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        <motion.span
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          className="flex items-center"
        >
          {content}
        </motion.span>
      </a>
    );
  }

  return (
    <MotionComponent
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {content}
    </MotionComponent>
  );
};

export default Button;
