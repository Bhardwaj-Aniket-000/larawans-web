import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Work', path: '/work' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: '#', label: 'Facebook' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaLinkedinIn, url: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <img
              src="/assets/logo/Larawans.png"
              alt="Larawans"
              className="h-12 w-auto object-contain"
            />
            <p className="text-white text-sm leading-relaxed">
              Premium digital solutions for modern businesses. We create exceptional digital experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white hover:bg-primary hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-primary hover:translate-x-1 inline-block transition-all text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-primary hover:translate-x-1 inline-block transition-all text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-white/80">
                <FaMapMarkerAlt className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Subhash Market, Shop No. 2, Opposite Court, Karnal Road, Kaithal, Haryana</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/80">
                <FaPhone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+91 70151 50181</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-white/80">
                <FaEnvelope className="w-5 h-5 text-primary flex-shrink-0" />
                <span>larawansdigital@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-white/70 text-sm text-center sm:text-left">
              © {currentYear} Larawans Digital Agency. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-white/70 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/70 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
