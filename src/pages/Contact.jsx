import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEO } from '../components/SEO';
import { contactService } from '../services/contactService';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactService.createInquiry(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '7015150181',
      link: 'tel:7015150181',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@larawansdigital.com',
      link: 'mailto:info@larawansdigital.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Near Court, Kaithal, Haryana',
      link: '#',
    },
  ];

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Larawans Digital. We're here to help you transform your digital presence."
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
              Get In <span className="text-primary-500">Touch</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              Have a project in mind? Let's discuss how we can help you achieve your goals
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-white">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-dark-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-dark-800 px-4 py-3 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-dark-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg bg-dark-800 px-4 py-3 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-dark-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-dark-800 px-4 py-3 min-h-[48px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Phone Number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-dark-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-lg bg-dark-800 px-4 py-3 min-h-[120px] text-white placeholder-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your Message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-600 px-8 py-4 min-h-[52px] text-lg font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 rounded-2xl bg-dark-800 p-6 transition-all hover:bg-dark-700"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600/20">
                      <info.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">{info.title}</h3>
                      <p className="text-dark-400">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-dark-800 p-8">
                <h3 className="mb-4 text-xl font-bold text-white">Business Hours</h3>
                <div className="space-y-2 text-dark-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
