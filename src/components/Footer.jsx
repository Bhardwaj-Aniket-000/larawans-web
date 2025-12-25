import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { name: 'Web Development', path: '/services' },
      { name: 'SEO Optimization', path: '/services' },
      { name: 'Social Media', path: '/services' },
      { name: 'Branding', path: '/services' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Work', path: '/work' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Contact', path: '/contact' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-dark-950 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-4 inline-block text-2xl font-bold text-white">
              <span className="text-primary-500">LARA</span>WANS
            </Link>
            <p className="mb-6 text-sm text-dark-400">
              Transform your digital presence with our comprehensive digital marketing solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark-800 text-dark-400 transition-all hover:bg-primary-600 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-dark-400 transition-colors hover:text-primary-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-dark-400">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-500" />
                <span>123 Business Street, Suite 100, City, State 12345</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-dark-400">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary-500" />
                <a href="tel:+1234567890" className="transition-colors hover:text-primary-500">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-dark-400">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary-500" />
                <a href="mailto:info@larawans.com" className="transition-colors hover:text-primary-500">
                  info@larawans.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-dark-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-dark-400">
              © {currentYear} Larawans Digital. All rights reserved.
            </p>
            <p className="text-sm text-dark-400">
              Designed & Developed with ❤️ by Larawans
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
