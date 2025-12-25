import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, TrendingUp, Heart } from 'lucide-react';
import { SEO } from '../components/SEO';

export const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower businesses with innovative digital solutions that drive growth and success.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading digital agency recognized for excellence and innovation.',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, creativity, and client success are at the core of everything we do.',
    },
  ];

  const team = [
    { name: 'John Doe', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Jane Smith', role: 'Creative Director', image: '👩‍🎨' },
    { name: 'Mike Johnson', role: 'Tech Lead', image: '👨‍💻' },
    { name: 'Sarah Williams', role: 'Marketing Head', image: '👩‍💼' },
  ];

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn more about Larawans Digital - your trusted partner in digital transformation with 15+ years of experience."
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
              About <span className="text-primary-500">Larawans Digital</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              We are a team of passionate digital experts dedicated to helping businesses thrive in the digital age
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
                Who We <span className="text-primary-500">Are</span>
              </h2>
              <p className="mb-4 text-lg text-dark-300">
                Founded in 2008, Larawans Digital has grown from a small startup to a leading digital marketing agency serving clients worldwide. Our journey has been driven by a passion for innovation and a commitment to delivering exceptional results.
              </p>
              <p className="mb-4 text-lg text-dark-300">
                With over 15 years of experience, we've helped hundreds of businesses transform their digital presence and achieve their goals. Our team of experts combines creativity with technical expertise to deliver solutions that make a real impact.
              </p>
              <p className="text-lg text-dark-300">
                We believe in building long-term partnerships with our clients, understanding their unique challenges, and providing tailored solutions that drive sustainable growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '15+', label: 'Years Experience' },
                { value: '500+', label: 'Projects Completed' },
                { value: '200+', label: 'Happy Clients' },
                { value: '50+', label: 'Team Members' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 p-8 text-center"
                >
                  <div className="mb-2 text-4xl font-bold text-primary-500">{stat.value}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-dark-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Our Core <span className="text-primary-500">Values</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-dark-800 p-8 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-600/20">
                  <value.icon className="h-10 w-10 text-primary-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">{value.title}</h3>
                <p className="text-dark-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-950 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Meet Our <span className="text-primary-500">Team</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              The talented people behind our success
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl bg-dark-800 p-8 text-center transition-all hover:bg-dark-700"
              >
                <div className="mb-4 text-6xl">{member.image}</div>
                <h3 className="mb-2 text-xl font-bold text-white">{member.name}</h3>
                <p className="text-primary-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
