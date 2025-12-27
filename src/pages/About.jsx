import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { FaRocket, FaUsers, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: FaUsers, value: '500+', label: 'Happy Clients' },
    { icon: FaRocket, value: '1000+', label: 'Projects Completed' },
    { icon: FaAward, value: '50+', label: 'Awards Won' },
    { icon: FaHeart, value: '100%', label: 'Client Satisfaction' },
  ];

  const timeline = [
    { year: '2018', title: 'Company Founded', description: 'Started our journey with a vision to transform digital experiences' },
    { year: '2019', title: 'First Major Client', description: 'Landed our first enterprise client and expanded our team' },
    { year: '2020', title: 'Global Expansion', description: 'Opened offices in multiple countries and grew to 50+ team members' },
    { year: '2021', title: 'Industry Recognition', description: 'Won multiple awards for excellence in digital innovation' },
    { year: '2023', title: 'Innovation Hub', description: 'Launched our innovation lab focusing on AI and emerging technologies' },
    { year: '2024', title: 'Market Leader', description: 'Became one of the top digital agencies with 500+ successful projects' },
  ];

  const team = [
    { name: 'John Doe', role: 'CEO & Founder', image: '👨‍💼' },
    { name: 'Jane Smith', role: 'Creative Director', image: '👩‍🎨' },
    { name: 'Mike Johnson', role: 'Tech Lead', image: '👨‍💻' },
    { name: 'Sarah Williams', role: 'Marketing Head', image: '👩‍💼' },
  ];

  const values = [
    { icon: '🎯', title: 'Excellence', description: 'We strive for perfection in every project we undertake' },
    { icon: '🤝', title: 'Collaboration', description: 'Working together with clients to achieve shared success' },
    { icon: '💡', title: 'Innovation', description: 'Constantly pushing boundaries with creative solutions' },
    { icon: '🌟', title: 'Integrity', description: 'Building trust through transparency and honest communication' },
  ];

  return (
    <div className="min-h-screen bg-[#f5e2ceff] pt-20">
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f5e2ceff] to-bgCream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textPrimary mb-6 hero-text-shadow">
              About Larawans
            </h1>
            <p className="text-lg sm:text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
              We are a premium digital agency dedicated to transforming businesses through innovative digital solutions and exceptional creative work.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#fff] rounded-2xl p-6 sm:p-8 text-center shadow-card border border-borderColor"
              >
                <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-4" />
                <h3 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-2">
                  {stat.value}
                </h3>
                <p className="text-textMuted text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Our Story" title="Journey Through Time" />
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative pl-8 sm:pl-12 pb-12 border-l-2 border-primary/30 last:pb-0"
              >
                <div className="absolute left-0 top-0 w-4 h-4 sm:w-6 sm:h-6 bg-primary rounded-full -translate-x-[9px] sm:-translate-x-[13px] shadow-lg" />
                <div className="card-surface rounded-2xl p-6 text-center">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-textPrimary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-textMuted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Our Values" title="What Drives Us" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-cardBg rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 border border-borderColor hover:border-secondary"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  {value.title}
                </h3>
                <p className="text-textMuted text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#f5e2ceff]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Meet The Team" title="Our Expert Team" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-cardBg rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 border border-borderColor hover:border-secondary"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center text-4xl sm:text-5xl mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="font-bold text-textPrimary mb-1 text-sm sm:text-base">
                  {member.name}
                </h3>
                <p className="text-textMuted text-xs sm:text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-textPrimary mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-textSecondary mb-8 max-w-2xl mx-auto">
              Let's create something extraordinary for your business
            </p>
            <Button to="/contact" size="lg">
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
