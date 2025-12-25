import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Work = () => {
  const projects = [
    {
      title: 'E-commerce Platform',
      category: 'Web Development',
      description: 'Modern multi-vendor marketplace with advanced features',
      image: '🛍️',
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Mobile Banking App',
      category: 'App Development',
      description: 'Secure and user-friendly banking application',
      image: '💳',
      color: 'from-green-500 to-teal-600',
    },
    {
      title: 'Brand Identity',
      category: 'Branding',
      description: 'Complete brand redesign for tech startup',
      image: '🎨',
      color: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Corporate Website',
      category: 'Web Design',
      description: 'Professional website for consulting firm',
      image: '💼',
      color: 'from-indigo-500 to-blue-600',
    },
    {
      title: 'Social Media Campaign',
      category: 'Digital Marketing',
      description: 'Viral campaign reaching 2M+ impressions',
      image: '📱',
      color: 'from-orange-500 to-red-600',
    },
    {
      title: 'Analytics Dashboard',
      category: 'Data Analytics',
      description: 'Real-time business intelligence platform',
      image: '📊',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <>
      <SEO 
        title="Our Work & Portfolio"
        description="Explore our portfolio of successful digital projects including web development, mobile apps, branding, and digital marketing campaigns."
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
              Our <span className="text-primary-500">Work</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-dark-300">
              Explore our portfolio of successful projects that have helped businesses achieve their digital goals
            </p>
          </motion.div>
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
              Featured <span className="text-primary-500">Projects</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-dark-400">
              A showcase of our best work across various industries and technologies
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-dark-800 transition-all hover:shadow-2xl hover:shadow-primary-600/20"
              >
                <div className={`h-64 bg-gradient-to-br ${project.color} p-8 flex items-center justify-center text-8xl`}>
                  {project.image}
                </div>
                
                <div className="p-8">
                  <div className="mb-2 text-sm font-semibold text-primary-500">
                    {project.category}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mb-6 text-dark-400">{project.description}</p>
                  
                  <button className="flex items-center space-x-2 text-primary-500 transition-all hover:text-primary-400">
                    <span className="font-semibold">View Project</span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Awards Won' },
              { value: '99%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 text-5xl font-bold text-primary-500">{stat.value}</div>
                <div className="text-dark-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
