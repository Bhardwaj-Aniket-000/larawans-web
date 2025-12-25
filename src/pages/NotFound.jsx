import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The page you're looking for doesn't exist" />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="mb-8 text-9xl font-bold text-primary-500"
            >
              404
            </motion.div>

            <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
              Oops! Page Not Found
            </h1>
            <p className="mb-8 text-xl text-dark-400">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/"
                className="group inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center rounded-lg border-2 border-dark-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-primary-600 hover:bg-primary-600/10"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
