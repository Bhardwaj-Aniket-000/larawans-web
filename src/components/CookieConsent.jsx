import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useCookieConsent } from '../hooks/useCookieConsent';

export const CookieConsent = () => {
  const { showConsent, acceptCookies, declineCookies } = useCookieConsent();

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-dark-900 p-4 shadow-2xl"
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="flex items-start space-x-4">
                <Cookie className="h-6 w-6 flex-shrink-0 text-primary-500" />
                <div>
                  <h3 className="font-semibold text-white">Cookie Notice</h3>
                  <p className="text-sm text-dark-400">
                    We use cookies to enhance your browsing experience and analyze our traffic. 
                    By clicking "Accept", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={declineCookies}
                  className="rounded-lg border border-dark-700 px-6 py-2 text-sm font-medium text-dark-300 transition-all hover:bg-dark-800"
                >
                  Decline
                </button>
                <button
                  onClick={acceptCookies}
                  className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-primary-700"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
