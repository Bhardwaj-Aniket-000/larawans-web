import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['all', 'web', 'mobile', 'branding', 'marketing'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-bgMain pt-20">
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-bgSoft to-bgCream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 hero-text-shadow">
              Our Work
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto">
              Showcasing our best projects and successful client collaborations
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 min-h-[44px] ${
                  filter === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-textSecondary hover:bg-bgSoft border border-borderColor'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner />
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative card-surface rounded-2xl overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.imageUrl || '/assets/banner/WhatsApp Image1.jpeg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-textPrimary/90 via-textPrimary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="outline" className="bg-white text-textPrimary border-white hover:bg-white/90">
                        View Project
                        <FaExternalLinkAlt className="ml-2" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {project.category && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-textPrimary mb-2">
                      {project.title}
                    </h3>
                    <p className="text-textMuted text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-textMuted bg-bgSoft px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-bgSoft rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">
                No Projects Found
              </h3>
              <p className="text-textMuted mb-8">
                {filter === 'all' 
                  ? 'Projects will be displayed here once they are added.'
                  : `No projects found in the "${filter}" category.`}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your vision to life
            </p>
            <Button to="/contact" size="lg">
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Work;
