import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import Button from '../components/Button';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      content: 'Subhash Market, Shop No. 2, Opposite Court, Karnal Road, Kaithal, Haryana',
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      content: '+91 70151 50181',
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      content: 'larawansdigital@gmail.com',
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5e2ceff] pt-20">
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 hero-text-shadow">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto">
              Have a project in mind? Let's discuss how we can help bring your vision to life
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card-surface bg-[#fff] rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-textPrimary mb-2">
                  {info.title}
                </h3>
                <p className="text-textMuted text-sm">
                  {info.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-textPrimary mb-6">
                Send Us a Message
              </h2>
              
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#f5e2ceff] border border-success/30 rounded-lg flex items-center text-success"
                >
                  <FaCheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-textPrimary font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Full Name"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-500' : 'border-borderColor'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[48px]`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-textPrimary font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="Email Address"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500' : 'border-borderColor'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[48px]`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-textPrimary font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-borderColor focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-textPrimary font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    placeholder="Subject"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.subject ? 'border-red-500' : 'border-borderColor'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[48px]`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-textPrimary font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    placeholder="Your Message"
                    rows="6"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-borderColor'
                    } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-full min-h-[500px] lg:min-h-[600px]"
            >
              <div className="card-surface rounded-2xl overflow-hidden h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6">
              Prefer to Talk Directly?
            </h2>
            <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
              Schedule a call with our team to discuss your project requirements
            </p>
            <Button size="lg" variant="outline">
              Schedule a Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
